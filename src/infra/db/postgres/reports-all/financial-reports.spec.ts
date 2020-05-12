import { CreateConnectionPostgres } from '../helpers/postgres-connect-helper'
import { Operation } from '../entities/Operation'
import { getConnection } from 'typeorm'
import { FinancialReportsPostgresRepository } from './financial-reports'
import { OperationType } from '../../../../domain/models/reports-models/operation-enum'

describe('Financial Reports Repository', () => {
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
  describe('SumAll operations repository', () => {
    test('should return an array of DebitOperation if success', async () => {
      const sut = new FinancialReportsPostgresRepository()
      const operationDebit = await sut.sumAllOperationRepository(OperationType.DEBIT)
      expect(operationDebit).toBeTruthy()
      expect(operationDebit.operation[0]).toBeTruthy()
      expect(operationDebit.sum).toBe(2.85)
    })

    test('should return an array of CreditOperation if success', async () => {
      const sut = new FinancialReportsPostgresRepository()
      const operationCredit = await sut.sumAllOperationRepository(OperationType.CREDIT)
      expect(operationCredit).toBeTruthy()
      expect(operationCredit.operation[0]).toBeTruthy()
      expect(operationCredit.sum).toBe(2.95)
    })
  })
  describe('Financial result operation repository', () => {
    test('should return an financial result if success', async () => {
      const sut = new FinancialReportsPostgresRepository()
      const financialResult = await sut.financialResultRepository()
      expect(financialResult).toBeTruthy()
      expect(financialResult.sumCredits).toBe(2.95)
      expect(financialResult.sumDebits).toBe(2.85)
      expect(financialResult.result).toBe(0.10)
    })
  })
})
