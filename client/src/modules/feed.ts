import { createAction, ActionType } from 'typesafe-actions'

export const fetchFeedsRequest = createAction(
  'fetch/feeds/request',
)()

export const subscribeFeedRequest = createAction(
  'subscribe/feed/request',
  (payload: { url: string }) => payload
)()

const actions = { fetchFeedsRequest, subscribeFeedRequest }

export type TFeedActions = ActionType<typeof actions>
