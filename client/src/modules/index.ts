import { combineReducers } from 'redux'
import article from './article'
import publisher, { TPublisherActions } from './publisher'
import user from './user'
import { StateType } from 'typesafe-actions'
import { TArticleActions } from './article'
import { TFeedActions } from './feed'

export const rootReducer = combineReducers({ article, publisher, user })

export type RootAction = 
  | TArticleActions
  | TFeedActions
  | TPublisherActions

export type RootState = StateType<typeof rootReducer>
