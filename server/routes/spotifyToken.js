import fetch from 'node-fetch'
import qs from 'qs'

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env
const getEncodedClient = () => {
  return Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')
}

const spotifyToken = async (ctx, next) => {
  try {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: qs.stringify({grant_type: 'client_credentials'}),
      headers: {
        'Authorization': `Basic ${getEncodedClient()}`,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
    const token = await res.json()
    ctx.body = token
  } catch (error) {
    ctx.body = {
      error: 'Spotify token retrieval failed. Check server logs for more info'
    }
    console.log(error)
  }
}

export default spotifyToken
