import Transaction from '../models/Transaction'
import { getTransactionTypeTitle } from '../enums/transactionTypes'
import { TransactionType, TransactionResponse } from '../formats/Transaction'

const listTransactions = (
  transactions: Transaction[]
): TransactionResponse[] => {
  const transformedTransactions = transactions.map(
    ({ id, title, value, type, category, created_at, updated_at }) => {
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
  )

  return transformedTransactions
}

export default listTransactions
