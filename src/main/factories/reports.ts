import { Controller } from '../../presentation/protocols/controller'
import { FinancialReportsController } from '../../presentation/controllers/reports/reports-controller'
import { DbFinancialReportsOperation } from '../../data/database/postgres/db-financial-reports'
import { FinancialReportsPostgresRepository } from '../../infra/db/postgres/operation/financial-reports'

export const makeReportsController = (): Controller => {
  const financialReportsRepository = new FinancialReportsPostgresRepository()
  const dbFinancialReports = new DbFinancialReportsOperation(financialReportsRepository)
  return new FinancialReportsController(dbFinancialReports)
}