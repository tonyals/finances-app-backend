import { Period } from '../../usecases/reports-period/sum-all-by-type-and-period'
import { OperationType } from './operation-enum'

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
