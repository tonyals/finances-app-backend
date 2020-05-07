import { OperationPostgresRepository } from './operation-repository'
import { OperationType } from '../../../../domain/models/operation-model'
import { CreateConnectionPostgres } from '../helpers/postgres-connect-helper'
import { Operation } from '../entities/Operation'
import { getConnection } from 'typeorm'

describe('Operation Repository', () => {
  beforeAll(async () => {
    await CreateConnectionPostgres.connect()
  })
  beforeEach(async () => {
    await Operation.delete({})
  })

  afterAll(() => {
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
})
