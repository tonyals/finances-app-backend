import request from 'supertest'
import app from '../config/app'

describe('Body Parser middleware', () => {
  test('should parse body as json', async () => {
    app.post('/_test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/_test_body_parser')
      .send({ name: 'Tony' })
      .expect({ name: 'Tony' })
  })
})
