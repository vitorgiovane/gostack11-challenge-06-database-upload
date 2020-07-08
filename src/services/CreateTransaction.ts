import { getCustomRepository, getRepository } from 'typeorm'

import AppError from '../errors/AppError'

import { TransactionRequest, TransactionResponse } from '../formats/Transaction'
import Category from '../models/Category'
import TransactionsRepository from '../repositories/Transactions'
import { getTransactionTypeCode } from '../enums/transactionTypes'
import createTransactionResponse from '../responses/createTransaction'

class CreateTransaction {
  public async run({
    title,
    value,
    type,
    categoryTitle
  }: TransactionRequest): Promise<TransactionResponse> {
    if (!title || !value || !type || !categoryTitle) {
      throw new AppError(
        'The attributes title, value, type and category are required'
      )
    }

    const transactionsRepository = getCustomRepository(TransactionsRepository)
    const categoriesRepository = getRepository(Category)

    const category = await categoriesRepository.findOne({
      where: { title: categoryTitle.toLowerCase() }
    })

    if (!category) throw new AppError('Invalid category title')

    const transactionTypeCode = getTransactionTypeCode(type)
    if (!transactionTypeCode) throw new AppError('Invalid transaction type')

    const transaction = transactionsRepository.create({
      title,
      value,
      type: transactionTypeCode,
      category_id: category.id
    })

    await transactionsRepository.save(transaction)

    return createTransactionResponse(transaction, category)
  }
}

export default CreateTransaction
