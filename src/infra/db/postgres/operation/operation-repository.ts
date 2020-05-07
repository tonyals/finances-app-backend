import { CreditOperationRepository } from '../../../../data/database/usecases/operation-repository'
import { AddCreditOperationModel } from '../../../../domain/usecases/add-operation'
import { OperationCreditModel } from '../../../../domain/models/operation-model'
import { Operation, OperationType } from '../entities/Operation'

export class OperationPostgresRepository implements CreditOperationRepository {
  async addCreditOperationRepository (operationData: AddCreditOperationModel): Promise<OperationCreditModel> {
    const operationCredit = await Operation.create({
      type: OperationType.CREDIT,
      amount: operationData.amount,
      date: operationData.date,
      description: operationData.description
    }).save()
    return operationCredit
  }
}
