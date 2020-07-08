import { EntityRepository, Repository } from 'typeorm'

import Transaction from '../models/Transaction'

interface Balance {
  income: number
  outcome: number
  total: number
}

@EntityRepository(Transaction)
class Transactions extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find()

    const income = transactions.reduce((accumulator, current) => {
      return current.type === 'income'
        ? accumulator + current.value
        : accumulator
    }, 0)

    const outcome = transactions.reduce((accumulator, current) => {
      return current.type === 'outcome'
        ? accumulator + current.value
        : accumulator
    }, 0)

    const total = income - outcome

    return {
      income,
      outcome,
      total
    }
  }
}

export default Transactions
