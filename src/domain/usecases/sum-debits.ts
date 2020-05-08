import { OperationType } from '../models/operation-enum'
import { SumAllModel } from '../models/sum-debits-model'

export interface SumAllOperation {
  sumAllOperation(type: OperationType): Promise<SumAllModel>
}
