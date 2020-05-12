import { OperationDebitModel } from '../../../../domain/models/credit-debit-operation/operation-model'
import { AddDebitOperationModel } from '../../../../domain/usecases/credit-debit-operations/add-debit-operation'

export interface DebitOperationRepository {
  addDebitOperationRepository(operationData: AddDebitOperationModel): Promise<OperationDebitModel>
}
