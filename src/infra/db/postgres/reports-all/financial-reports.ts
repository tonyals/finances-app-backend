import { SumAllOperationRepository } from '../../../../data/database/usecases/reports-all/sum-operations-by-type-repository'
import { OperationType } from '../../../../domain/models/reports-models/operation-enum'
import { SumModel } from '../../../../domain/models/reports-models/sum-model'
import { Operation } from '../entities/Operation'
import { FinancialResultRepository } from '../../../../data/database/usecases/reports-all/financial-result-repository'
import { FinancialResultModel } from '../../../../domain/models/reports-models/financial-result-model'
import { GetAllOperationRepository } from '../../../../data/database/usecases/reports-all/get-all-operations-repository'
import { GetAllModel } from '../../../../domain/models/reports-models/get-all-model'

export class FinancialReportsPostgresRepository implements SumAllOperationRepository,
  FinancialResultRepository, GetAllOperationRepository {
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

  async getAllOperationRepository (): Promise<GetAllModel> {
    const getAllOperations = await Operation.find({
      select: ['id', 'type', 'description', 'amount', 'date']
    })
    const operations: GetAllModel = {
      operation: getAllOperations
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
