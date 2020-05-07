import { OperationType, OperationModel } from '../models/operation-model'

export interface AddOperationModel {
  type: OperationType
  amount: number
  date: Date
  description: string
}

export interface AddOperation {
  addOperation(operationData: AddOperationModel): Promise<OperationModel>
}
