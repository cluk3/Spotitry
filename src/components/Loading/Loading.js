import React from 'react'
import ellipsis from 'static/ellipsis.svg'
import classes from './Loading.scss'
import PropTypes from 'prop-types'

export const Loading = ({fullScreen}) => (
  <div className={fullScreen ? classes.full : ''}>
    <img src={ellipsis} alt='loading' className={classes.ellipsis} />
  </div>
)

Loading.propTypes = {
  fullScreen: PropTypes.bool
}
export default Loading
