import { OperationType, OperationCreditModel } from '../models/operation-model'

export interface AddCreditOperationModel {
  type: OperationType.CREDIT
  amount: number
  date: Date
  description: string
}

export interface AddCreditOperation {
  addCreditOperation(operationData: AddCreditOperationModel): Promise<OperationCreditModel>
}
