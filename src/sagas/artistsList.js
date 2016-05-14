import { delay } from 'redux-saga'
import { take, call, put, cancel, fork } from 'redux-saga/effects'
import {
  FETCH_ARTISTS,
  FETCH_ARTISTS_START,
  loadArtists,
  FETCH_ARTISTS_FAIL
} from 'routes/Home/modules/artistsList'
import apiFetcher from 'helper/apiFetcher'

export function * fetchArtists (action) {
  try {
    yield delay(400)
    yield put({type: FETCH_ARTISTS_START})
    const opts = {
      url: 'search',
      params: {
        type: 'artist',
        limit: 12,
        q: action.query
      }
    }
    const {artists} = yield call(apiFetcher, opts)
    yield put(loadArtists(artists))
  } catch (e) {
    console.log(e)
    yield put({type: FETCH_ARTISTS_FAIL})
  }
}

export default function * watchFetchArtists () {
  let task
  while (true) {
    const action = yield take(FETCH_ARTISTS)
    if (task) {
      yield cancel(task)
      yield put({type: FETCH_ARTISTS_FAIL})
    }
    if (action.query !== '') {
      task = yield fork(fetchArtists, action)
    }
  }
}
