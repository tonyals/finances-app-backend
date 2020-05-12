import { OperationController } from '../../../presentation/controllers/add-credit-debit-operation/cred-deb-operation-controller'
import { DbOperation } from '../../../data/database/postgres/credit-debit-operations/db-operation'
import { OperationPostgresRepository } from '../../../infra/db/postgres/credit-debit-operation/operation-repository'
import { Controller } from '../../../presentation/protocols/controller'

export const makeOperationController = (): Controller => {
  const creditOperationRepository = new OperationPostgresRepository()
  const debitOperationRepository = new OperationPostgresRepository()
  const dbOperation = new DbOperation(creditOperationRepository, debitOperationRepository)
  return new OperationController(dbOperation, dbOperation)
}
