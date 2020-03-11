import React from 'react'
import classes from './ArtistPreview.scss'
import placeholder from 'static/placeholder.png'
import PropTypes from 'prop-types'

export const ArtistPreview = ({artist, goToArtist}) => {
  const artistClickHandler = () => {
    goToArtist(artist.id)
  }
  return (
    <div className={classes.artist + ' col-xs-12 col-sm-6 col-md-4 text-center'}>
      <h3>{artist.name}</h3>
      <div className={classes.img + ' center-block'} onClick={artistClickHandler}>
        <img alt={artist.name} src={artist.imageUrl || placeholder} width='200' />
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
  artist: PropTypes.object.isRequired,
  goToArtist: PropTypes.func.isRequired
}

export default ArtistPreview
