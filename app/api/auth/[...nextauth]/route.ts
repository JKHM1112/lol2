import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { authOptions } from "./authOptions";

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };