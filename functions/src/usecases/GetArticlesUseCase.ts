import { injectable, inject } from 'tsyringe'
import { TFeedRepository } from "../repositories/feed/FeedRepository"
import { UseCase } from '.'

@injectable()
export default class GetArticlesUseCase implements UseCase {
  constructor(@inject('TFeedRepository') private readonly repo: TFeedRepository) {}

  execute = () => {
    return this.repo.getArticles()
  }
}
