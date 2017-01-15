import { createSelector } from 'reselect'

const getAlbumImage = (state) => state.artist.albums.images
