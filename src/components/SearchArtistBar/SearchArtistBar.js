import React from 'react'
import classes from './SearchArtistBar.scss'
import PropTypes from 'prop-types'

export const SearchArtistBar = ({ searchArtistsHandler }) => {
  const inputHandler = (ev) => searchArtistsHandler(ev.target.value)
  return (
    <div className={classes.searchBar}>
      <input
        className={classes.searchInput}
        id='artist-search'
        placeholder='Search Artist'
        type='search'
        onChange={inputHandler}
      />
    </div>
  )
}

SearchArtistBar.propTypes = {
  searchArtistsHandler: PropTypes.func.isRequired
}

export default SearchArtistBar
