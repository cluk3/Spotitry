import React from 'react'
import classes from './ArtistPreview.scss'
import placeholder from 'static/placeholder.png'

export const ArtistPreview = ({artist, goToArtist}) => {
  const images = artist.images.filter(image => image.width >= 200 && image.height >= 200)
  const image = images[images.length - 1]
  const artistClickHandler = (ev) => {
    ev.preventDefault()
    goToArtist(artist.id)
  }
  return (
    <div className={classes.artist + ' col-xs-12 col-sm-6 col-md-4 text-center'}>
      <h3>{artist.name}</h3>
      <div className={classes.img + ' center-block'} onClick={artistClickHandler}>
        {image
          ? <img alt={artist.name} src={image.url} width='200' />
        : <img alt={artist.name} src={placeholder} width='200' />
        }
        <div className={classes.details + ' text-center'}>
          <ul>
            <li>Followers: {artist.followers}</li>
            <li>Popularity: {artist.popularity}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

ArtistPreview.propTypes = {
  artist: React.PropTypes.object.isRequired,
  goToArtist: React.PropTypes.func.isRequired
}

export default ArtistPreview
