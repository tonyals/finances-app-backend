import { CreditOperationRepository } from '../../../../data/database/usecases/credit-debit-operations/credit-operation-repository'
import { AddCreditOperationModel } from '../../../../domain/usecases/credit-debit-operations/add-credit-operation'
import { OperationCreditModel, OperationDebitModel } from '../../../../domain/models/credit-debit-operation/operation-model'
import { Operation } from '../entities/Operation'
import { DebitOperationRepository } from '../../../../data/database/usecases/credit-debit-operations/debit-operation-repository'
import { AddDebitOperationModel } from '../../../../domain/usecases/credit-debit-operations/add-debit-operation'
import { OperationType } from '../../../../domain/models/reports-models/operation-enum'

export class OperationPostgresRepository implements CreditOperationRepository, DebitOperationRepository {
  async addCreditOperationRepository (operationData: AddCreditOperationModel): Promise<OperationCreditModel> {
    const operationCredit = await Operation.create({
      type: OperationType.CREDIT,
      amount: operationData.amount,
      date: operationData.date,
      description: operationData.description
    }).save()
    return operationCredit
  }

  async addDebitOperationRepository (operationData: AddDebitOperationModel): Promise<OperationDebitModel> {
    const operationDebit = await Operation.create({
      type: OperationType.DEBIT,
      amount: operationData.amount,
      date: operationData.date,
      description: operationData.description
    }).save()
    return operationDebit
  }
}
