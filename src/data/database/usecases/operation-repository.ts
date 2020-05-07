import { AddCreditOperationModel } from '../../../domain/usecases/add-operation'
import { OperationCreditModel } from '../../../domain/models/operation-model'

export interface CreditOperationRepository {
  addCreditOperationRepository(operationData: AddCreditOperationModel): Promise<OperationCreditModel>
}
