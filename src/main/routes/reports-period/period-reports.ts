import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-routes-adapters'
import { makeReportsPeriodController } from '../../factories/reports-period/report-period'

export default (router: Router): void => {
  router.post('/api/reports/period', adaptRoute(makeReportsPeriodController()))
}
