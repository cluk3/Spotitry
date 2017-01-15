import React from 'react'
import { Link } from 'react-router'
import { formatSongDuration } from 'helper'

export const TrackDetails = ({track, author}) => {
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
      {track.name} - {formatSongDuration(track.duration_ms)}
      {feat.length ? ' feat ' : ''}
      {feat}
    </li>
  )
}

TrackDetails.propTypes = {
  track: React.PropTypes.object.isRequired,
  author: React.PropTypes.string.isRequired
}
export default TrackDetails
