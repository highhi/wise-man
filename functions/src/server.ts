// 開発用サーバー

import app from './app'
import { HttpError } from 'http-errors'

const port = '3001'

function onError(error: HttpError) {
  if (error.syscall !== 'listen') throw error
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break;
    default:
      throw error
  }
}

function serve() {
  if (process.env.NODE_ENV !== 'development') return

  const http = require('http')
  const server = http.createServer(app)
  server.listen(port, 'localhost')
  server.on('error', onError)
  server.on('listening', () => {
    const addr = server.address()
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${port}`
    console.log(`Listening on ${bind}`)
  })
}

serve()
