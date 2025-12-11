import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import stockRoutes from './routes/stock.routes.ts'
import authRoutes from './routes/auth.routes.ts'
import userRoutes from './routes/user.routes.ts'

const app = express()
app.use(cors())
dotenv.config()

app.use(express.json())

app.use('/stock', stockRoutes)
app.use('/auth', authRoutes)
app.use('/user', userRoutes)

export default app;