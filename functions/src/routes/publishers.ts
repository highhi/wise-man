import express from 'express'
import GetArticlesByPublisherIdUseCase from '../usecases/GetArticlesByPublisherIdUserCase'
import container from '../diContainer'
import { wrap } from '../utils/wrap'
import GetPublishersUseCase from '../usecases/GetPublishersUseCase'

const router = express.Router()

router.get('/', wrap(async (_, res) => {
  const useCase = container.resolve(GetPublishersUseCase)
  const feed = await useCase.execute()
  res.json(feed)
}))

router.get('/:id/articles', wrap(async (req, res) => {
  const useCase = container.resolve(GetArticlesByPublisherIdUseCase)
  const feed = await useCase.execute(req.params.id, req.query.cursor)
  res.json(feed)
}))

export default router
