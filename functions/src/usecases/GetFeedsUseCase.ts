import { injectable, inject } from 'tsyringe'
import { TFeedRepository } from "../repositories/feed/FeedRepository";
import { UseCase } from '.'

@injectable()
export default class GetFeedsUseCase implements UseCase {
  constructor(@inject('IFeedRepository') private readonly repo: TFeedRepository) {}

  execute = () => {
    return this.repo.getAll()
  }
}
