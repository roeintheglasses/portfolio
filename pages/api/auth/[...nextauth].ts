import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";

import type { NextAuthOptions } from "next-auth"


export const authConfig =
  {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      GithubProvider({
        clientId: process.env.OAUTH_CLIENT_KEY,
        clientSecret: process.env.OAUTH_CLIENT_SECRET
      }),
      DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET
      }),
      // GoogleProvider({
      //   clientId: process.env.GOOGLE_CLIENT_ID,
      //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
      // })
    ],
    // pages: {
    //   signIn: '/auth/signin'
    // }     
} satisfies NextAuthOptions

export default NextAuth(authConfig);
