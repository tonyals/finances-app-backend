import { AddCreditOperationModel, AddCreditOperation } from '../../../domain/usecases/add-operation'
import { OperationCreditModel, OperationDebitModel } from '../../../domain/models/operation-model'
import { CreditOperationRepository } from '../usecases/operation-repository'
import { AddDebitOperation, AddDebitOperationModel } from '../../../domain/usecases/add-debit-operation'
import { DebitOperationRepository } from '../usecases/debit-operation-repository'

export class DbOperation implements AddCreditOperation, AddDebitOperation {
  constructor (
    private readonly creditOperationRepository: CreditOperationRepository,
    private readonly debitOperationRepository: DebitOperationRepository
  ) {}

  async addCreditOperation (operationData: AddCreditOperationModel): Promise<OperationCreditModel> {
    const creditOperation = await this.creditOperationRepository.addCreditOperationRepository(operationData)
    return creditOperation
  }

  async addDebitOperation (operationData: AddDebitOperationModel): Promise<OperationDebitModel> {
    await this.debitOperationRepository.addDebitOperationRepository(operationData)
    return new Promise(resolve => resolve(null))
  }
}
