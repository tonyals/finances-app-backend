import { SumAllOperationRepository } from '../../../../data/database/usecases/sum-debits-repository'
import { OperationType } from '../../../../domain/models/operation-enum'
import { SumAllModel } from '../../../../domain/models/sum-all-model'
import { Operation } from '../entities/Operation'

export class FinancialReportsPostgresRepository implements SumAllOperationRepository {
  async sumAllOperationRepository (operationType: OperationType): Promise<SumAllModel> {
    const result = await Operation.find({
      select: ['id', 'type', 'description', 'amount'],
      where: {
        type: operationType
      }
    })

    const total = result.reduce((sum, value) => {
      return sum + value.amount
    }, 0)

    const operations: SumAllModel = {
      operation: result,
      sum: total
    }
    return operations
  }
}
