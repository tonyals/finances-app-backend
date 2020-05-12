import { OperationType } from '../../../domain/models/operation-enum'
import { SumModel } from '../../../domain/models/sum-model'
import { Period } from '../../../domain/usecases/sum-all-by-type-and-period'

export interface SumPeriodOperationRepository {
  sumPeriodOperationRepository(operationType: OperationType, period: Period): Promise<SumModel>
}
