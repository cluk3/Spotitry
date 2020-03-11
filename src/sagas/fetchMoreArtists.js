import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import {
  FETCH_MORE_ARTISTS_REQUESTED,
  FETCH_ARTISTS_FAILED,
  fetchMoreArtistsSucceeded
} from 'routes/Home/modules/artistsList'
import apiFetcher from 'helper/apiFetcher'

export function * fetchMoreArtists (action) {
  try {
    const opts = {
      url: action.nextUrl.substr(27)
    }
    const {artists} = yield call(apiFetcher, opts)
    yield put(fetchMoreArtistsSucceeded(artists))
  } catch (e) {
    console.log(e)
    yield put({type: FETCH_ARTISTS_FAILED})
  }
}

export default function * watchFetchMoreArtists () {
  yield * takeEvery(FETCH_MORE_ARTISTS_REQUESTED, fetchMoreArtists)
}
