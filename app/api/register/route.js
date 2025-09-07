import dbConncect, { collections } from "@/lib/MongoDb/dbConnect";
import bcrypt from "bcrypt";

export async function POST(req, res) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return new Response(JSON.stringify({ message: "Missing fields" }), { status: 400 });
        }

        const usersCollection = await dbConncect(collections.users);
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await usersCollection.insertOne({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        });

        return new Response(JSON.stringify({ message: "User registered", userId: newUser.insertedId }), { status: 201 });
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), { status: 500 });
    }
}