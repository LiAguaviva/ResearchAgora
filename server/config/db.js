import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true
    // waitForConnections:true,
    // connectionLimit: 10, //Maximum number of active connections
    // queueLimit: 0 // Maximum number of requests in queue (0 = without a limit)
}); 

export const executeQuery = async (sql, values=[]) =>{
    let connection;
    try {  
        connection = await dbPool.getConnection();
        
        const [result] = await connection.query(sql, values);
        return result
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
       
        if(connection){
            connection.release();
        }
    }
}

const testDbConnection = async () => {
    try {
        const result = await executeQuery('select * from user');
        console.log("resultado del test ", result);
    } catch (error) {
        console.log(error);
    }
}

//  testDbConnection();