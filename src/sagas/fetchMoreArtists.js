import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import {
  FETCH_MORE_ARTISTS,
  loadMoreArtists,
  FETCH_ARTISTS_FAIL
} from 'routes/Home/modules/artistsList'
import apiFetcher from 'helper/apiFetcher'

export function * fetchMoreArtists (action) {
  try {
    const opts = {
      url: action.nextUrl.substr(27)
    }
    const {artists} = yield call(apiFetcher, opts)
    yield put(loadMoreArtists(artists))
  } catch (e) {
    console.log(e)
    yield put({type: FETCH_ARTISTS_FAIL})
  }
}

export default function * watchFetchMoreArtists () {
  yield * takeEvery(FETCH_MORE_ARTISTS, fetchMoreArtists)
}
