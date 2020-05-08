import { OperationType } from '../models/operation-enum'
import { SumAllModel } from '../models/sum-all-model'

export interface SumAllOperation {
  sumAllOperation(type: OperationType): Promise<SumAllModel>
}
