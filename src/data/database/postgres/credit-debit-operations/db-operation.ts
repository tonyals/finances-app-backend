import { AddCreditOperationModel, AddCreditOperation } from '../../../../domain/usecases/credit-debit-operations/add-credit-operation'
import { OperationCreditModel, OperationDebitModel } from '../../../../domain/models/credit-debit-operation/operation-model'
import { CreditOperationRepository } from '../../usecases/credit-debit-operations/credit-operation-repository'
import { AddDebitOperation, AddDebitOperationModel } from '../../../../domain/usecases/credit-debit-operations/add-debit-operation'
import { DebitOperationRepository } from '../../usecases/credit-debit-operations/debit-operation-repository'

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
