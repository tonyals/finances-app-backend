import { SumPeriodOperation, Period } from '../../../domain/usecases/sum-all-by-type-and-period'
import { OperationType } from '../../../domain/models/operation-enum'
import { SumModel } from '../../../domain/models/sum-model'
import { SumPeriodOperationRepository } from '../usecases/sum-by-type-period-repository'

export class DbFinancialPeriodReportsOperation implements SumPeriodOperation {
  constructor (
    private readonly sumPeriodOpRepository: SumPeriodOperationRepository
  ) {}

  async sumPeriodOperation (type: OperationType, period: Period): Promise<SumModel> {
    const sumPeriod = await this.sumPeriodOpRepository.sumPeriodOperationRepository(type, {
      initialDate: period.initialDate,
      finalDate: period.finalDate
    })
    return sumPeriod
  }
}
