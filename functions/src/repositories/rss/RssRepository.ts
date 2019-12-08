import RssParser from 'rss-parser'
import { injectable, inject } from 'tsyringe'

export type TRssRepository = {
  parse(url: string): Promise<RssParser.Output>
}

export type TRssParser = {
  parseURL(url: string): Promise<RssParser.Output>
}

@injectable()
export class RssRepository implements TRssRepository {
  constructor(@inject('TRssParser') private readonly parser: TRssParser) {}

  parse = async (url: string) => {
    return this.parser.parseURL(url)
  }
}
