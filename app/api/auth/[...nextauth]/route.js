import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        // const user = await res.json();
        // if (res.ok && user) return user;
        // return null;

          if (!res.ok) return null; // login failed

          const user = await res.json(); // user object returned from /api/login
          return user;
      },
    }),
  ],
  pages: {
    signIn: "/login", // ✅ custom login page
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
        secret: process.env.NEXTAUTH_SECRET,
  },

   cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
