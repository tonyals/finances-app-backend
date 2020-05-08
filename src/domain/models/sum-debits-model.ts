import { OperationType } from './operation-enum'

export interface SumAllDebitsModel {
  type: OperationType.DEBIT
  description: string
  amount: number
  sum: number
}
