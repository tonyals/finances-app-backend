import { OperationType } from '../models/operation-enum'
import { SumAllDebitsModel } from '../models/sum-debits-model'

export interface SumAllDebitsOperation {
  sumAllDebitsOperation(type: OperationType.DEBIT): Promise<SumAllDebitsModel>
}
