import React from 'react'
import classes from './Header.scss'
import { Link } from 'react-router'

export const Header = () => (
  <div className={classes.header}>
    <Link to='/' className={classes.title}>Spotitry</Link>
  </div>
)

export default Header
