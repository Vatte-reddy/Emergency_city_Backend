import express from 'express'

import cors from 'cors'

import cookieParser from 'cookie-parser'

const app=express()

import connectDB from './config/db.js'


connectDB()

app.use(cors())

app.use(cookieParser())

const routes=express.Router()



routes.get('/title',(req,res)=>{
    res.status(200).json({message:'hello world'})
})



app.use(express.json())

import authRoutes from './routes/authRoutes.js'

app.use('/',authRoutes)

const port=process.env.ENV_PORT || 1818


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

connectDB()