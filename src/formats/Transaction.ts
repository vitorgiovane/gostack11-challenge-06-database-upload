import Category from '../models/Category'

export type TransactionType = 'income' | 'outcome'

export interface TransactionRequest {
  title: string
  value: number
  type: TransactionType
  categoryTitle: string
}

export interface TransactionResponse {
  id: string
  title: string
  value: number
  type: TransactionType
  category: Category
  created_at: Date
  updated_at: Date
}
