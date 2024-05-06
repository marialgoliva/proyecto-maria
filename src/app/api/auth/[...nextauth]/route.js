import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { conn } from "../../../../../database/mysql";
import bcrypt from "bcrypt";

async function getUserRole(email) {
  const result = await conn.query("SELECT rol FROM usuarios WHERE email=?", [
    email,
  ]);
  // console.log(result);
  return result.length > 0 ? result[0].rol : null;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Introduce tu email",
        },
        password: { label: "Password", type: "Introduce tu contraseña" },
      },
      async authorize(credentials) {
        const result = await conn.query(
          "SELECT * FROM USUARIOS WHERE email =?",
          [credentials.email],
        );

        if (result.length !== 0) {
          const user = result[0];
          const matchPassword = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!matchPassword) {
            throw new Error("Contraseña incorrecta.");
          }

          return {
            id: result[0].dni,
            name: result[0].nombre,
            email: result[0].email,
            role: result[0].rol,
          };
        } else {
          throw new Error("No se reconoce ese email.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log("JWT callback", { user, token });
      if (user) {
        token.role = await getUserRole(user.email);
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("Session callback", { session, token });
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
