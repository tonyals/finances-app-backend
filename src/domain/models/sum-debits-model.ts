import { OperationType } from './operation-enum'

export interface Operation {
  id: number
  type: OperationType
  description: string
  amount: number
}

export interface SumAllModel {
  operation: Operation[]
  sum: number
}
