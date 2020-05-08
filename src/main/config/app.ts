import express from 'express'
import setupMiddlewares from './middlewares'
import signUpRoutes from '../routes/sign-up'
import operationRoutes from '../routes/add-credit-debit-operation'
import financialReportsRoutes from '../routes/financial-reports'

const app = express()
setupMiddlewares(app)
signUpRoutes(app)
operationRoutes(app)
financialReportsRoutes(app)

export default app
