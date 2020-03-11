import { delay } from 'redux-saga'
import { take, call, put, cancel, fork } from 'redux-saga/effects'
import {
  SEARCH_ARTISTS,
  FETCH_ARTISTS_REQUESTED,
  FETCH_ARTISTS_ABORTED,
  FETCH_ARTISTS_FAILED,
  fetchArtistsSucceeded
} from 'routes/Home/modules/artistsList'
import apiFetcher from 'helper/apiFetcher'

export function * fetchArtists (action) {
  try {
    yield delay(400)
    yield put({type: FETCH_ARTISTS_REQUESTED})
    const opts = {
      url: 'search',
      params: {
        type: 'artist',
        limit: 12,
        q: action.query
      }
    }
    const {artists} = yield call(apiFetcher, opts)
    yield put(fetchArtistsSucceeded(artists))
  } catch (error) {
    console.error(error)
    yield put({type: FETCH_ARTISTS_FAILED, payload: {
      error
    }})
  }
}

export default function * watchFetchArtists () {
  let task
  while (true) {
    const action = yield take(SEARCH_ARTISTS)
    if (task) {
      yield cancel(task)
      yield put({type: FETCH_ARTISTS_ABORTED})
    }
    if (action.query !== '') {
      task = yield fork(fetchArtists, action)
    }
  }
}

// TODO: abort when changing route
