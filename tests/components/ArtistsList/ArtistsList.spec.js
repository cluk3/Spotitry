import React from 'react'
import ArtistsList from 'components/ArtistsList'
import { shallow } from 'enzyme'
import classes from 'components/ArtistsList/ArtistsList.scss'

describe('(Component) ArtistsList', () => {
  let _props1,
      _props2,
      _props3,
      _wrapper,
      _wrapperFetching,
      _wrapperNoRes,
      _goToArtist,
      _showMoreHandler

  beforeEach(() => {
    _goToArtist = sinon.spy()
    _showMoreHandler = sinon.spy()
    _props1 = {
      artists: [{
        name: 'Foo',
        followers: 123,
        popularity: 99
      },
      {
        name: 'Bar',
        followers: 125,
        popularity: 9
      }],
      goToArtist: _goToArtist,
      showMoreHandler: _showMoreHandler,
      next: 'http://foo.bar',
      isFetchingMore: false
    }
    _props2 = {
      ..._props1,
      next: '',
      isFetchingMore: true
    }
    _props3 = {
      ..._props1,
      artists: [],
      next: '',
      isFetchingMore: false
    }
    _wrapper = shallow(<ArtistsList {..._props1} />)
    _wrapperFetching = shallow(<ArtistsList {..._props2} />)
    _wrapperNoRes = shallow(<ArtistsList {..._props3} />)
  })

  it('Should render as a <div> with CSSmodules class `list`.', () => {
    expect(_wrapper.is('div')).to.equal(true)
    expect(_wrapper.find('div').first().hasClass(classes.list)).to.be.true
  })

  it('Should render `<h2>No results...</h2>` if artists is empty.', () => {
    expect(_wrapperNoRes.find('h2')).to.have.length(1)
    expect(_wrapperNoRes.find('h2')).to.have.prop('children', 'No results...')
  })

  it('Should render a <div> with CSSmodules class `preview` and class `row` if `artists` is not empty.', () => {
    expect(_wrapper.find('div').at(1)).to.have.className('row')
    expect(_wrapper.find('div').at(1)).to.have.className(classes.preview)
  })

  it('Should render an <ArtistPreview> for every artist ', () => {
    expect(_wrapper).to.have.exactly(2).descendants('ArtistPreview')
    expect(_wrapperNoRes).to.not.have.descendants('ArtistPreview')
  })

  it('Should render <Loading> component when `isFetchingMore` is true', () => {
    expect(_wrapper).to.not.have.descendants('Loading')
    expect(_wrapperFetching).to.have.exactly(1).descendants('Loading')
  })

  describe('Show more Button', () => {
    let _button
    beforeEach(()=> {
      _button = _wrapper.find('button');
    })
    it('Should be rendered with CSSmodules class `show` if `next` prop is defined', () => {
      expect(_button).to.have.className(classes.show)
      expect(_button.prop('onClick')).to.be.a('function')
      expect(_wrapperFetching.find('button')).to.have.length(0)
    })
    it('Should call showMoreHandler with next as arg when clicked.', () => {
      _showMoreHandler.should.have.not.been.called
      _button.simulate('click')
      _showMoreHandler.should.have.been.calledWith('http://foo.bar')
    })
  })
})
