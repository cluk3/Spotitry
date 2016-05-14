import artistsList from './artistsList'
import artist from './artist'
import fetchMoreArtists from './fetchMoreArtists'
import album from './album'

export default function * rootSaga () {
  yield [
    artistsList(),
    artist(),
    fetchMoreArtists(),
    album()
  ]
}
