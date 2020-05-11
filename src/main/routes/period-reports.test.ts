import request from 'supertest'
import app from '../config/app'
import { CreateConnectionPostgres } from '../../infra/db/postgres/helpers/postgres-connect-helper'
import { getConnection } from 'typeorm'
import { Operation } from '../../infra/db/postgres/entities/Operation'
import { OperationType } from '../../domain/models/operation-enum'

describe('Operation route', () => {
  beforeAll(async () => {
    await CreateConnectionPostgres.connect()

    await Operation.create({
      type: OperationType.DEBIT,
      amount: 2.5,
      date: new Date('2020-05-09T00:00:00-03:00'),
      description: 'any_description'
    }).save()

    await Operation.create({
      type: OperationType.DEBIT,
      amount: 3.5,
      date: new Date('2020-05-10T00:00:00-03:00'),
      description: 'any_description'
    }).save()
  })

  afterAll(async () => {
    await Operation.delete({})
    return getConnection(process.env.NODE_ENV).close
  })

  test('should return an SUM-PERIOD on success', async () => {
    await request(app)
      .post('/api/reports/period')
      .send({
        typeReport: 'SUM-PERIOD',
        operation: 'DEBIT',
        initialDate: '2020-05-09',
        finalDate: '2020-05-10'
      })
      .expect(
        {
          operation: [
            {
              id: 1,
              type: 'DEBIT',
              amount: 2.5,
              date: '2020-05-09',
              description: 'any_description'
            },
            {
              id: 2,
              type: 'DEBIT',
              amount: 3.5,
              date: '2020-05-10',
              description: 'any_description'
            }
          ],
          sum: 6
        }
      )
  })
})
