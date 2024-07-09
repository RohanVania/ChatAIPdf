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
  //   async jwt({ user, account, token }) {
  //     console.log("JWT IS CALLED -<", user, account, token);
  //     return token;
  //   },
// }

    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log("Calling Sign IN")
    //   return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   console.log("Calling Redirect")

    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
    async jwt({ token, account,user }) {
      console.log("Calling JWT")
      console.log(token);
      console.log(user)
      
      return token;
    },
    async session({ session, token, user }) {
      console.log("Calling Session")
      // console.log(user)
      if (user && user.id) {
        session.user.id = user.id;
      }
      console.log(session);
      return session;
    },
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log("User in SignIn =>", user);
    //   console.log("Account in Sign In =>", account);
    //   console.log("Profile in Sign In =>", profile);
  
    //   const isAllowedToSignIn = account;
    //   if (isAllowedToSignIn) {
    //     return {user,account,profile}
    //   } else {
    //     // Return false to display a default error message
    //     return '/unauthorized';
    //     // Or you can return a URL to redirect to:
    //   }
    // },
  
    
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

