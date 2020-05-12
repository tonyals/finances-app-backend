import { AddCreditOperationModel } from '../../../../domain/usecases/credit-debit-operations/add-credit-operation'
import { OperationCreditModel } from '../../../../domain/models/credit-debit-operation/operation-model'

export interface CreditOperationRepository {
  addCreditOperationRepository(operationData: AddCreditOperationModel): Promise<OperationCreditModel>
}
