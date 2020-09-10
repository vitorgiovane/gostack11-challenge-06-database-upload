import Transaction from '../models/Transaction'
import { TransactionType, TransactionResponse } from '../formats/Transaction'

const listTransactions = (
  transactions: Transaction[]
): TransactionResponse[] => {
  const transformedTransactions = transactions.map(
    ({ id, title, value, type, category, created_at, updated_at }) => {
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
  )

  return transformedTransactions
}

export default listTransactions
