import React from 'react'
import classes from './AlbumPreview.scss'
import placeholder from 'static/placeholder.png'

export const AlbumPreview = ({album, goToAlbum}) => {
  const images = album.images.filter(image => image.width >= 300)
  const imageUrl = images.length ? images[images.length - 1].url : placeholder
  const albumClickHandler = (ev) => {
    ev.preventDefault()
    goToAlbum(album.id)
  }
  return (
    <div className='col-xs-12 col-sm-6 col-md-4 center-block text-center'>
      <h2 className={classes.title}>{album.name}</h2>
      <img src={imageUrl} width='300' height='300'
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
