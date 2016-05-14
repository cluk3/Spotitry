import React from 'react'
import { HomeView } from 'routes/Home/containers/HomeView'
import { render, shallow } from 'enzyme'

describe('(View) Home', () => {
  const _propsWithResults = {
    artists: [{},{}],
    searchArtists: sinon.spy()
  }
  const _componentWithRes = shallow(<HomeView {..._propsWithResults}/>)
  const _propsWithNoResults = {
    artists: [],
    searchArtists: sinon.spy()
  }
  const _component = shallow(<HomeView {..._propsWithNoResults}/>)
  it('should have a SearchArtistBar component with searchArtists prop', () => {
    const _searchArtistBar = _component.find('SearchArtistBar')
    expect(_searchArtistBar).to.have.length(1)
    expect(_searchArtistBar.prop('searchArtists')).to.be.a('function')
  })
  it('should have no ArtistPreview component when search has no results', () => {
    expect(_component.find('ArtistPreview')).to.have.length(0)
  })
  it('should have ArtistPreview components when search has results', () => {
    expect(_componentWithRes.find('ArtistPreview')).to.have.length(2)
  })
  it('should pass an artist prop to ArtistPreview', () => {
    const _artistPreview = _componentWithRes.find('ArtistPreview')
    expect(_artistPreview).to.have.length(2)
    expect(_artistPreview.first().prop('artist')).to.be.an('object')
  })
})
