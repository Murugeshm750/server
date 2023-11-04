import express from 'express'
import router from "./Router/bugRouter.js"

import cors from 'cors'

const app = express()
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
  }));
  
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api',router)
// app.use(cors())


app.listen(3000,() =>{
    console.log("PORT 3000 is Running")
})