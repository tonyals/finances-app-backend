import { OperationType } from './operation-enum'

export interface Operation {
  id: number
  type: OperationType
  description: string
  date?: Date
  amount: number
}

export interface SumModel {
  operation: Operation[]
  sum: number
}
