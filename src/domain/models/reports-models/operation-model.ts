import { OperationType } from './operation-enum'
import { Period } from './period-model'

export interface Operation {
  id: number
  type: OperationType
  description: string
  date?: Date
  period?: Period
  amount: number
}
