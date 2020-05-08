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
      amount: 2.85,
      date: new Date(),
      description: 'any_description'
    }).save()

    await Operation.create({
      type: OperationType.CREDIT,
      amount: 3.5,
      date: new Date(),
      description: 'any_description'
    }).save()
  })

  afterAll(async () => {
    await Operation.delete({})
    return getConnection(process.env.NODE_ENV).close
  })

  test('should return an operation DEBIT on success', async () => {
    await request(app)
      .get('/api/reports')
      .send({
        type: 'DEBIT'
      })
      .expect(
        {
          operation: [
            {
              id: 1,
              type: 'DEBIT',
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
      .get('/api/reports')
      .send({
        type: 'CREDIT'
      })
      .expect(
        {
          operation: [
            {
              id: 2,
              type: 'CREDIT',
              description: 'any_description',
              amount: 3.5
            }
          ],
          sum: 3.5
        }
      )
  })
})
