import React from 'react'
import classes from './Footer.css'
import { FaCopyright } from 'react-icons/fa';

const Footer = () => {

  return (
    <footer className={classes.footer}>
        <div className={classes.Left}>
            <h4><FaCopyright /> 2019, VISION BOKS</h4>
        </div>
        <div className={classes.Right}>
            <h4>All Rights Reserved.</h4>
        </div>
    </footer>
  )
}

export default Footer;
