import React from 'react'
import { TNormalizedArticle } from '../../modules/schema/article'
import Article from '../Article/Article'

type Props = {
  ids: TNormalizedArticle['result']
  articles: TNormalizedArticle['entities']['articles']
}

const ArticleList: React.FC<Props> = ({ ids, articles }) => {
  return <div>
    {ids.map((id) => {
      const entity = articles[id]
      return <Article
        key={id}
        id={id}
        publisherName={entity.publisherName}
        pubDate={entity.pubDate}
        link={entity.link}
        title={entity.title}
      />
    })}
  </div>
}

export default ArticleList
