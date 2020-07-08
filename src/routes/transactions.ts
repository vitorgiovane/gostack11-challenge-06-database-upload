import { Router } from 'express'
import { getCustomRepository } from 'typeorm'

import TransactionsRepository from '../repositories/Transactions'
import CreateTransactionService from '../services/CreateTransaction'
import Category from '../models/Category'
import listTransactions from '../responses/listTransactions'
import DeleteTransactionService from '../services/DeleteTransaction'
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router()

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository)
  const transactions = await transactionsRepository.find({
    relations: ['category']
  })
  const transformedTransactions = listTransactions(transactions)
  const balance = await transactionsRepository.getBalance()

  return response.json({ transactions: transformedTransactions, balance })
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
  const { id } = request.params
  const deleteTransactionService = new DeleteTransactionService()
  await deleteTransactionService.run(id)
  return response.status(204).send()
})

transactionsRouter.post('/import', async (request, response) => {
  // TODO
})

export default transactionsRouter
