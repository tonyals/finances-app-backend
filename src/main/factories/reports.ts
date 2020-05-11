import { Controller } from '../../presentation/protocols/controller'
import { FinancialReportsController } from '../../presentation/controllers/financial-reports/reports-controller'
import { DbFinancialReportsOperation } from '../../data/database/postgres/db-financial-reports'
import { FinancialReportsPostgresRepository } from '../../infra/db/postgres/reports/financial-reports'

export const makeReportsController = (): Controller => {
  const financialReportsRepository = new FinancialReportsPostgresRepository()
  const dbOperations = new DbFinancialReportsOperation(
    financialReportsRepository,
    financialReportsRepository,
    financialReportsRepository
  )
  return new FinancialReportsController(dbOperations, dbOperations)
}
