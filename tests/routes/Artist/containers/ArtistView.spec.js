import React from 'react'
import { ArtistView } from 'routes/Artist/containers/ArtistView'
import { mount, shallow } from 'enzyme'

describe('(View) Artist', () => {
  let _props,
      _propsNoAlbum,
      _propsLoading,
      _wrapper,
      _wrapperNoAlbums,
      _wrapperLoading

  before(() => {
    _props = {
      artist: {
        name: 'Foo',
        id: 123,
        albums: [{}, {}]
      },
      loadArtist: sinon.spy(),
      goToAlbum: sinon.spy(),
      routeParams: {
        artistId: 123
      }
    }
    _propsNoAlbum= {
      ..._props,
      artist: {
        name: 'Foo',
        id: 123,
        albums: []
      }
    }
    _propsLoading= {
      ..._props,
      artist: {
        name: 'Foo',
        id: 124,
        albums: []
      }
    }
    sinon.spy(ArtistView.prototype, 'componentDidMount')
    _wrapper = mount(<ArtistView {..._props}/>)
    _wrapperNoAlbums = shallow(<ArtistView {..._propsNoAlbum}/>)
    _wrapperLoading = shallow(<ArtistView {..._propsLoading}/>)
  })

  it('Should call componentDidMount.', () => {
    expect(ArtistView.prototype.componentDidMount).to.have.been.calledOnce;
  })
  it('Should call loadArtist when component is mounted', () => {
    expect(_props.loadArtist).to.have.been.calledWith(_props.routeParams.artistId, _props.artist)
  })
  it('Should render <Loading> when artist id is different from route id.', () => {
    expect(_wrapperLoading).to.have.descendants('Loading')
  })
  it('Should render a <div>.', () => {
    expect(_wrapperNoAlbums).to.have.tagName('div')
  })
  it('Should render an <h1> with the artist name inside.', () => {
    expect(_wrapperNoAlbums).to.have.exactly(1).descendants('h1')
    expect(_wrapperNoAlbums.find('h1')).to.have.prop('children', _propsNoAlbum.artist.name)
  })
  it('Should not render <AlbumPreview> if artist has no albums.', () => {
    expect(_wrapperNoAlbums).to.not.have.descendants('AlbumPreview')
  })
  it('Should render an <AlbumPreview> for every album.', () => {
    expect(_wrapper).to.have.exactly(_props.artist.albums.length).descendants('AlbumPreview')
  })
})
