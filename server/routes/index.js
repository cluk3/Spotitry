import Router from 'koa-router'
import spotifyToken from './spotifyToken'

export default function setupRouter (app) {
  const router = new Router()

  router.get('/spotifyToken', spotifyToken)

  app.use(router.routes())
  app.use(router.allowedMethods())
}
