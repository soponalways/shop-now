"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        console.log("Resonponse When Post User DAta", res)
        // Navigate when Successfullt Registered
        if (res.status === 201) {
            toast.success("Registered Successfully");
            redirect('/');
        }
        const data = await res.json();
        if (res.status === 400) {
            toast.warn(data.message)
        }
        setMessage(data.message);
    };

    return (
        <div className="p-6 max-w-sm mx-auto bg-gray-100 backdrop-blur-3xl drop-shadow-2xl border rounded-xl md:rounded-2xl lg:rounded-3xl">
            <h1 className="text-2xl md:text-3xl text-center font-bold md:font-black mb-4 md:mb-6">Register</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border p-2  rounded-xl  md:rounded-2xl"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="border p-2 rounded-xl  md:rounded-2xl"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="border p-2 rounded-xl  md:rounded-2xl"
                />
                <button type="submit" className="bg-gray-300 hover:bg-gray-400 cursor-pointer rounded-xl md:rounded-2xl py-2">Register</button>
            </form>
            <div className="mt-4">
                <button onClick={() => signIn("google", { callbackUrl: "/" })} className="bg-red-600 text-white py-2 w-full rounded-xl cursor-pointer md:rounded-2xl">
                    Continue with Google
                </button>
            </div>

            <p className="py-2">Already have an account Please <Link href={'/login'} className="underline text-blue-600 ">Login </Link></p>

            {message && <p className="mt-3">{message}</p>}
        </div>
    );
}