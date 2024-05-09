// Importa las dependencias necesarias
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { conn } from "../../../../../database/mysql";
import bcrypt from "bcrypt";

/**
 * Obtiene el rol de un usuario a partir de su correo electrónico.
 *
 * @param {string} email - El correo electrónico del usuario.
 * @returns {Promise<string|null>} El rol del usuario o null si no se encuentra el usuario.
 */
async function getUserRole(email) {
  const result = await conn.query("SELECT rol FROM usuarios WHERE email=?", [
    email,
  ]);
  return result.length > 0 ? result[0].rol : null;
}

/**
 * Opciones de autenticación para NextAuth.
 * @type {import("next-auth").NextAuthOptions}
 */
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
      /**
       * Autoriza al usuario basándose en sus credenciales.
       *
       * @param {import("next-auth/providers").CredentialsProvider.Credentials} credentials - Las credenciales del usuario.
       * @returns {Promise<import("next-auth").GenericObject>} El objeto de usuario si las credenciales son válidas.
       * @throws {Error} Si las credenciales no son válidas.
       */
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
    /**
     * Personaliza el token JWT.
     *
     * @param {import("next-auth/jwt").Token} token - El token JWT.
     * @param {import("next-auth").User} user - El objeto de usuario.
     * @returns {Promise<import("next-auth/jwt").Token>} El token JWT personalizado.
     */
    async jwt({ token, user }) {
      if (user) {
        token.role = await getUserRole(user.email);
      }
      return token;
    },
    /**
     * Personaliza la sesión del usuario.
     *
     * @param {import("next-auth").Session} session - La sesión del usuario.
     * @param {import("next-auth/jwt").Token} token - El token JWT.
     * @returns {Promise<import("next-auth").Session>} La sesión personalizada del usuario.
     */
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/",
  },
};

/**
 * Manejador de autenticación para NextAuth.
 * @type {import("next-auth").NextAuthHandler}
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
