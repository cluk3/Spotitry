// ------------------------------------
// Constants
// ------------------------------------
export const SET_ALBUM = 'SET_ALBUM'
export const LOAD_ALBUM = 'LOAD_ALBUM'
export const SET_TRACKS = 'SET_TRACKS'

// ------------------------------------
// Actions
// ------------------------------------
export function setAlbum (albumRes, tracksRes) {
  const tracks = tracksRes.items
  if (!albumRes) {
    return {
      SET_TRACKS,
      payload: tracks
    }
  }
  const album = {
    artists: albumRes.artists,
    name: albumRes.name,
    genres: albumRes.genres,
    images: albumRes.images,
    popularity: albumRes.popularity,
    id: albumRes.id,
    tracks
  }
  return {
    type: SET_ALBUM,
    payload: album
  }
}

export function loadAlbum (albumIdFromRoute, prevAlbum) {
  return {
    type: LOAD_ALBUM,
    albumIdFromRoute,
    prevAlbum
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_ALBUM]: (state, action) => action.payload,
  [SET_TRACKS]: (state, action) => ({...state, tracks: action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function tracksReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
