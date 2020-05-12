import { GetAllModel } from '../../models/reports-models/get-all-model'

export interface GetAllOperation {
  getAllOperation(): Promise<GetAllModel>
}
