import { normalize, schema } from 'normalizr';

export type TArticle = {
  id: string
  createdAt: string
  pubDate: string
  link: string
  content: string
  title: string
  publisherName: string
  publisherId: string
}

type TNormalize = {
  articles: {
    [id: string]: TArticle
  }
}

const articleSchema = new schema.Entity('articles')
const normalizer = (data: TArticle[]) => {
  return normalize<typeof data, TNormalize, Array<TArticle['id']>>(data, [articleSchema])
}

export type TNormalizedArticle = ReturnType<typeof normalizer>
export default normalizer
