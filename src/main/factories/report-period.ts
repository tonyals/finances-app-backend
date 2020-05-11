import { DbFinancialReportsOperation } from '../../data/database/postgres/db-financial-reports'
import { FinancialReportsPostgresRepository } from '../../infra/db/postgres/reports/financial-reports'
import { Controller } from '../../presentation/protocols/controller'
import { FinancialPeriodReportsController } from '../../presentation/controllers/financial-period-reports/reports-period-controller'
import { DateValidatorAdapter } from '../../utils/date-validator-adapter'

export const makeReportsPeriodController = (): Controller => {
  const financialReportsRepository = new FinancialReportsPostgresRepository()
  const dbOperations = new DbFinancialReportsOperation(
    financialReportsRepository,
    financialReportsRepository,
    financialReportsRepository
  )
  const dateValidator = new DateValidatorAdapter()
  return new FinancialPeriodReportsController(dbOperations, dateValidator)
}
