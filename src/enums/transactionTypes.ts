import AppError from '../errors/AppError'

const transactionTypes = [
  { title: 'income', code: 1 },
  { title: 'outcome', code: 2 }
]

export const getTransactionTypeCode = (
  transactionTypeTitle: string
): number | false => {
  const transactionType = transactionTypes.find(
    type => type.title === transactionTypeTitle
  )

  if (!transactionType) return false

  return transactionType.code
}

export const getTransactionTypeTitle = (
  transactionTypeCode: number
): string | false => {
  const transactionType = transactionTypes.find(
    type => type.code === transactionTypeCode
  )

  if (!transactionType) return false

  return transactionType.title
}
