import { Router } from 'express'
import multer from 'multer'
import { getCustomRepository } from 'typeorm'

import TransactionsRepository from '../repositories/Transactions'
import CreateTransactionService from '../services/CreateTransaction'
import ImportTransactionsService from '../services/ImportTransactions'
import listTransactions from '../responses/listTransactions'
import DeleteTransactionService from '../services/DeleteTransaction'

const transactionsRouter = Router()
const upload = multer({ dest: '../tmp' })

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

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const importTransactionsService = new ImportTransactionsService()

    try {
      const transactions = await importTransactionsService.run(
        request.file.path
      )
      return response.json(transactions)
    } catch (error) {
      return response.json(error)
    }
  }
)

export default transactionsRouter
