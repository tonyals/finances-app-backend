import express from 'express'
import setupMiddlewares from './middlewares'
import signUpRoutes from '../routes/account/sign-up'
import operationRoutes from '../routes/credit-debit-operation/add-credit-debit-operation'
import financialReportsRoutes from '../routes/reports-all/financial-reports'
import periodReportsRoutes from '../routes/reports-period/period-reports'

const app = express()
setupMiddlewares(app)
signUpRoutes(app)
operationRoutes(app)
financialReportsRoutes(app)
periodReportsRoutes(app)
export default app
