import React from 'react'
import SearchArtistBar from 'components/SearchArtistBar'
import { shallow } from 'enzyme'
import classes from 'components/SearchArtistBar/SearchArtistBar.scss'

describe('(Component) SearchArtistBar', () => {
  let _wrapper,
      _searchArtistHandler

  beforeEach(() => {
    _searchArtistHandler = sinon.spy()
    _wrapper = shallow(<SearchArtistBar searchArtistsHandler={_searchArtistHandler} />)
  })

  it('Should render as a <div> with CSSmodules class `searchBar`.', () => {
    expect(_wrapper.is('div')).to.equal(true)
    expect(_wrapper.find('div').hasClass(classes.searchBar)).to.be.true
  })

  describe('<input> tag', () => {
    let _input
    beforeEach(()=> {
      _input = _wrapper.find('input');
    })
    it('Should be rendered with CSSmodules class `searchInput` and have onChange handler', () => {
      expect(_input).to.have.className(classes.searchInput)
      expect(_input.prop('onChange')).to.be.a('function')
    })
    it('Should have attribute `id` equal to `artist-search`', () => {
      expect(_input).to.have.attr('id', 'artist-search')
    })
    it('Should have attribute `placeholder` equal to `Search Artist`', () => {
      expect(_input).to.have.attr('placeholder', 'Search Artist')
    })
    it('Should have attribute `type` equal to `search`', () => {
      expect(_input).to.have.attr('type', 'search')
    })
    it('Should call showMoreHandler with next as arg when clicked.', () => {
      _searchArtistHandler.should.have.not.been.called
      _input.simulate('change', {target: {value: 'foo'}})
      _searchArtistHandler.should.have.been.calledWith('foo')
    })
  })
})
