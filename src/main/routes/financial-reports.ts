import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapters'
import { makeReportsController } from '../factories/reports'

export default (router: Router): void => {
  router.get('/api/reports', adaptRoute(makeReportsController()))
}
