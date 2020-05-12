import { CreateConnectionPostgres } from '../helpers/postgres-connect-helper'
import { Operation } from '../entities/Operation'
import { getConnection } from 'typeorm'
import { FinancialPeriodReportsPostgresRepository } from './financial-period-reports'
import { OperationType } from '../../../../domain/models/operation-enum'

describe('Financial Period Reports Repository', () => {
  beforeAll(async () => {
    await CreateConnectionPostgres.connect()
    await Operation.create({
      type: OperationType.DEBIT,
      amount: 2.85,
      date: new Date('2020-05-05T00:00:00-03:00'),
      description: 'any_description'
    }).save()

    await Operation.create({
      type: OperationType.CREDIT,
      amount: 2.95,
      date: new Date('2020-05-05T00:00:00-03:00'),
      description: 'any_description'
    }).save()
  })

  afterAll(async () => {
    await Operation.delete({})
    return getConnection(process.env.NODE_ENV).close
  })

  describe('Sum Period operation repository', () => {
    test('should return an sum period result if success', async () => {
      const sut = new FinancialPeriodReportsPostgresRepository()
      const sumPeriodResult = await sut.sumPeriodOperationRepository(OperationType.CREDIT, {
        initialDate: new Date('2020-05-05T00:00:00-03:00'),
        finalDate: new Date('2020-05-05T00:00:00-03:00')
      })
      expect(sumPeriodResult).toBeTruthy()
      expect(sumPeriodResult.sum).toBe(2.95)
    })
  })
})
