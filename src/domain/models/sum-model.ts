import { OperationType } from './operation-enum'
import { Period } from '../usecases/sum-period'

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
