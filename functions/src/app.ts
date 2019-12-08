import 'reflect-metadata'
import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import compression from 'compression'
import cors, { CorsOptions } from 'cors'
import httpErrors from 'http-errors'
import router from './routes'

const app = express()
const allowedOrigins = ['http://localhost:3000']
const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  allowedHeaders: 'Content-Type',
  maxAge: 100,
}

app.use(helmet())
app.use(logger('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression({ level: 3 }))
app.use(cors(corsOptions))
router(app)

app.use((_, __, next) => {
  next(httpErrors(404))
})

app.use((error: any, _: any, res: express.Response, __: any) => {
  res.status(error.status || 500).json(error)
})

process.on('unhandledRejection', (err) => {
  console.error(err)
})

process.on('uncaughtException', (err) => {
  console.error(err)
  process.exit(1)
})

export default app
