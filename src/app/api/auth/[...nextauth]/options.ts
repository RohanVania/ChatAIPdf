import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers/index";
// import { OAuthConfig } from "next-auth/providers/index";
// import {DrizzleAdapter} from "@auth/drizzle-adapter"
// import type { Adapter } from "next-auth/adapters";
// import { db } from "@/lib/db";

interface CustomUser {
  id: string;
  name: string;
  password: string;
  buddy: string;
  // Add other properties if needed
}



export const authOptions: NextAuthOptions = {
  // debug:true,
  providers: [
    // CredentialsProvider({
    //     name: 'Credentials',
    //     credentials: {
    //         username: { label: "Username", type: "text", placeholder: "johndoe" },
    //         password: { label: "Password", type: "password" }
    //     },
    //     async authorize(credentials, req) {
    //         const user = { id: "42", name: "Dave", password: "1234", buddy: "ssup" };
    //         if (credentials?.username === user.name && credentials?.password === user.password) {
    //             console.log(user)
    //             return user;
    //         } else {
    //             return null;
    //         }
    //     }
    // })

    // GoogleProvider({}),
    GithubProvider({
      clientId: process.env.GITHUB_APP_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_APP_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
    })
  ],


  callbacks: {
    async jwt({ token, user }) {
      console.log("Token JWT =>", token);
      console.log("User SESSION", user);
      if (user) {
        console.log("User Token asudgasuid")
        return { ...token, ...user };
      }
      return token;
    },
    async redirect({url,baseUrl}) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`}
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) 
        {
          return url
        }
      return baseUrl
    },
    async session({ session, token }) {
      console.log("Session =>", session);
      console.log("Token =>", token);
      // session.user = token.user as any;// you can also declare type
      return session;
    },
  },
  pages: {
    signIn: "/signIn"
  },
  // adapter:DrizzleAdapter(db) 
}

export const providerMap = authOptions.providers.map((provider: Provider) => {
  if ('style' in provider) {
    // If the 'style' property exists, it's an OAuth provider
    return { id: provider.id, name: provider.name, style: provider.style };
  } else {
    // For other types of providers like EmailProvider, handle accordingly
    return { id: provider.id, name: provider.name };
  }
})



export default authOptions;