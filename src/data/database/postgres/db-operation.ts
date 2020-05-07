import { AddCreditOperationModel, AddCreditOperation } from '../../../domain/usecases/add-operation'
import { OperationCreditModel } from '../../../domain/models/operation-model'
import { CreditOperationRepository } from '../usecases/operation-repository'

export class DbOperation implements AddCreditOperation {
  constructor (private readonly operationRepository: CreditOperationRepository) {}

  async addCreditOperation (operationData: AddCreditOperationModel): Promise<OperationCreditModel> {
    const creditOperation = await this.operationRepository.addCreditOperationRepository(operationData)
    console.log(creditOperation)
    return creditOperation
  }
}
