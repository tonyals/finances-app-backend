import request from 'supertest'
import app from '../../config/app'
import { CreateConnectionPostgres } from '../../../infra/db/postgres/helpers/postgres-connect-helper'
import { Operation } from '../../../infra/db/postgres/entities/Operation'
import { getConnection } from 'typeorm'

describe('Operation route', () => {
  beforeAll(async () => {
    await CreateConnectionPostgres.connect()
  })

  afterAll(async () => {
    await Operation.delete({})
    return getConnection(process.env.NODE_ENV).close
  })

  test('should return an operation CREDIT on success', async () => {
    await request(app)
      .post('/api/operation')
      .send({
        type: 'CREDIT',
        amount: 1,
        date: new Date(),
        description: 'any_description'
      })
      .expect(200)
  })

  test('should return an operation DEBIT on success', async () => {
    await request(app)
      .post('/api/operation')
      .send({
        type: 'DEBIT',
        amount: 1,
        date: new Date(),
        description: 'any_description'
      })
      .expect(200)
  })
})
