import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const Password=process.env.RootPassword;

const db=new Sequelize('cursonode','root',Password,{
    host:'localhost',
    dialect:'mysql',
    
});

export default db;