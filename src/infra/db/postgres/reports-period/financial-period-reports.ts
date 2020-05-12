import { OperationType } from '../../../../domain/models/operation-enum'
import { SumModel } from '../../../../domain/models/sum-model'
import { Operation } from '../entities/Operation'
import { SumPeriodOperationRepository } from '../../../../data/database/usecases/sum-by-type-period-repository'
import { Period } from '../../../../domain/usecases/sum-all-by-type-and-period'
import { Between } from 'typeorm'

export class FinancialPeriodReportsPostgresRepository implements SumPeriodOperationRepository {
  async sumPeriodOperationRepository (operationType: OperationType, period: Period): Promise<SumModel> {
    const result = await Operation.find({
      select: ['id', 'type', 'description', 'amount', 'date'],
      where: {
        type: operationType,
        date: Between(period.initialDate, period.finalDate)
      }
    })
    const total = result.reduce((sum, value) => {
      return sum + value.amount
    }, 0)

    const totalFormatted = total.toFixed(2)
    const operations: SumModel = {
      operation: result,
      sum: parseFloat(totalFormatted)
    }
    return operations
  }
}
