import { GetAllModel } from '../../../../domain/models/reports-models/get-all-model'

export interface GetAllOperationRepository {
  getAllOperationRepository(): Promise<GetAllModel>
}
