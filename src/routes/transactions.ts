import { Router } from 'express'
import { getCustomRepository } from 'typeorm'

import TransactionsRepository from '../repositories/Transactions'
import CreateTransactionService from '../services/CreateTransaction'
import Category from '../models/Category'
import listTransactions from '../responses/listTransactions'
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router()

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository)
  const transactions = await transactionsRepository.find({
    relations: ['category']
  })
  const transformedTransactions = listTransactions(transactions)
  return response.json(transformedTransactions)
})

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body
  const createTransactionService = new CreateTransactionService()
  const transaction = await createTransactionService.run({
    title,
    value,
    type,
    categoryTitle: category
  })

  return response.json(transaction)
})

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
})

transactionsRouter.post('/import', async (request, response) => {
  // TODO
})

export default transactionsRouter
