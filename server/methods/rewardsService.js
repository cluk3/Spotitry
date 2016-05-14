export default (ctx, next) => {
  ctx.status = 200
  ctx.type = 'application/json'
  const {accountNumber, channels} = ctx.query
  console.log(accountNumber, channels)
  ctx.body = {
    data: {
      rewards: {
        sports: 'CHAMPIONS_LEAGUE_FINAL_TICKET',
        news: 'N/A'
      }
    }
  }
}
