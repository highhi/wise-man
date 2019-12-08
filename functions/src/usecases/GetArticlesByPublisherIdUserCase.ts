import { injectable, inject } from 'tsyringe'
import { TFeedRepository } from "../repositories/feed/FeedRepository";
import { UseCase } from '.'

@injectable()
export default class GetArticlesByPublisherIdUseCase implements UseCase {
  constructor(@inject('TFeedRepository') private readonly repo: TFeedRepository) {}

  execute = (id: string, cursor?: string) => {
    return this.repo.getArticlesByPublisherId(id, cursor)
  }
}
