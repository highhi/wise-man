import React, { useEffect } from 'react'
import ArticleListContainer from '../../../containers/ArticleList'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { fetchArticlesRequest } from '../../../modules/article'

const Feeds: React.FC = () => {
  const params = useParams<{ publisherId: string }>()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticlesRequest(params.publisherId))
  }, [])

  return <>
    <ArticleListContainer />
  </>
}

export default Feeds
