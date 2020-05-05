import { CreateConnectionPostgres } from '../infra/db/postgres/helpers/postgres-connect-helper'

CreateConnectionPostgres.connect().then(async () => {
  const app = (await import('./config/app')).default
  app.listen(5050, () => console.log('Server running: 5050'))
}).catch(console.error)
