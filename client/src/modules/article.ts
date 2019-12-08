import { ActionType, createReducer, createAction } from 'typesafe-actions'
import { TNormalizedArticle } from './schema/article'

export const fetchArticlesRequest = createAction(
  'fetch/articles/request',
  (payload?: string) => payload,
)()

export const fetchArticlesSuccess = createAction(
  'fetch/articles/success',
  (payload: TNormalizedArticle) => payload,
)()

export const fetchMoreArticlesRequest = createAction(
  'fetch/more/articles/request',
  (payload: { feedId?: string } = {}) => payload,
)()

export const fetchMoreArticlesSuccess = createAction(
  'fetch/more/articles/success',
  (payload: TNormalizedArticle) => payload,
)()

// Actions型を定義するために必要
const actions = {
  fetchArticlesRequest,
  fetchArticlesSuccess,
  fetchMoreArticlesRequest,
  fetchMoreArticlesSuccess,
}

export type TArticleActions = ActionType<typeof actions>

export type TInitialState = TNormalizedArticle & {
  cursor?: string
}

const initialState: TInitialState = {
  entities: { articles: {} },
  result: [],
  cursor: undefined
}

function getCursor<T>(values: T[]) {
  return values.slice(-1)[0]
}

export default createReducer<TInitialState, TArticleActions>(initialState)
  .handleAction(fetchArticlesSuccess, (_, action) => {
    const { result, entities } = action.payload
    return {
      entities,
      result,
      cursor: getCursor(result),
    }
  })
  .handleAction(fetchMoreArticlesSuccess, (state, action) => {
    const { result, entities } = action.payload
    const articles = { ...state.entities.articles, ...entities.articles }
    return { 
      entities: { articles },
      result: state.result.concat(result),
      cursor: getCursor(result),
    }
  })
