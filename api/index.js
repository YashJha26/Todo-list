import express from "express"
import pool from "./db.js"
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
dotenv.config();
const app=express();
const PORT= process.env.PORT || 5000 ;
app.use(cors());
app.use(express.json())
app.get("/api/todos/:userEmail",async (req,res)=>{
    const {userEmail}=req.params;
    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1',[userEmail]);
        res.json(todos.rows);
    } catch (error) {
        console.error(error);
    }
})

//create
app.post("/api/todos",(req,res)=>{
    const {user_email,title,progress,date}=req.body;
    const id = uuidv4();
    //console.log(req.body);
    //console.log("id=",id,"useremail=",user_email,"title=",title,"progress=",progress,"date=",date);
    try {
        const newToDO=pool.query('INSERT INTO todos(id,user_email,title,progress,date) VALUES ($1,$2,$3,$4,$5)',[id,user_email,title,progress,date]);
        res.json(newToDO);
    } catch (error) {
        console.error(error);
    }
})

//update
app.put("/api/todos/:id",async (req,res)=>{
    const {id}=req.params;
    const {user_email,title,progress,date}=req.body;
    try {
        const editedToDO=await pool.query('UPDATE todos SET user_email=$1 ,title = $2 , progress=$3, date=$4 WHERE id=$5;',
            [user_email,title,progress,date,id])
        res.json(editedToDO);
    } catch (error) {
        console.error(error);
    }
})

//deleted 
app.delete("/api/todos/:id",async (req,res)=>{
    console.log(id);
    try {
        const deletedTodo=await pool.query('DELETE FROM todos WHERE id=$1;',[id]);
        res.json(deletedTodo);
    } catch (error) {
        console.error(error);
    }
})

//register 
app.post("/api/register",async (req,res)=>{
    const {email,password}=req.body;
    const saltRounds=10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
        console.log("register hit");
        const Reg=await pool.query(`INSERT INTO users(email,hashed_password) VALUES ($1,$2)`,[email,hashedPassword]);
        const accessToken=jwt.sign({email},process.env.JWT_SECRET_TOKEN,{expiresIn:"1d"});
        res.json({email,accessToken})
    } catch (error) {
        console.error(error);
        if(error){
            res.json({detail:error.detail});
        }
    }
})

//login
app.post("/api/login",async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1',[email]);
        if(!user.rows.length) return res.json({detail:"User Doesn't exist"});
        const success = await bcrypt.compare(password,user.rows[0].hashed_password);
        const accessToken=jwt.sign({email},process.env.JWT_SECRET_TOKEN,{expiresIn:"1d"});
        if(success){

            res.json({"email":user.rows[0].email,accessToken});
        }
    } catch (error) {
        console.error(error);
        res.json({detail:"Login failed "});
    }
})
app.listen(PORT||5000,()=>{
    console.log(`backend server running in ${PORT}`)
})
