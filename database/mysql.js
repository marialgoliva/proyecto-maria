import mysql from 'serverless-mysql'

export const conn = mysql({
    config:{
        host: 'localhost',
        user: 'root',
        password: '1475963',
        port: 3306,
        database: 'PROYECTO_MARIA'
    }
})