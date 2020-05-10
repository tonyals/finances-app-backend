import { OperationType } from '../models/operation-enum'
import { SumModel } from '../models/sum-model'

export interface Period {
  initialDate: Date
  finalDate: Date
}

export interface SumPeriodOperation {
  sumPeriodOperation(type: OperationType, period: Period): Promise<SumModel>
}
