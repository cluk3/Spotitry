import React from 'react'
import classes from './AlbumPreview.scss'
import placeholder from 'static/placeholder.png'
import PropTypes from 'prop-types'

export const AlbumImg = ({ imageUrl, albumClickHandler = () => { } }) => {
  return (
    <img src={imageUrl || placeholder} width='300' height='300'
      className={classes.img + ' img-rounded'}
      onClick={albumClickHandler}
    />
  )
}

AlbumImg.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  albumClickHandler: PropTypes.func
}

export default AlbumImg
