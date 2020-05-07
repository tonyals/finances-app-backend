export interface OperationType {
  DEBIT: string
  CREDIT: string
}

export interface OperationModel {
  id: number
  type: OperationType
  amount: number
  date: Date
  description: string
}
