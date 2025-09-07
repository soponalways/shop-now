import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import bcrypt from "bcrypt";
import dbConncect, { clientPromise, collections } from "@/lib/MongoDb/dbConnect";
import { signIn } from "next-auth/react";

export const authOptions = {
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
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const usersCollection = await dbConncect(collections.users)
                const user = await usersCollection.findOne({ email: credentials.email });
                if(user) {
                    const updatedUser = {
                        $set: {
                            lastSignIn: new Date(),
                        }
                    };
                    const query = { email: user.email }
                    await usersCollection.updateOne(query, updatedUser); 
                }
                if (!user) throw new Error("No User Found");

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) throw new Error("Invalid Password");

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
        async signIn(data) {
            const { user, account } = data; 
            //if user is signing in with Google, check if they exist in the database and create them if they don't
            if (account.provider === "google") {
                const usersCollection = await dbConncect(collections.users);
                const existingUser = await usersCollection.findOne({ email: user.email });
                if (existingUser) {
                    const updatedUser = {
                        $set: {
                            lastSignIn: new Date(),
                        }
                    }; 
                    const query = { email: user.email}
                    await usersCollection.updateOne(query , updatedUser); 
                }
                if (!existingUser) {
                    await usersCollection.insertOne({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        createdAt: new Date(),
                    });
                }
            }
            return user;
        },
    },
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };