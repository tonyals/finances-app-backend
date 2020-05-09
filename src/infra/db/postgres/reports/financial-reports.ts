import { SumAllOperationRepository } from '../../../../data/database/usecases/sum-debits-repository'
import { OperationType } from '../../../../domain/models/operation-enum'
import { SumAllModel } from '../../../../domain/models/sum-all-model'
import { Operation } from '../entities/Operation'
import { FinancialResultRepository } from '../../../../data/database/usecases/financial-result-repository'
import { FinancialResultModel } from '../../../../domain/models/financial-result-model'

export class FinancialReportsPostgresRepository implements SumAllOperationRepository,
  FinancialResultRepository {
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

    const totalFormatted = total.toFixed(2)
    const operations: SumAllModel = {
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
}
