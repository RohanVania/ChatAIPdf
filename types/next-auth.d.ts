import NextAuth, { DefaultSession } from "next-auth";

//* We added this file because we want to add id in the user session object given by NextAuth , so we add one property as id and extend with Default session
declare module "next-auth"{
        interface Session{
            user:{
                id:string,
                provider:string
            } & DefaultSession["user"]
        }
}