import React from 'react'
import ArtistPreview from 'components/ArtistPreview'
import { shallow } from 'enzyme'
import placeholder from 'static/placeholder.png'
import classes from 'components/ArtistPreview/ArtistPreview.scss'

describe('(Component) ArtistPreview', () => {
  let _props, _wrapper, _goToArtist

  beforeEach(() => {
    _goToArtist = sinon.spy()
    _props = {
      artist: {
        name: 'Foo',
        followers: 123,
        popularity: 99
      },
      goToArtist: _goToArtist
    }
    _wrapper = shallow(<ArtistPreview {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should render with an <h3> that includes the artist name.', () => {
    expect(_wrapper.find('h3').text()).to.match(/Foo/)
  })

  it('Should render exactly one image.', () => {
    expect(_wrapper).to.have.exactly(1).descendants('img')
  })

  describe('Div containing img and details', () => {
    let _div
    beforeEach(() => {
      _div = _wrapper.find('div').at(1)
    })
    it('Should render a div with CSSmodules class img', () => {
      expect(_div.hasClass('center-block')).to.be.true
      expect(_div.hasClass(classes.img)).to.be.true
    })

    it('Should dispatch a `artistClickHandler` action when clicked', () => {
      _goToArtist.should.have.not.been.called
      _div.simulate('click')
      _goToArtist.should.have.been.called
    });
  })

  describe('Artist img tag', () => {
    let _img
    beforeEach(() => {
      _img = _wrapper.find('img')
    })

    it('has alt prop with artist.name value', () => {
      expect(_img).to.have.prop('alt', 'Foo')
    })

    it('has `placeholder` src if artist has undefined imageUrl', () => {
      expect(_img).to.have.prop('src', placeholder)
    })

    it('Should have width equal to 200px.', () => {
      expect(_img).to.have.prop('width', '200')
    })
  })

  describe('Artist details div', () => {
    let _details
    beforeEach(() => {
      _details = _wrapper.find('div').at(2)
    })

    it('has bootstrap and CSSmodules classes', () => {
      expect(_details).to.have.className('text-center')
      expect(_details).to.have.className(classes.details)
    })

    it('contains a list with two elements', () => {
      expect(_details).to.have.exactly(2).descendants('li')
    })
  })
})
