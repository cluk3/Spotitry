import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { LOAD_ARTIST, setArtist } from 'routes/Artist/modules/artist'
import apiFetcher from 'helper/apiFetcher'

const fetchAlbums = (artistId) => {
  const opts = {
    url: `artists/${artistId}/albums`,
    params: {
      'album_type': 'single,album,compilation',
      market: 'IT'
    }
  }
  return apiFetcher(opts)
}

export function * fetchArtist (artistId) {
  const opts = {
    url: `artists/${artistId}`
  }
  try {
    const [artist, albums] = yield [
      call(apiFetcher, opts),
      call(fetchAlbums, artistId)
    ]
    yield put(setArtist(artist, albums))
  } catch (err) {
    if (err instanceof Error) {
      console.log('Error', err.message)
    } else {
      if (err.status === 400) {
        // redirect to 404
        console.log('Artist not found')
      } else {
        console.log(err)
      }
    }
  }
}

export function * loadArtistAndAlbums (action) {
  try {
    const { artistIdFromRoute, prevArtist } = action
    // right artist is already set?
    if (artistIdFromRoute === prevArtist.id) {
      // his albums are loaded already?
      if (!prevArtist.albums) {
        const albums = yield call(fetchAlbums, artistIdFromRoute)
        yield put(setArtist(null, albums))
      }
    } else {
      yield call(fetchArtist, artistIdFromRoute)
    }
  } catch (e) {
    console.log(e)
  }
}

export default function * watchLoadArtist () {
  yield * takeEvery(LOAD_ARTIST, loadArtistAndAlbums)
}
