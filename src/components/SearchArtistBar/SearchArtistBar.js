import React from 'react'
import classes from './SearchArtistBar.scss'

export const SearchArtistBar = ({searchArtistsHandler}) => {
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
  searchArtistsHandler: React.PropTypes.func.isRequired
}

export default SearchArtistBar
