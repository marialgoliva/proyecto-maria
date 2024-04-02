import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { conn } from "../../../../../database/mysql";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const authOptions ={
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text", placeholder: "usuario@email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials, req) {
                
                console.log(credentials.email)
                const result = await conn.query(
                    "SELECT * FROM USUARIO WHERE email =?",
                    [credentials.email],
                );
               
                if (result.length !== 0){
                    
                    const user = result[0];
                    const matchPassword = await bcrypt.compare(credentials.password, user.password);
                    
                    if (!matchPassword) { throw new Error('Contraseña incorrecta.'); }

                    return {
                        id: result.dni,
                        name: result.nombre,
                        email: result.email
                    }
                } else {
                    throw new Error('No se reconoce ese email.');
                }
                
                
                
            },  
        }),
    ]
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};