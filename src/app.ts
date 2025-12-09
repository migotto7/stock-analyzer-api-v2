import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import stockRoutes from './routes/stock-routes.ts'
import authRoutes from './routes/auth-routes.ts'

const app = express()
app.use(cors())
dotenv.config()

app.use(express.json())

app.use('/stock', stockRoutes)
app.use('/auth', authRoutes)

export default app;