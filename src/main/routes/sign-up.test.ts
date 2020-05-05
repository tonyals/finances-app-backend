import request from 'supertest'
import app from '../config/app'
import { CreateConnectionPostgres } from '../../infra/db/postgres/helpers/postgres-connect-helper'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await CreateConnectionPostgres.connect()
  })

  // beforeEach(async () => {
  //   await
  // })

  // afterAll(async () => {
  //   await CreateConnectionPostgres
  // })

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
