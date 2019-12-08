import { RequestHandler, Request, Response, NextFunction } from 'express'

type PromiseRequestHandler = {
  (req: Request, res: Response, next: NextFunction): Promise<any>
}

export function wrap(fn: PromiseRequestHandler): RequestHandler {
  return (req, res, next) => fn(req, res, next).catch(next)
}

