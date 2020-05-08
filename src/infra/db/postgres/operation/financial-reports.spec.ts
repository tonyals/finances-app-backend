import { CreateConnectionPostgres } from '../helpers/postgres-connect-helper'
import { Operation } from '../entities/Operation'
import { getConnection } from 'typeorm'
import { FinancialReportsPostgresRepository } from './financial-reports'
import { OperationType } from '../../../../domain/models/operation-enum'

describe('Operation Repository', () => {
  beforeAll(async () => {
    await CreateConnectionPostgres.connect()
  })
  beforeEach(async () => {
    await Operation.create({
      type: OperationType.DEBIT,
      amount: 2.85,
      date: new Date(),
      description: 'any_description'
    }).save()
    await Operation.create({
      type: OperationType.DEBIT,
      amount: 3.5,
      date: new Date(),
      description: 'any_description'
    }).save()
  })

  afterAll(async () => {
    await Operation.delete({})
    return getConnection(process.env.NODE_ENV).close
  })

  test('should return an array of DebitOperation if success', async () => {
    const sut = new FinancialReportsPostgresRepository()
    const operationDebit = await sut.sumAllOperationRepository(OperationType.DEBIT)
    expect(operationDebit).toBeTruthy()
  })
})
