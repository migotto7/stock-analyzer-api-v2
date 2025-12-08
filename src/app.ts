import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import stockRoutes from './routes/stock-routes.ts'

const app = express()
app.use(cors())
dotenv.config()

app.use(express.json())

app.use('/stock', stockRoutes)

export default app;