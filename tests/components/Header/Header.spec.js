import React from 'react'
import Header from 'components/Header'
import { shallow } from 'enzyme'
import classes from 'components/Header/Header.scss'

describe('(Component) Header', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Header />)
  })

  it('Should render as a <div> with CSSmodules class `header`.', () => {
    expect(_wrapper.is('div')).to.be.true
    expect(_wrapper.find('div').hasClass(classes.header)).to.be.true
  })

  it('Should render exactly one Link.', () => {
    expect(_wrapper.find('Link')).to.have.length(1)
  })

  describe('Link element', () => {
    let _Link
    beforeEach(() => {
      _Link = _wrapper.find('Link')
    })
    it('has CSSmodules class `title`', () => {
      expect(_Link.hasClass(classes.title)).to.be.true
    })
    it('has Spotitry text', () => {
      expect(_Link).to.have.prop('children', 'Spotitry')
    })
    it('has prop `to` equal to `/`', () => {
      expect(_Link).to.have.prop('to','/')
    })
  })
})
