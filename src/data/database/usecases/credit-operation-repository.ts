import { AddCreditOperationModel } from '../../../domain/usecases/add-credit-operation'
import { OperationCreditModel } from '../../../domain/models/operation-model'

export interface CreditOperationRepository {
  addCreditOperationRepository(operationData: AddCreditOperationModel): Promise<OperationCreditModel>
}
