import React from 'react'
// import classes from './HomeView.scss'
import { connect } from 'react-redux'
import { loadAlbum } from '../modules/album'
import TrackDetails from 'components/TrackDetails'
import Loading from 'components/Loading'

export class AlbumView extends React.Component {
  componentDidMount () {
    const {loadAlbum, routeParams, album} = this.props
    loadAlbum(routeParams.albumId, album)
  }
  render () {
    const {album, routeParams} = this.props
    const albumView = (
      <div>
        <h1>{album.name}</h1>
        <div className='row'>
          {album.tracks && album.tracks.map((track, i) => {
            return <TrackDetails key={i} author={album.artists[0].name} track={track} />
          })}
        </div>
      </div>
    )
    const loading = <Loading />
    return (
      <div>
        {routeParams.albumId === album.id ? albumView : loading}
      </div>
    )
  }
}

AlbumView.propTypes = {
  album: React.PropTypes.object.isRequired,
  routeParams: React.PropTypes.object.isRequired,
  tracks: React.PropTypes.array,
  loadAlbum: React.PropTypes.func.isRequired
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
