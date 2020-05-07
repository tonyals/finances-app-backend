import { OperationType, OperationDebitModel } from '../models/operation-model'

export interface AddDebitOperationModel {
  type: OperationType.DEBIT
  amount: number
  date: Date
  description: string
}

export interface AddDebitOperation {
  addDebitOperation(operationData: AddDebitOperationModel): Promise<OperationDebitModel>
}
