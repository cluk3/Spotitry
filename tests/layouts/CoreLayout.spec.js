import React from 'react'
import { shallow } from 'enzyme'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'




describe('(Layout) Core', () => {
  let _component
  let _props
  let _child

  beforeEach( () => {
    _child = <h1 className='child'>Child</h1>
    _props = {
      children: _child
    }
    _component = shallow(<CoreLayout {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_component.type()).to.equal('div')
  })
  it('has bootstrap class container', () => {
    const _div = _component.find('div').first()
    expect(_div.hasClass('container')).to.be.true
  })
  it('should contain an Header component', () => {
    expect(_component.find('Header')).to.have.length(1)
  })
})
