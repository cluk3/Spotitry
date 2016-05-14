import axios from 'axios'

export default function apiFetcher (options) {
  const opts = Object.assign({
    method: 'get',
    baseURL: 'https://api.spotify.com/v1/'
  }, options)
  return axios(opts)
  .then((res) => res.data)
}
