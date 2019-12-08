import { injectable, inject } from 'tsyringe'
import { TFeedRepository } from "../repositories/feed/FeedRepository";
import { UseCase } from '.'
import { TRssRepository } from '../repositories/rss/RssRepository';

@injectable()
export default class AddFeedUseCase implements UseCase {
  constructor(
    @inject('TFeedRepository') private readonly repo: TFeedRepository,
    @inject('TRssRepository') private readonly rss: TRssRepository
  ) {}

  execute = async (url: string) => {
    const feed = await this.rss.parse(url)
    await this.repo.save(feed)
    return this.repo.getAll()
  }
}
