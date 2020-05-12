import { OperationType } from './operation-enum'
import { Period } from '../usecases/sum-all-by-type-and-period'

export interface Operation {
  id: number
  type: OperationType
  description: string
  date?: Date
  period?: Period
  amount: number
}

export interface SumModel {
  operation: Operation[]
  sum: number
}
