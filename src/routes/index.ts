import { Router } from 'express'

import transactionsRouter from './transactions'

const routes = Router()

routes.use('/transactions', transactionsRouter)

export default routes
