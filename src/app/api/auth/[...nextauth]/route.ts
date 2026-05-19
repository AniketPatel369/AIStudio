import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "dev-secret-change-in-production",
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    // Custom JWT encode/decode so our Spring Boot backend can verify the same token
    encode: async ({ secret, token }) => {
      if (!token) return "";
      return jwt.sign(
        {
          sub: token.email,
          name: token.name,
          picture: token.picture,
          email: token.email,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        },
        secret as string,
        { algorithm: "HS256" }
      );
    },
    decode: async ({ secret, token }) => {
      if (!token) return null;
      try {
        const decoded = jwt.verify(token, secret as string, {
          algorithms: ["HS256"],
        }) as jwt.JwtPayload;
        return {
          sub: decoded.sub,
          name: decoded.name,
          picture: decoded.picture,
          email: decoded.email || decoded.sub,
          iat: decoded.iat,
          exp: decoded.exp,
        };
      } catch {
        return null;
      }
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      const secret = process.env.NEXTAUTH_SECRET || "dev-secret-change-in-production";
      (session as any).accessToken = jwt.sign(
        {
          sub: token.email,
          name: token.name,
          picture: token.picture,
          email: token.email,
          iat: token.iat || Math.floor(Date.now() / 1000),
          exp: token.exp || (Math.floor(Date.now() / 1000) + 24 * 60 * 60),
        },
        secret,
        { algorithm: "HS256" }
      );
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
