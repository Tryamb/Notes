import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import personRoutes from './routes/personRoutes.js'
import expenseRoutes from './routes/expenseRoutes.js'
import connectDB from './config/connectDb.js'

const app=express()
const port=process.env.PORT
const DATABASE_URL=process.env.DATABASE_URL

//cors
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
}
app.use(cors())

//database connection
connectDB(DATABASE_URL)

//Json
app.use(express.json())

//load routes
app.use("/api/user",userRoutes)
app.use("/api/person",personRoutes)
app.use("/api/expense",expenseRoutes)

app.listen(port,()=>{
    console.log(`Server is listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
  
    res.send('Hello');
    
  });
