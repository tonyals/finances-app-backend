import { OperationDebitModel } from '../../models/credit-debit-operation/operation-model'
import { OperationType } from '../../models/reports-models/operation-enum'

export interface AddDebitOperationModel {
  type: OperationType.DEBIT
  amount: number
  date: Date
  description: string
}

export interface AddDebitOperation {
  addDebitOperation(operationData: AddDebitOperationModel): Promise<OperationDebitModel>
}
