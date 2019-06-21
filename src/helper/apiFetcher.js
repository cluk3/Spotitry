import axios from 'axios'
const getOptions = (opts) => Object.assign(
  {
    method: 'get',
    baseURL: 'https://api.spotify.com/v1/',
    headers: {
      Authorization:
        `Bearer ${window.localStorage.getItem('spotify_token')}`
    }
  },
  opts
)

export const getSpotifyToken = () => fetch(`${__API_ENDPOINT__}/spotifyToken`, {
  headers: {
    'Accept': 'application/json'
  }
}).then(res => res.json())
.then(res => {
  window.localStorage.setItem('spotify_token', res.access_token)
})

export default function apiFetcher (options) {
  return axios(getOptions(options)).then(res => res.data).catch(err => {
    if (err.status === 401) {
      return getSpotifyToken().then(() => axios(getOptions(options)))
      .then(res => res.data)
    }
    return err
  })
}
