import { OperationType } from './operation-enum'

export interface SumAllDebitsModel {
  id: number
  type: OperationType.DEBIT
  description: string
  amount: number
  sum: number
}
