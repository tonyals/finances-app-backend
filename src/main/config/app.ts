import express from 'express'
import setupMiddlewares from './middlewares'
import signUpRoutes from '../routes/sign-up'
import operationRoutes from '../routes/add-credit-debit-operation'
import financialReportsRoutes from '../routes/financial-reports'
import periodReportsRoutes from '../routes/period-reports'

const app = express()
setupMiddlewares(app)
signUpRoutes(app)
operationRoutes(app)
financialReportsRoutes(app)
periodReportsRoutes(app)
export default app
