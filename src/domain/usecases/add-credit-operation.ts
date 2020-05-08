import { OperationCreditModel } from '../models/operation-model'
import { OperationType } from '../models/operation-enum'

export interface AddCreditOperationModel {
  type: OperationType.CREDIT
  amount: number
  date: Date
  description: string
}

export interface AddCreditOperation {
  addCreditOperation(operationData: AddCreditOperationModel): Promise<OperationCreditModel>
}
