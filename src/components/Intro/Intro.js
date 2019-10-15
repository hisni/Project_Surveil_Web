import React from 'react'
import classes from './Intro.css'

const Intro = () => {

  return (
    <div className={classes.intro}>
		<h1 className={classes.introText} >
			Welcome to Surveil
		</h1>
		<h1 className={classes.introText} >
			Pharma
		</h1>
		<h2 className={classes.introText} >
			Monitoring and Tracking System 
		</h2>
		<h2 className={classes.introText} >
			for Transportation of
		</h2>
		<h2 className={classes.introText} >
			Pharmaceuticals
		</h2>
    </div>
  )
}

export default Intro;
