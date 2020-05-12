import { OperationType } from '../../models/reports-models/operation-enum'
import { SumModel } from '../../models/reports-models/sum-model'

export interface SumAllOperation {
  sumAllOperation(type: OperationType): Promise<SumModel>
}
