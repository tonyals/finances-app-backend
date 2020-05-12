import { FinancialResultModel } from '../../../../domain/models/reports-models/financial-result-model'

export interface FinancialResultRepository {
  financialResultRepository(): Promise<FinancialResultModel>
}
