import { Controller } from '../../../presentation/protocols/controller'
import { FinancialPeriodReportsController } from '../../../presentation/controllers/financial-period-reports/reports-period-controller'
import { DateValidatorAdapter } from '../../../utils/date-validator-adapter'
import { DbFinancialPeriodReportsOperation } from '../../../data/database/postgres/reports-period/db-financial-period-reports'
import { FinancialPeriodReportsPostgresRepository } from '../../../infra/db/postgres/reports-period/financial-period-reports'

export const makeReportsPeriodController = (): Controller => {
  const financialPeriodReportsRepository = new FinancialPeriodReportsPostgresRepository()
  const dbPeriodOperations = new DbFinancialPeriodReportsOperation(
    financialPeriodReportsRepository
  )
  const dateValidator = new DateValidatorAdapter()
  return new FinancialPeriodReportsController(dbPeriodOperations, dateValidator)
}
