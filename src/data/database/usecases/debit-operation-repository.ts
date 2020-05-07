import { OperationDebitModel } from '../../../domain/models/operation-model'
import { AddDebitOperationModel } from '../../../domain/usecases/add-debit-operation'

export interface DebitOperationRepository {
  addDebitOperationRepository(operationData: AddDebitOperationModel): Promise<OperationDebitModel>
}
