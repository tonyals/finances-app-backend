import { OperationController } from '../../presentation/controllers/operation/operation'
import { DbOperation } from '../../data/database/postgres/db-operation'
import { OperationPostgresRepository } from '../../infra/db/postgres/operation/operation-repository'
import { Controller } from '../../presentation/protocols/controller'

export const makeOperationController = (): Controller => {
  const creditOperationRepository = new OperationPostgresRepository()
  const dbOperation = new DbOperation(creditOperationRepository)
  return new OperationController(dbOperation)
}
