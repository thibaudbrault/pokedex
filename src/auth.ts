// @ts-nocheck

import { PrismaAdapter } from '@auth/prisma-adapter';
import { User } from '@prisma/client';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { LoginValidator, matchPassword } from '@/utils';
import { prisma } from '~/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: `credentials`,
      credentials: {
        email: { label: `email`, type: `email` },
        password: { label: `Password`, type: `password` },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = LoginValidator.parse(credentials);
          const user = await prisma.user.findUnique({
            where: { email },
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
            },
          });
          if (!user) {
            throw new Error(
              `No user found with this email. Try with a different email`,
            );
          }
          const isPasswordValid = matchPassword(password, user.password);
          if (!isPasswordValid) {
            throw new Error(`Invalid credentials`);
          }
          return user;
        } catch (error) {
          console.error(`An error occured: `, error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.username;
      return session;
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.username = (user as User).name;
      }
      return token;
    },
  },
  pages: {
    signIn: `/login`,
    newUser: `/profile`,
  },
  session: {
    strategy: `jwt`,
  },
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
