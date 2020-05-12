import { OperationType } from '../../../../domain/models/reports-models/operation-enum'
import { SumModel } from '../../../../domain/models/reports-models/sum-model'
import { Period } from '../../../../domain/models/reports-models/period-model'

export interface SumPeriodOperationRepository {
  sumPeriodOperationRepository(operationType: OperationType, period: Period): Promise<SumModel>
}
