import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { useAxios } from "@/hooks";
const { api } = useAxios();
export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "login",
      async authorize(credentials) {
        try {
          const data = {
            username: credentials?.username,
            password: credentials?.password,
          };
          const res = await api.post("/user/login", data);
          return res.data;
        } catch (error) {
          throw Error(error.message);
        }
      },
    }),
  ],
  pages: {
    error: "/login",
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async redirect() {
      return "/dashboard";
    },
    async session({ session, token, user }) {
      session.user = token;
      session.user.isLoggedIn = true;
      return session;
    },
  },
  // use env variable in production
  secret: process.env.NEXTAUTH_SECRET,
});
