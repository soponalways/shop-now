"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: false,
            email: form.email,
            password: form.password,
        });
        if (result.error) {
            alert(result.error);
        } else {
            toast.success("You Have Successfully Login");
            redirect('/');
        }
    };

    return (
        <div className="p-6 max-w-sm mx-auto bg-gray-100 backdrop-blur-3xl drop-shadow-2xl border rounded-xl md:rounded-2xl lg:rounded-3xl">
            <h1 className="text-2xl md:text-3xl text-center font-bold md:font-black mb-4 md:mb-6">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="border p-2  rounded-xl  md:rounded-2xl"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="border p-2 rounded-xl  md:rounded-2xl"
                />
                <button type="submit" className="bg-gray-300 hover:bg-gray-400 cursor-pointer rounded-xl md:rounded-2xl py-2">Login</button>
            </form>

            <div className="mt-4">
                <button onClick={() => signIn("google")} className="bg-red-600 text-white py-2 w-full rounded-xl cursor-pointer md:rounded-2xl">
                    Login with Google
                </button>
            </div>

            <p className="py-2">Have No account Please <Link href={'/register'} className="underline text-blue-600 ">Register </Link></p>
        </div>
    );
}