import React from 'react'
import classes from './HomeView.scss'
import SearchArtistBar from 'components/SearchArtistBar'
import ArtistsList from 'components/ArtistsList'
import { connect } from 'react-redux'
import {searchArtists, fetchMoreArtists} from '../modules/artistsList'
import { push } from 'react-router-redux'
import Loading from 'components/Loading'

export const HomeView = ({
  artists,
  searchArtistsHandler,
  navigateToArtist,
  isFetching,
  showMoreArtists,
  total,
  next,
  isFetchingMore
}) => (
  <div>
    <SearchArtistBar searchArtistsHandler={searchArtistsHandler} />
    {!isFetching
      ? (
      <div className='center-block text-center'>
        <ArtistsList
          artists={artists}
          goToArtist={navigateToArtist}
          showMoreHandler={showMoreArtists}
          next={next}
          isFetchingMore={isFetchingMore}
        />
      {artists.length && (<span className={classes.total}>Total found: {total}</span>)}
      </div>
    ) : <Loading fullScreen />
    }
  </div>
)

HomeView.propTypes = {
  artists: React.PropTypes.array.isRequired,
  searchArtistsHandler: React.PropTypes.func.isRequired,
  navigateToArtist: React.PropTypes.func.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  isFetchingMore: React.PropTypes.bool.isRequired,
  showMoreArtists: React.PropTypes.func.isRequired,
  next: React.PropTypes.string,
  total: React.PropTypes.number
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchArtistsHandler: (query) => dispatch(searchArtists(query)),
    navigateToArtist: (artistId) => dispatch(push(`/artist/${artistId}`)),
    showMoreArtists: (nextUrl) => dispatch(fetchMoreArtists(nextUrl))
  }
}

const mapStateToProps = state => state.artistsList

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
