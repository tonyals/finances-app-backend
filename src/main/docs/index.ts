import { loginPath } from './paths/login-path'
import { accountSchema } from './schemas/account-schema'
import { signUpSchema } from './schemas/signup-schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Finances App Backend',
    description: 'A simple finances management app.',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/signup': loginPath
  },
  schemas: {
    account: accountSchema,
    signup: signUpSchema
  }
}
