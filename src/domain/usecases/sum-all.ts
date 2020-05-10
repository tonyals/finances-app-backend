import { OperationType } from '../models/operation-enum'
import { SumModel } from '../models/sum-model'

export interface SumAllOperation {
  sumAllOperation(type: OperationType): Promise<SumModel>
}
