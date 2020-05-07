export enum OperationType {
  DEBIT,
  CREDIT
}

export interface OperationModel {
  id: number
  type: OperationType
  amount: number
  date: Date
  description: string
}
