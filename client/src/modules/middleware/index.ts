import { combineEpics } from 'redux-observable'
import { fetchArticlesEpic, subscribeFeedEpic, fetchPublishersEpic, fetchFeedEpic } from './api'

export const rootEpic = combineEpics(
  fetchArticlesEpic,
  fetchPublishersEpic,
  fetchFeedEpic,
  subscribeFeedEpic,
)
