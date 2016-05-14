import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { LOAD_ALBUM, setAlbum } from 'routes/Album/modules/album'
import apiFetcher from 'helper/apiFetcher'

const fetchTracks = (albumId) => {
  const opts = {
    url: `albums/${albumId}/tracks`,
    params: {
      limit: 30
    }
  }
  return apiFetcher(opts)
}

export function * fetchAlbum (albumId) {
  const opts = {
    url: `albums/${albumId}`
  }
  try {
    const [album, tracks] = yield [
      call(apiFetcher, opts),
      call(fetchTracks, albumId)
    ]
    yield put(setAlbum(album, tracks))
  } catch (err) {
    if (err instanceof Error) {
      console.log('Error', err.message)
    } else {
      if (err.status === 400) {
        // TODO: redirect to 404
        console.log('Album not found')
      } else {
        console.log(err)
      }
    }
  }
}

export function * loadAlbumAndTracks (action) {
  try {
    const { albumIdFromRoute, prevAlbum } = action
    // right album is already set?
    if (albumIdFromRoute === prevAlbum.id) {
      // his tracks are loaded already?
      if (!prevAlbum.tracks) {
        const tracks = yield call(fetchTracks, albumIdFromRoute)
        yield put(setAlbum(null, tracks))
      }
    } else {
      yield call(fetchAlbum, albumIdFromRoute)
    }
  } catch (e) {
    console.log(e)
  }
}

export default function * watchLoadAlbum () {
  yield * takeEvery(LOAD_ALBUM, loadAlbumAndTracks)
}
