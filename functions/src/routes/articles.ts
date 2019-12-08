import express from 'express'
import container from '../diContainer'
import GetArticlesUseCase from '../usecases/GetArticlesUseCase'
import GetArticlesByPublisherIdUseCase from '../usecases/GetArticlesByPublisherIdUserCase'
import { wrap } from '../utils/wrap'

const router = express.Router()

router.get('/', wrap(async (_, res) => {
  const useCase = container.resolve(GetArticlesUseCase)
  const articles = await useCase.execute()
  res.json(articles)
}))

router.get('/:feedId', wrap(async (req, res) => {
  const useCase = container.resolve(GetArticlesByPublisherIdUseCase)
  const articles = await useCase.execute(req.params.feedId, req.params.cursor)
  res.json(articles)
}))

export default router