import React from 'react'
import { HomeView } from 'routes/Home/containers/HomeView'
import classes from 'routes/Home/containers/HomeView.scss'
import { shallow } from 'enzyme'

describe('(View) Home', () => {
  const _props = {
    artists: [{},{}],
    searchArtistsHandler: sinon.spy(),
    goToArtist: sinon.spy(),
    isFetching: false,
    showMoreArtists: sinon.spy(),
    total: 123,
    next: 'next.url',
    isFetchingMore: false
  }
  const _propsFetching = {
    ..._props,
    isFetching: true
  }
  const _component = shallow(<HomeView {..._props}/>)
  const _componentFetching = shallow(<HomeView {..._propsFetching}/>)
  it('Should have a SearchArtistBar component with searchArtists prop.', () => {
    const _searchArtistBar = _component.find('SearchArtistBar')
    expect(_searchArtistBar).to.have.length(1)
    expect(_searchArtistBar.prop('searchArtistsHandler')).to.be.a('function')
  })
  it('Should have exactly one ArtistsList component.', () => {
    const _artistsList = _component.find('ArtistsList')
    expect(_artistsList).to.have.length(1)
    expect(_artistsList).to.have.prop('artists')
    expect(_artistsList).to.have.prop('goToArtist')
    expect(_artistsList).to.have.prop('showMoreHandler')
    expect(_artistsList).to.have.prop('next')
    expect(_artistsList).to.have.prop('isFetchingMore')
  })
  it('Should display the total when search has results.', () => {
    const total = _component.find('span')
    expect(total.hasClass(classes.total)).to.be.true
    expect(total.text()).to.match(/123$/)
  })
  it('Should have exactly one Loading component when fetching.', () => {
    expect(_componentFetching.find('Loading')).to.have.length(1)
  })
})
