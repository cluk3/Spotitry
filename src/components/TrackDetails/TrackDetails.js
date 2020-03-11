import React from 'react'
import { Link } from 'react-router'
import { formatSongDuration } from 'helper'
import PropTypes from 'prop-types'

export const TrackDetails = ({ track, author }) => {
  const feat = track.artists
    .filter(artist => artist.name !== author)
    .map((artist, i, arr) => {
      return (
        <span key={i}>
          <strong>
            <Link to={'/artist/' + artist.id}>{artist.name}</Link>
          </strong>{arr.length - 1 === i ? '' : ' - '}
        </span>
      )
    })
  return (
    <li>
      <strong>{track.name}</strong> - {formatSongDuration(track.duration_ms)}
      {feat.length ? ' feat. ' : ''}
      {feat}
    </li>
  )
}

TrackDetails.propTypes = {
  track: PropTypes.object.isRequired,
  author: PropTypes.string.isRequired
}
export default TrackDetails
