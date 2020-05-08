import { SumAllDebitsOperationRepository } from '../../../../data/database/usecases/sum-debits-repository'
import { OperationType } from '../../../../domain/models/operation-enum'
import { SumAllDebitsModel } from '../../../../domain/models/sum-debits-model'
import { Operation } from '../entities/Operation'

export class FinancialReportsPostgresRepository implements SumAllDebitsOperationRepository {
  async sumAllDebitsOperationRepository (operationType: OperationType.DEBIT): Promise<SumAllDebitsModel> {
    const finDebits = await Operation.find({
      select: ['id', 'type', 'description', 'amount'],
      where: {
        type: OperationType.DEBIT
      }
    })

    const totalDebits = finDebits.reduce((sum, value) => {
      return sum + value.amount
    }, 0)

    const debitOperations: SumAllDebitsModel = {
      debits: finDebits,
      sumDebits: totalDebits
    }
    return debitOperations
  }
}
