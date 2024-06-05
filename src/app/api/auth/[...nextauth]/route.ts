
import NextAuth from "next-auth"
import authOptions from "./options";
import type {NextAuthOptions} from "next-auth"
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }