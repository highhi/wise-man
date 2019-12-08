import express from 'express'
import articles from './articles'
import feeds from './feeds'
import publishers from './publishers'

export default function router(app: express.Application) {
  app.use('/feeds', feeds)
  app.use('/publishers', publishers)
  app.use('/articles', articles)
}
