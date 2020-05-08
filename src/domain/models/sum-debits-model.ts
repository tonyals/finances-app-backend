import { OperationType } from './operation-enum'

export interface Debits {
  id: number
  type: OperationType
  description: string
  amount: number
}

export interface SumAllDebitsModel {
  debits: Debits[]
  sumDebits: number
}
