import { FinancialResultModel } from '../../../domain/models/financial-result-model'

export interface FinancialResultRepository {
  financialResultRepository(): Promise<FinancialResultModel>
}
