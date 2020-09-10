import Transaction from '../models/Transaction'
import Category from '../models/Category'
import { TransactionType, TransactionResponse } from '../formats/Transaction'

const createTransaction = (
  { id, title, value, type, created_at, updated_at }: Transaction,
  category: Category
): TransactionResponse => {
  return {
    id,
    title,
    value,
    type: type as TransactionType,
    category,
    created_at,
    updated_at
  }
}

export default createTransaction
