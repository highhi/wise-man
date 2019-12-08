
import { from } from 'rxjs'
import { mergeMap, map, filter } from 'rxjs/operators'
import { Epic } from 'redux-observable'
import { getType, isActionOf } from 'typesafe-actions'
import { getRequest, postRequest } from '../../utils/httpClient'
import normalizeArticles, { TArticle } from '../schema/article'
import normalizePublishers, { TPublisher } from '../schema/publisher'
import { fetchArticlesRequest, fetchArticlesSuccess, fetchMoreArticlesRequest, fetchMoreArticlesSuccess } from '../article'
import { fetchPublishersRequest, fetchPublishersSuccess } from '../publisher'
import { subscribeFeedRequest, fetchFeedsRequest } from '../feed'
import { RootAction } from '..'

type AppEpic = Epic<RootAction, RootAction>

export const fetchArticlesEpic: AppEpic = (action$) => action$.pipe(
  filter(isActionOf(fetchArticlesRequest)),
  mergeMap(() => {
    const promise = getRequest<TArticle[]>(`/articles`)

    return from(promise).pipe(map(res => ({
      type: getType(fetchArticlesSuccess),
      payload: normalizeArticles(res),
    })))
  })
)

export const fetchMoreArticlesEpic: AppEpic = (action$) => action$.pipe(
  filter(isActionOf(fetchMoreArticlesRequest)),
  mergeMap((action) => {
    const promise = getRequest<TArticle[]>(`/articles`, action.payload)

    return from(promise).pipe(map(res => ({
      type: getType(fetchMoreArticlesSuccess),
      payload: normalizeArticles(res),
    })))
  })
)

export const fetchPublishersEpic: AppEpic = (action$: any) => action$.pipe(
  filter(isActionOf(fetchPublishersRequest)),
  mergeMap(() =>
    from(getRequest<TPublisher[]>('/publishers'))
    .pipe(map(res => ({
      type: getType(fetchPublishersSuccess),
      payload: normalizePublishers(res)
    }))
  )
))

type TFeedResponse = {
  articles: TArticle[]
  publishers: TPublisher[]
}

export const fetchFeedEpic: AppEpic = (action$) => action$.pipe(
  filter(isActionOf(fetchFeedsRequest)),
  mergeMap(() =>
    from(getRequest<TFeedResponse>('/feeds'))
    .pipe(mergeMap((res) => ([
      {
        type: getType(fetchPublishersSuccess),
        payload: normalizePublishers(res.publishers),
      },
      {
        type: getType(fetchArticlesSuccess),
        payload: normalizeArticles(res.articles),
      }
    ])
  )))
)

export const subscribeFeedEpic: AppEpic = (action$) => action$.pipe(
  filter(isActionOf(subscribeFeedRequest)),
  mergeMap((action) =>
    from(postRequest<TFeedResponse>('/feeds/create', {
      url: action.payload.url
    }))
    .pipe(mergeMap((res) => ([
      {
        type: getType(fetchPublishersSuccess),
        payload: normalizePublishers(res.publishers),
      },
      {
        type: getType(fetchArticlesSuccess),
        payload: normalizeArticles(res.articles),
      }
    ])))
  )
)
