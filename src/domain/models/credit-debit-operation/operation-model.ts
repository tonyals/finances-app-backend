import { OperationType } from '../reports-models/operation-enum'

export interface OperationCreditModel {
  id: number
  type: OperationType
  amount: number
  date: Date
  description: string
}

export interface OperationDebitModel {
  id: number
  type: OperationType
  amount: number
  date: Date
  description: string
}
