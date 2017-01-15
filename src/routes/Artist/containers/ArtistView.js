import React from 'react'
// import classes from './HomeView.scss'
import { connect } from 'react-redux'
import { loadArtist } from '../modules/artist'
import AlbumPreview from 'components/AlbumPreview'
import Loading from 'components/Loading'
import { push } from 'react-router-redux'

export class ArtistView extends React.Component {
  componentDidMount () {
    const {loadArtist, routeParams, artist} = this.props
    loadArtist(routeParams.artistId, artist)
  }
  render () {
    const {artist, routeParams, goToAlbum} = this.props
    const artistView = (
      <div>
        <h1>{artist.name}</h1>
        <div className='row'>
          {artist.albums && artist.albums.map((album, i) => {
            return <AlbumPreview goToAlbum={goToAlbum} key={i} album={album} />
          })}
        </div>
      </div>
    )
    return (
      <div>
        {routeParams.artistId === artist.id ? artistView : <Loading />}
      </div>
    )
  }
}

ArtistView.propTypes = {
  artist: React.PropTypes.object.isRequired,
  routeParams: React.PropTypes.object.isRequired,
  goToAlbum: React.PropTypes.func.isRequired,
  loadArtist: React.PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadArtist: (artistId, artist) => dispatch(loadArtist(artistId, artist)),
    goToAlbum: (albumId) => dispatch(push(`/album/${albumId}`))
  }
}

const mapStateToProps = (state) => ({
  artist: state.artist
})

export default connect(mapStateToProps, mapDispatchToProps)(ArtistView)
