import { OperationType } from '../../../../domain/models/reports-models/operation-enum'
import { SumModel } from '../../../../domain/models/reports-models/sum-model'
import { Period } from '../../../../domain/usecases/reports-period/sum-all-by-type-and-period'

export interface SumPeriodOperationRepository {
  sumPeriodOperationRepository(operationType: OperationType, period: Period): Promise<SumModel>
}
