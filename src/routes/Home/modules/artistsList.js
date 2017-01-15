import { artistsFromRes } from 'helper'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_ARTISTS = 'FETCH_ARTISTS'
export const FETCH_MORE_ARTISTS = 'FETCH_MORE_ARTISTS'
export const FETCH_ARTISTS_START = 'FETCH_ARTISTS_START'
export const FETCH_MORE_ARTISTS_SUCCESS = 'FETCH_MORE_ARTISTS_SUCCESS'
export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS'
export const FETCH_ARTISTS_FAIL = 'FETCH_ARTISTS_FAIL'

// ------------------------------------
// Actions
// ------------------------------------
export function loadArtists (artistsResponse) {
  const { next, total } = artistsResponse
  const artists = artistsFromRes(artistsResponse)
  return {
    type: FETCH_ARTISTS_SUCCESS,
    payload: {
      artists,
      total,
      next
    }
  }
}

export function loadMoreArtists (artistsResponse) {
  const { next } = artistsResponse
  const artists = artistsFromRes(artistsResponse)
  return {
    type: FETCH_MORE_ARTISTS_SUCCESS,
    payload: {
      artists,
      next
    }
  }
}

export function searchArtists (query) {
  return {
    type: FETCH_ARTISTS,
    query
  }
}

export function showMoreArtists (nextUrl) {
  return {
    type: FETCH_MORE_ARTISTS,
    nextUrl
  }
}

export const actions = {
  loadArtists
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_ARTISTS_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    isFetching: false,
    pristine: false
  }),
  [FETCH_MORE_ARTISTS_SUCCESS]: (state, action) => ({
    ...state,
    artists: state.artists.concat(action.payload.artists),
    next: action.payload.next,
    isFetchingMore: false
  }),
  [FETCH_MORE_ARTISTS]: (state, action) => ({...state, isFetchingMore: true}),
  [FETCH_ARTISTS_FAIL]: (state, action) => ({...state, isFetching: false, isFetchingMore: false}),
  [FETCH_ARTISTS_START]: (state, action) => ({...state, isFetching: true})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  isFetchingMore: false,
  artists: [],
  pristine: true
}
export default function artistsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
