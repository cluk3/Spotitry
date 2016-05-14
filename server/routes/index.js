import r from 'koa-route'
import rewardsService from '../methods/rewardsService'

export default function router (app) {
  app.use(r.get('/api/rewards', rewardsService))
}
