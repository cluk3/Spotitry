import React from 'react'
import classes from './ArtistsList.scss'
import ArtistPreview from 'components/ArtistPreview'
import Loading from 'components/Loading'
import PropTypes from 'prop-types'

export const ArtistsList = ({ artists, goToArtist, showMoreHandler, next, isFetchingMore }) => (
  <div className={classes.list + ' text-center'} >
    {artists.length
      ? (
        <div className={classes.preview + ' row'} >
          {artists.map((artist, i) => (
            <ArtistPreview
              goToArtist={goToArtist}
              artist={artist}
              key={'artist' + i}
            />)
          )}
          {next && <button className={classes.show} onClick={() => showMoreHandler(next)}>Show more</button>}
          {isFetchingMore && <Loading fullScreen />}
        </div>
      ) : <h2>No results...</h2>
    }
  </div>
)

ArtistsList.propTypes = {
  artists: PropTypes.array.isRequired,
  goToArtist: PropTypes.func.isRequired,
  showMoreHandler: PropTypes.func.isRequired,
  next: PropTypes.string,
  isFetchingMore: PropTypes.bool
}

export default ArtistsList
