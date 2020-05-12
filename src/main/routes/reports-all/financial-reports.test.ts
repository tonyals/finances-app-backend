import request from 'supertest'
import app from '../../config/app'
import { CreateConnectionPostgres } from '../../../infra/db/postgres/helpers/postgres-connect-helper'
import { getConnection } from 'typeorm'
import { Operation } from '../../../infra/db/postgres/entities/Operation'
import { OperationType } from '../../../domain/models/reports-models/operation-enum'

describe('Operation route', () => {
  beforeAll(async () => {
    await CreateConnectionPostgres.connect()
    await Operation.create({
      type: OperationType.DEBIT,
      amount: 2.85,
      date: new Date('2020-05-10T00:00:00-03:00'),
      description: 'any_description'
    }).save()

    await Operation.create({
      type: OperationType.CREDIT,
      amount: 3.5,
      date: new Date('2020-05-10T00:00:00-03:00'),
      description: 'any_description'
    }).save()
  })

  afterAll(async () => {
    await Operation.delete({})
    return getConnection(process.env.NODE_ENV).close
  })

  test('should return an operation DEBIT on success', async () => {
    await request(app)
      .post('/api/reports')
      .send({
        type: 'DEBIT'
      })
      .expect(
        {
          operation: [
            {
              id: 1,
              type: 'DEBIT',
              date: '2020-05-10',
              description: 'any_description',
              amount: 2.85
            }
          ],
          sum: 2.85
        }
      )
  })

  test('should return an operation CREDIT on success', async () => {
    await request(app)
      .post('/api/reports')
      .send({
        type: 'CREDIT'
      })
      .expect(
        {
          operation: [
            {
              id: 2,
              type: 'CREDIT',
              date: '2020-05-10',
              description: 'any_description',
              amount: 3.5
            }
          ],
          sum: 3.5
        }
      )
  })

  test('should return all operations on success', async () => {
    await request(app)
      .post('/api/reports')
      .send({
        type: 'GET-ALL'
      })
      .expect(
        {
          operation: [
            {
              id: 1,
              type: 'DEBIT',
              date: '2020-05-10',
              description: 'any_description',
              amount: 2.85
            },
            {
              id: 2,
              type: 'CREDIT',
              date: '2020-05-10',
              description: 'any_description',
              amount: 3.5
            }
          ]
        }
      )
  })

  test('should return an FINANCIAL-RESULT on success', async () => {
    await request(app)
      .post('/api/reports')
      .send({
        type: 'FINANCIAL-RESULT'
      })
      .expect(
        {
          sumDebits: 2.85,
          sumCredits: 3.5,
          result: 0.65
        }
      )
  })
})
