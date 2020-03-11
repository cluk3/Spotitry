import React from 'react'
// import classes from './HomeView.scss'
import { connect } from 'react-redux'
import { loadAlbum } from '../modules/album'
import TrackDetails from 'components/TrackDetails'
import Loading from 'components/Loading'
import AlbumImg from 'components/AlbumPreview/AlbumImg'
import PropTypes from 'prop-types'

const Album = ({ album }) => {
  return (
    <div>
      <AlbumImg imageUrl={album.images && album.images[0].url} />
      <h1 className='text-center'>{album.name}</h1>
      <div className='row'>
        <ul className='col list-unstyled text-center'>
          {album.tracks && album.tracks.map((track, i) => {
            return <TrackDetails key={i} author={album.artists[0].name} track={track} />
          })}
        </ul>
      </div>
    </div>
  )
}

AlbumViewContainer.propTypes = {
  album: React.PropTypes.object.isRequired
}

export class AlbumView extends React.Component {
  componentDidMount () {
    const { loadAlbum, routeParams, album } = this.props
    loadAlbum(routeParams.albumId, album)
  }
  render () {
    const { album, routeParams } = this.props
    console.log(album)
    const loading = <Loading />
    return (
      <div>
        {routeParams.albumId === album.id ? <Album album={album} /> : loading}
      </div>
    )
  }
}

AlbumView.propTypes = {
  album: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  tracks: PropTypes.array,
  loadAlbum: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadAlbum: (albumId, actualAlbum) => dispatch(loadAlbum(albumId, actualAlbum))
  }
}

const mapStateToProps = (state) => ({
  album: state.album
})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumView)
