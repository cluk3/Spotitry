import React from 'react'
import Loading from 'components/Loading'
import { shallow } from 'enzyme'
import classes from 'components/Loading/Loading.scss'
import ellipsis from 'static/ellipsis.svg'

describe('(Component) Loading', () => {
  let _props, _wrapper

  beforeEach(() => {
    _props = {
      fullScreen: true
    }
    _wrapper = shallow(<Loading {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.be.true
  })

  it('Should render exactly one image.', () => {
    expect(_wrapper).to.have.exactly(1).descendants('img')
  })

  describe('Containing Div', () => {
    let _div
    beforeEach(() => {
      _div = _wrapper.find('div')
    })
    it('Should render a div with CSSmodules class full if prop fullScreen is true', () => {
      expect(_div.hasClass(classes.full)).to.be.true
    })
  })

  describe('Loading img tag', () => {
    let _img
    beforeEach(() => {
      _img = _wrapper.find('img')
    })

    it('has alt prop with `loading` value', () => {
      expect(_img).to.have.prop('alt', 'loading')
    })

    it('has `ellipsis` src', () => {
      expect(_img).to.have.prop('src', ellipsis)
    })

    it('has CSSmodules class ellipsis', () => {
      expect(_img.hasClass(classes.ellipsis)).to.be.true
    })
  })
})
