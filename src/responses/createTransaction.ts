import Transaction from '../models/Transaction'
import Category from '../models/Category'
import { getTransactionTypeTitle } from '../enums/transactionTypes'
import { TransactionType, TransactionResponse } from '../formats/Transaction'

const createTransaction = (
  { id, title, value, type, created_at, updated_at }: Transaction,
  category: Category
): TransactionResponse => {
  const transactionCategoryName = getTransactionTypeTitle(
    type
  ) as TransactionType
  return {
    id,
    title,
    value,
    type: transactionCategoryName,
    category,
    created_at,
    updated_at
  }
}

export default createTransaction
