import dbConncect, { clientPromise, collections } from "@/lib/MongoDb/dbConnect";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const authOptions = {
    adapter: MongoDBAdapter(clientPromise),

    providers: [
        // Google login
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        // Credentials login
        CredentialsProvider({
            name: "Credentials",
            Credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const usersCollection = await dbConncect(collections.users)
                const user = await usersCollection.findOne({ email: credentials.email });
                if (!user) throw new Error("No user found");

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) throw new Error("Invalid credentials");

                return { id: user._id.toString(), name: user.name, email: user.email };
            },
        }),
    ],

    session: { strategy: "jwt" },

    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }) {
            if (token) session.user.id = token.id;
            return session;
        },
    },
}
export default authOptions