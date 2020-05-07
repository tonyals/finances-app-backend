export enum OperationType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT'
}

export interface OperationCreditModel {
  id: number
  type: OperationType.CREDIT
  amount: number
  date: Date
  description: string
}

export interface OperationDebitModel {
  id: number
  type: OperationType.DEBIT
  amount: number
  date: Date
  description: string
}
