import { FinancialResultModel } from '../../../domain/models/financial-result-model'

export interface FinancialResultRepository {
  financialResult(): Promise<FinancialResultModel>
}
