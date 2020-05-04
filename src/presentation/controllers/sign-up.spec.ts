import { SignUpController } from './sign-up'

const makeSut = (): SignUpController => {
  return new SignUpController()
}

describe('SignUpController', () => {
  test('should return 400 if no name is provided', async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({
      body: {
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: {
        error: 'Missing Param'
      }
    })
  })
})
