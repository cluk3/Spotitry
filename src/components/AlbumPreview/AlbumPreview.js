import React from 'react'
import classes from './AlbumPreview.scss'
import placeholder from 'static/placeholder.png'

export const AlbumPreview = ({album, goToAlbum}) => {
  const albumClickHandler = () => {
    goToAlbum(album.id)
  }
  return (
    <div className='col-xs-12 col-sm-6 col-md-4 center-block text-center'>
      <h2 className={classes.title}>{album.name}</h2>
      <img src={album.imageUrl || placeholder} width='300' height='300'
        className={classes.img + ' img-rounded'}
        onClick={albumClickHandler}
      />
    </div>
    )
}

AlbumPreview.propTypes = {
  album: React.PropTypes.object.isRequired,
  goToAlbum: React.PropTypes.func.isRequired
}

export default AlbumPreview
