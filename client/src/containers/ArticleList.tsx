import React from 'react'
import { useSelector } from 'react-redux'
import { TNormalizedArticle } from '../modules/schema/article'
import ArticleList from '../components/ArticleList/ArticleList'


const ArticleListContainer: React.FC = () => {
  const article = useSelector<{ article: TNormalizedArticle }, TNormalizedArticle>(state =>{
    return state.article
  })

  return <ArticleList ids={article.result} articles={article.entities.articles} />
}

export default ArticleListContainer
