import { AddOperation, AddOperationModel } from '../../../domain/usecases/add-operation'
import { OperationModel } from '../../../domain/models/operation-model'
import { OperationRepository } from '../usecases/operation-repository'

export class DbOperation implements AddOperation {
  constructor (private readonly operationRepository: OperationRepository) {}

  async addOperation (operationData: AddOperationModel): Promise<OperationModel> {
    const operation = await this.operationRepository.addOperationRepository(operationData)
    return operation
  }
}