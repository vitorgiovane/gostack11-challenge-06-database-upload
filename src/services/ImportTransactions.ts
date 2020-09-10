import fs from 'fs'
import { parse } from 'fast-csv'

import CreateTransactionService from './CreateTransaction'
import { TransactionRequest, TransactionResponse } from '../formats/Transaction'

class ImportTransactions {
  transactions: Array<TransactionRequest>

  importedTransactions: Array<TransactionResponse>

  notImported: Array<Error>

  constructor() {
    this.transactions = []
  }

  public async run(filePath: string): Promise<TransactionResponse[]> {
    this.transactions = await this.getFileTransactions(filePath)
    const createdTransactions = await this.createTransactions()
    return createdTransactions
  }

  getFileTransactions(filePath: string): Promise<TransactionRequest[]> {
    const transactions = [] as TransactionRequest[]
    return new Promise((resolve, _) => {
      fs.createReadStream(filePath)
        .pipe(
          parse({
            headers: headers => headers.map(header => header?.trim())
          }).transform((transactionData: any) => ({
            title: transactionData.title.trim(),
            type: transactionData.type.trim(),
            value: parseInt(transactionData.value.trim(), 10),
            categoryTitle: transactionData.category.trim()
          }))
        )
        .on('error', error => this.notImported.push(error))
        .on('data', row => transactions.push(row))
        .on('end', () => resolve(transactions))
    })
  }

  async createTransactions(): Promise<TransactionResponse[]> {
    const createdTransactions = []
    for (const transaction of this.transactions) {
      const createdTransaction = await this.createTransaction(transaction)
      createdTransactions.push(createdTransaction)
    }
    // const creatingTransactions = this.transactions.map(async transaction => {
    //   const createdTransaction = await this.createTransaction(transaction)
    //   return createdTransaction
    // })

    // const createdTransactions = await Promise.all(creatingTransactions)
    return createdTransactions
  }

  async createTransaction(
    transaction: TransactionRequest
  ): Promise<TransactionResponse> {
    const createTransactionService = new CreateTransactionService()
    const importedTransaction = await createTransactionService.run(transaction)
    return importedTransaction
  }
}

export default ImportTransactions
