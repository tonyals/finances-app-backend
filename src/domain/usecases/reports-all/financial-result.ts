import { FinancialResultModel } from '../../models/reports-models/financial-result-model'

export interface FinancialResultOperation {
  financialResult(): Promise<FinancialResultModel>
}
