import request from 'supertest'
import app from '../../config/app'
import { CreateConnectionPostgres } from '../../../infra/db/postgres/helpers/postgres-connect-helper'
import { User } from '../../../infra/db/postgres/entities/User'
import { getConnection } from 'typeorm'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await CreateConnectionPostgres.connect()
  })

  afterAll(async () => {
    await User.delete({})
    return getConnection(process.env.NODE_ENV).close
  })

  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Tony Augusto',
        email: 'a@a.com',
        password: '12345',
        passwordConfirmation: '12345'
      })
      .expect(200)
  })
})
