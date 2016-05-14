import 'babel-polyfill'
import { expect } from 'chai'
import request from 'supertest'
import app from '../../bin/server'
describe('Rewards Service', () => {
  it('should return 200 status from GET /api/rewards', (done) => {
    request(app)
    .get('/api/rewards')
    .expect('Content-Type','application/json; charset=utf-8')
    .expect(200, done)
  })
  it('should return rewards based on the querystring', (done) => {
    request(app)
    .get('/api/rewards')
    .query({accountNumber: '123456'})
    .query({channels: ['SPORTS', 'NEWS']})
    .end((err, res) => {
      if (err) {
        done(err)
      }
      const { data } = res.body
      expect(data.rewards).to.be.ok
      expect(data.rewards).to.be.an('object')
      expect(data.rewards).to.deep.equal({
        sports: 'CHAMPIONS_LEAGUE_FINAL_TICKET',
        news: 'N/A'
      })
      done()
    })
  })
  after(() => {
    app.close()
  })
})
