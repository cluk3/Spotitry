import React from 'react'
import classes from './HomeView.scss'
import SearchArtistBar from 'components/SearchArtistBar'
import ArtistsList from 'components/ArtistsList'
import { connect } from 'react-redux'
import { searchArtists, fetchMoreArtists } from '../modules/artistsList'
import { push } from 'react-router-redux'
import Loading from 'components/Loading'
import PropTypes from 'prop-types'

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
  artists: PropTypes.array.isRequired,
  searchArtistsHandler: PropTypes.func.isRequired,
  navigateToArtist: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFetchingMore: PropTypes.bool.isRequired,
  showMoreArtists: PropTypes.func.isRequired,
  next: PropTypes.string,
  total: PropTypes.number
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
