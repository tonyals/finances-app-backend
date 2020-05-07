import express from 'express'
import setupMiddlewares from './middlewares'
import signUpRoutes from '../routes/sign-up'
import operationRoutes from '../routes/operation'

const app = express()
setupMiddlewares(app)
signUpRoutes(app)
operationRoutes(app)

export default app
