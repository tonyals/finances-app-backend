import { OperationDebitModel } from '../models/operation-model'
import { OperationType } from '../models/operation-enum'

export interface AddDebitOperationModel {
  type: OperationType.DEBIT
  amount: number
  date: Date
  description: string
}

export interface AddDebitOperation {
  addDebitOperation(operationData: AddDebitOperationModel): Promise<OperationDebitModel>
}
