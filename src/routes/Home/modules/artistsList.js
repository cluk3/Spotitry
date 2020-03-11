import { artistsFromRes } from 'helper'

// ------------------------------------
// Constants
// ------------------------------------
export const SEARCH_ARTISTS = 'SEARCH_ARTISTS'
export const FETCH_MORE_ARTISTS_REQUESTED = 'FETCH_MORE_ARTISTS_REQUESTED'
export const FETCH_MORE_ARTISTS_SUCCEEDED = 'FETCH_MORE_ARTISTS_SUCCEEDED'
export const FETCH_ARTISTS_REQUESTED = 'FETCH_ARTISTS_REQUESTED'
export const FETCH_ARTISTS_SUCCEEDED = 'FETCH_ARTISTS_SUCCEEDED'
export const FETCH_ARTISTS_FAILED = 'FETCH_ARTISTS_FAILED'
export const FETCH_ARTISTS_ABORTED = 'FETCH_ARTISTS_ABORTED'

// ------------------------------------
// Actions
// ------------------------------------
export function fetchArtistsSucceeded (artistsResponse) {
  const { next, total } = artistsResponse
  const artists = artistsFromRes(artistsResponse)
  return {
    type: FETCH_ARTISTS_SUCCEEDED,
    payload: {
      artists,
      total,
      next
    }
  }
}

export function fetchMoreArtistsSucceeded (artistsResponse) {
  const { next } = artistsResponse
  const artists = artistsFromRes(artistsResponse)
  return {
    type: FETCH_MORE_ARTISTS_SUCCEEDED,
    payload: {
      artists,
      next
    }
  }
}

export function searchArtists (query) {
  return {
    type: SEARCH_ARTISTS,
    query
  }
}

export function fetchMoreArtists (nextUrl) {
  return {
    type: FETCH_MORE_ARTISTS_REQUESTED,
    nextUrl
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_ARTISTS_SUCCEEDED]: (state, action) => ({
    ...state,
    ...action.payload,
    isFetching: false
  }),
  [FETCH_MORE_ARTISTS_SUCCEEDED]: (state, action) => ({
    ...state,
    artists: state.artists.concat(action.payload.artists),
    next: action.payload.next,
    isFetchingMore: false
  }),
  [FETCH_MORE_ARTISTS_REQUESTED]: (state) => ({...state, isFetchingMore: true}),
  [FETCH_ARTISTS_FAILED]: (state, action) => ({
    ...state,
    isFetching: false,
    isFetchingMore: false,
    error: action.payload.error
  }),
  [FETCH_ARTISTS_ABORTED]: (state) => ({
    ...state,
    isFetching: false,
    isFetchingMore: false
  }),
  [FETCH_ARTISTS_REQUESTED]: (state) => ({...state, isFetching: true})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  isFetchingMore: false,
  artists: []
}
export default function artistsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
