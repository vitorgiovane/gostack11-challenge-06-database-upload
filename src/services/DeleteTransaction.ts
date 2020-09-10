import { getRepository } from 'typeorm'
import { isUuid } from 'uuidv4'

import AppError from '../errors/AppError'
import Transaction from '../models/Transaction'

class DeleteTransaction {
  public async run(transactionId: string): Promise<void> {
    if (!isUuid(transactionId)) throw new AppError('Invalid transaction ID')

    const transactionRepository = getRepository(Transaction)
    const transaction = await transactionRepository.findOne({
      where: { id: transactionId }
    })

    if (!transaction) throw new AppError('Invalid transaction ID')

    await transactionRepository.remove([transaction])
  }
}

export default DeleteTransaction
