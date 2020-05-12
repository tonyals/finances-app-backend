import { OperationPostgresRepository } from './operation-repository'
import { CreateConnectionPostgres } from '../helpers/postgres-connect-helper'
import { Operation } from '../entities/Operation'
import { getConnection } from 'typeorm'
import { OperationType } from '../../../../domain/models/reports-models/operation-enum'

describe('Operation Repository', () => {
  beforeAll(async () => {
    await CreateConnectionPostgres.connect()
  })
  beforeEach(async () => {
    await Operation.delete({})
  })

  afterAll(async () => {
    await Operation.delete({})
    return getConnection(process.env.NODE_ENV).close
  })

  test('should return an CreditOperation if addOperationCredit success', async () => {
    const sut = new OperationPostgresRepository()
    const operationCredit = await sut.addCreditOperationRepository({
      type: OperationType.CREDIT,
      amount: 0,
      date: new Date(),
      description: 'any_description'
    })
    expect(operationCredit).toBeTruthy()
    expect(operationCredit.id).toBeTruthy()
  })

  test('should return an DebitOperation if addOperationDebit success', async () => {
    const sut = new OperationPostgresRepository()
    const operationDebit = await sut.addDebitOperationRepository({
      type: OperationType.DEBIT,
      amount: 0,
      date: new Date(),
      description: 'any_description'
    })
    expect(operationDebit).toBeTruthy()
    expect(operationDebit.id).toBeTruthy()
  })
})
