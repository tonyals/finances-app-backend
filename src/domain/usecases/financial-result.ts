import { FinancialResultModel } from '../models/financial-result-model'

export interface FinancialResultOperation {
  financialResult(): Promise<FinancialResultModel>
}
