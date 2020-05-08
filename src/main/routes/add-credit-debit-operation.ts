import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapters'
import { makeOperationController } from '../factories/add-credit-debit-operations'

export default (router: Router): void => {
  router.post('/api/operation', adaptRoute(makeOperationController()))
}
