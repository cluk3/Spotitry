import React from 'react'
import classes from './AlbumPreview.scss'
import AlbumImg from './AlbumImg'
import PropTypes from 'prop-types'

export const AlbumPreview = ({ album, goToAlbum }) => {
  const albumClickHandler = () => {
    goToAlbum(album.id)
  }
  return (
    <div className='col-xs-12 col-sm-6 col-md-4 center-block text-center'>
      <h2 className={classes.title}>{album.name}</h2>
      <AlbumImg imageUrl={album.imageUrl}
        albumClickHandler={albumClickHandler}
      />
    </div>
  )
}

AlbumPreview.propTypes = {
  album: PropTypes.object.isRequired,
  goToAlbum: PropTypes.func.isRequired
}

export default AlbumPreview
