import React from 'react'
import { Link } from 'react-router'

export const TrackDetails = ({track, author}) => {
  const duration = track.duration_ms / 1000
  const min = Math.floor(parseInt(duration) / 60)
  const seconds = parseInt(duration) % 60
  const feat = track.artists
  .filter(artist => artist.name !== author)
  .map((artist, i, arr) => {
    return (
      <span>
        <strong>
          <Link to={'/artist/' + artist.id}>{artist.name}</Link>
        </strong>{arr.length - 1 === i ? '' : ' - '}
      </span>
    )
  })
  return (
    <li>
      {track.name} - {min}:{seconds.toString().length === 1 ? '0' + seconds : seconds}
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
