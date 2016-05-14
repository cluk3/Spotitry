// ------------------------------------
// Constants
// ------------------------------------
export const SET_ARTIST = 'SET_ARTIST'
export const LOAD_ARTIST = 'LOAD_ARTIST'
export const SET_ALBUMS = 'SET_ALBUMS'

// ------------------------------------
// Actions
// ------------------------------------
export function setArtist (artistRes, albumsRes) {
  function uniq (a) {
    var seen = {}
    return a.filter((item) => {
      return seen.hasOwnProperty(item.name) ? false : (seen[item.name] = true)
    })
  }

  const albums = uniq(albumsRes.items)
  if (!artistRes) {
    return {
      SET_ALBUMS,
      payload: albums
    }
  }
  const artist = {
    name: artistRes.name,
    followers: artistRes.followers.total,
    genres: artistRes.genres,
    images: artistRes.images,
    popularity: artistRes.popularity,
    id: artistRes.id,
    albums
  }
  return {
    type: SET_ARTIST,
    payload: artist
  }
}

export function loadArtist (artistIdFromRoute, prevArtist) {
  return {
    type: LOAD_ARTIST,
    artistIdFromRoute,
    prevArtist
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_ARTIST]: (state, action) => action.payload,
  [SET_ALBUMS]: (state, action) => Object.assign({}, state, { albums: action.payload.albums })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function artistsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
