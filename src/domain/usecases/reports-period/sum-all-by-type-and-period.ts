import { OperationType } from '../../models/reports-models/operation-enum'
import { SumModel } from '../../models/reports-models/sum-model'
import { Period } from '../../models/reports-models/period-model'

export interface SumPeriodOperation {
  sumPeriodOperation(type: OperationType, period: Period): Promise<SumModel>
}
