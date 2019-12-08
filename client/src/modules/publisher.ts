import { ActionType, createReducer, createAction } from 'typesafe-actions'
import { TNormalizedPublisher } from './schema/publisher'

export const fetchPublishersRequest = createAction(
  'fetch/publishers/request'
)()

export const fetchPublishersSuccess = createAction(
  'fetch/publishers/success',
  (payload: TNormalizedPublisher) => payload
)()

const actions = { fetchPublishersRequest, fetchPublishersSuccess }

export type TPublisherActions = ActionType<typeof actions>

export type TInitialState = TNormalizedPublisher & {
  cursor?: string
}

const initialState: TInitialState = {
  entities: { publishers: {} },
  result: [],
}

export default createReducer<TInitialState, TPublisherActions>(initialState)
  .handleAction(fetchPublishersSuccess, (state, action) => {
    const { result, entities } = action.payload
    return { 
      ...state,
      entities,
      result,
    }
  })
