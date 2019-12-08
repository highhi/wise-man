import express from 'express'
import container from '../diContainer'
import GetFeedsUseCase from '../usecases/GetFeedsUseCase'
import AddFeedUseCase from '../usecases/AddFeedUseCase'
import { wrap } from '../utils/wrap'

const router = express.Router()

router.get('/', wrap(async (_, res) => {
  const useCase = container.resolve(GetFeedsUseCase)
  const feed = await useCase.execute()
  res.json(feed)
}))

router.post('/create', wrap(async (req, res) => {
  const { url } = req.body
  const useCase = container.resolve(AddFeedUseCase)  
  const data = await useCase.execute(url)
  res.json(data)
}))

export default router