import React from 'react'
import classes from './ArtistsList.scss'
import ArtistPreview from 'components/ArtistPreview'
import Loading from 'components/Loading'

export const ArtistsList = ({artists, goToArtist, pristine, showMoreHandler, next, isFetchingMore}) => (
  <div className='text-center' style={{maxHeight: '70vh', overflowY: 'auto'}}>
    {artists.length
      ? (
      <div className='row' style={{maxWidth: '95%'}}>
        {artists.map((artist, i) => (
          <ArtistPreview
            goToArtist={goToArtist}
            artist={artist}
            key={'artist' + i}
          />)
        )}
        {next ? <button className={classes.show} onClick={() => showMoreHandler(next)}>Show more</button> : ''}
        {isFetchingMore ? <Loading fullScreen /> : ''}
      </div>
      ) : <h2>No results...</h2>
    }
  </div>
)

ArtistsList.propTypes = {
  artists: React.PropTypes.array.isRequired,
  goToArtist: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  showMoreHandler: React.PropTypes.func.isRequired,
  next: React.PropTypes.string,
  isFetchingMore: React.PropTypes.bool
}

export default ArtistsList
