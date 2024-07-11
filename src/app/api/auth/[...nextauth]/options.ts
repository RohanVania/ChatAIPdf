import { db } from "@/lib/db";
import { Account, NextAuthOptions, Profile, User } from "next-auth"
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { Provider } from "next-auth/providers/index";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { use } from "react";
// import { OAuthConfig } from "next-auth/providers/index";

interface CustomUser {
  id: string;
  name: string;
  password: string;
  buddy: string;
  // Add other properties if needed
}



export const authOptions: NextAuthOptions = {
  // debug: true,
  session:{
    strategy:"database"
  },
  providers: [
 
    // GoogleProvider({}),
    // GithubProvider({
    //   clientId: process.env.GITHUB_APP_CLIENT_ID as string,
    //   clientSecret: process.env.GITHUB_APP_SECRET as string,
    //   allowDangerousEmailAccountLinking: true,
    // }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
    })
  ],


  callbacks: {
 
    
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },

    async session({ session, token, user }) {
      // console.log("Calling Session");
      // console.log("token in session",token);
      // console.log(user)
      if (user && user.id) {
        session.user.id = user.id;
        session.user.provider = user.image?.includes('google') ? 'google' : 'github';
      }
      // console.log(session);
      return session;
    },

  },
  pages: {
    signIn: "/signIn",
  },

  adapter: DrizzleAdapter(db) as Adapter
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

