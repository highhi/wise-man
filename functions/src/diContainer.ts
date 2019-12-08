import { container } from 'tsyringe'
import RssParser from 'rss-parser'
import { FeedRepository } from "./repositories/feed/FeedRepository"
import { RssRepository } from './repositories/rss/RssRepository'

container.register('IFeedRepository', { useClass: FeedRepository })
container.register('TRssRepository', { useClass: RssRepository })
container.register('TRssParser', { useClass: RssParser })

export default container
