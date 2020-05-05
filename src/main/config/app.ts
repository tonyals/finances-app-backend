import express from 'express'
import setupMiddlewares from './middlewares'
import signUpRoutes from '../routes/sign-up'

const app = express()
setupMiddlewares(app)
signUpRoutes(app)

export default app
