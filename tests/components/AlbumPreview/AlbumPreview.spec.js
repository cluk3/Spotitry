import React from 'react'
import AlbumPreview from 'components/AlbumPreview'
import { shallow } from 'enzyme'
import placeholder from 'static/placeholder.png'
import classes from 'components/AlbumPreview/AlbumPreview.scss'

describe('(Component) AlbumPreview', () => {
  let _props, _spies, _wrapper, _goToAlbum

  beforeEach(() => {
    _goToAlbum = sinon.spy()
    _props = {
      album: {
        name: 'Foo',
        id: 12345
      },
      goToAlbum: _goToAlbum
    }
    _wrapper = shallow(<AlbumPreview {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should render with an <h2> that includes sample AlbumPreview text.', () => {
    expect(_wrapper.find('h2').text()).to.match(/Foo/)
    expect(_wrapper.find('h2').hasClass(classes.title)).to.be.true
  })

  it('Should render exactly one image.', () => {
    expect(_wrapper).to.have.exactly(1).descendants('img')
  })

  describe('Album img tag', () => {
    let _img
    beforeEach(() => {
      _img = _wrapper.find('img')
    })
    it('has bootstrap and css Modules classes', () => {
      expect(_img.hasClass('img-rounded')).to.be.true
      expect(_img.hasClass(classes.img)).to.be.true
    })

    it('has `placeholder` src if album has undefined imageUrl', () => {
      expect(_img).to.have.prop('src', placeholder)
    })

    it('Should have width and height equal to 300px.', () => {
      expect(_img).to.have.prop('width', '300')
      expect(_img).to.have.prop('height', '300')
    })

    it('Should dispatch a `albumClickHandler` action when clicked', () => {
      _goToAlbum.should.have.not.been.called
      _img.simulate('click')
      _goToAlbum.should.have.been.called
    });
  })
})
