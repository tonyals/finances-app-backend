import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapters'
import { makeOperationController } from '../factories/operation'

export default (router: Router): void => {
  router.post('/api/operation', adaptRoute(makeOperationController()))
}
