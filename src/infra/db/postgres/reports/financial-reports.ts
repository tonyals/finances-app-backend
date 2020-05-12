import { SumAllOperationRepository } from '../../../../data/database/usecases/sum-operations-by-type-repository'
import { OperationType } from '../../../../domain/models/operation-enum'
import { SumModel } from '../../../../domain/models/sum-model'
import { Operation } from '../entities/Operation'
import { FinancialResultRepository } from '../../../../data/database/usecases/financial-result-repository'
import { FinancialResultModel } from '../../../../domain/models/financial-result-model'
import { SumPeriodOperationRepository } from '../../../../data/database/usecases/sum-by-type-period-repository'
import { Period } from '../../../../domain/usecases/sum-all-by-type-and-period'
import { Between } from 'typeorm'

export class FinancialReportsPostgresRepository implements SumAllOperationRepository,
  FinancialResultRepository, SumPeriodOperationRepository {
  async sumAllOperationRepository (operationType: OperationType): Promise<SumModel> {
    const result = await Operation.find({
      select: ['id', 'type', 'description', 'amount', 'date'],
      where: {
        type: operationType
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

  async financialResultRepository (): Promise<FinancialResultModel> {
    const sumCredits = await this.sumAllOperationRepository(OperationType.CREDIT)
    const sumDebits = await this.sumAllOperationRepository(OperationType.DEBIT)
    const result = sumCredits.sum + (sumDebits.sum * -1)
    const resultFormatted = result.toFixed(2)
    const financialResult: FinancialResultModel = {
      sumCredits: sumCredits.sum,
      sumDebits: sumDebits.sum,
      result: parseFloat(resultFormatted)
    }
    return financialResult
  }

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
