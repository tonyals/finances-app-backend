import { AddCreditOperationModel, AddCreditOperation } from '../../../domain/usecases/add-credit-operation'
import { OperationCreditModel, OperationDebitModel } from '../../../domain/models/operation-model'
import { CreditOperationRepository } from '../usecases/credit-operation-repository'
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
    const debitOperation = await this.debitOperationRepository.addDebitOperationRepository(operationData)
    return debitOperation
  }
}
