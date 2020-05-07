import { AddOperationModel } from '../../../domain/usecases/add-operation'
import { OperationModel } from '../../../domain/models/operation-model'

export interface OperationRepository {
  addOperationRepository(operationData: AddOperationModel): Promise<OperationModel>
}
