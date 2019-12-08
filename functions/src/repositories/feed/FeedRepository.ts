import { firestore } from 'firebase-admin'
import RssParser from 'rss-parser'
import database from '../../db'
import { convertDocs, ConvertedDoc } from '../../services/feed/feedService'

export type SaveArgs = {
  url: string
}

export type TFeedRepository = {
  save(feed: RssParser.Output): Promise<void>
  getAll(): Promise<{ publishers: ConvertedDoc[], articles: ConvertedDoc[] }>
  getArticles(cursor?: string): Promise<ConvertedDoc[]>
  getPublishers(): Promise<ConvertedDoc[]>
  getArticlesByPublisherId(id: string, cursor?: string): Promise<ConvertedDoc[]>
}

const LIMIT = 15

/*
publisherとarticleの集約ルートとしてそれぞれのCRUD操作を受け持つ
*/
export class FeedRepository implements TFeedRepository {
  // TODO: database依存を解決する
  private readonly db = database

  save = async (feed: RssParser.Output) => {
    const publisherDoc = this.db.collection('publishers').doc()
    const articlesRef = this.db.collection('articles')
    const batch = this.db.batch()

    batch.set(publisherDoc, {
      url: feed.feedUrl,
      name: feed.title,
      createdAt: firestore.FieldValue.serverTimestamp(),
    })

    for (const article of feed.articles) {
      batch.set(articlesRef.doc(), {
        ...article,
        publisherName: feed.title,
        publisherId: publisherDoc.id,
        createdAt: firestore.FieldValue.serverTimestamp(),
        keep: false,
        read: false,
      })
    }

    await batch.commit()
  }
  
  getAll = async () => {
    const publisherRef = this.db.collection('publishers')
    const articlesRef = this.getArticlesRef()

    const [publisherSp, articleSp] = await Promise.all([
      publisherRef.get(),
      articlesRef.get(),
    ])

    return {
      publishers: convertDocs(publisherSp.docs),
      articles: convertDocs(articleSp.docs),
    }
  }

  getPublishers = async () => {
    const sp = await this.db.collection('publishers').get()
    return convertDocs(sp.docs)
  }

  getArticles = async () => {

    const sp = await this.getArticlesRef().get().catch((err) => {
      // debug
      console.log('fetch fail')
      return err
    })
    return convertDocs(sp.docs)
  }

  getArticlesByPublisherId = async (id: string): Promise<ConvertedDoc[]> => {
    const sp = await this.getArticlesRef().where('publisherId', '==', id).get()
    return convertDocs(sp.docs)
  }

  private getArticlesRef = () => {
    return this.db.collection('articles').orderBy('isoDate', 'desc').limit(LIMIT)
  }
}
