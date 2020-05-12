import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-routes-adapters'
import { makeReportsController } from '../../factories/reports-all/reports-all'

export default (router: Router): void => {
  router.post('/api/reports', adaptRoute(makeReportsController()))
}
