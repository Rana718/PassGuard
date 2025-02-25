import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./Prisma";
import decryption from "./utils/decryption";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const email = credentials?.email as string | undefined;
                const password = credentials?.password as string | undefined;

                if (!email || !password) {
                    throw new Error("Please provide email and password");
                }

                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user) {
                    throw new Error("User not found");
                }

                const passwordDecrypted = decryption(user.passwordpayload, user.passwordhmac);
                if (passwordDecrypted !== password) {
                    throw new Error("Password does not match");
                }

                return { id: user.id, name: user.name, email: user.email };
            },
        }),
    ],
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        signIn: async ({ user, account }) => {
            if (account?.provider === "credentials") {
                return true;
            }
            return false;
        },
    },
});
