import React from 'react'

import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './SolidWaste.css'
import Glass from '../../assets/images/glass.png';
import Plastic from '../../assets/images/plastic.png';
import Paper from '../../assets/images/paper.png';
import Metal from '../../assets/images/metal.png';
import Ewaste from '../../assets/images/e-waste.png';

const SolidWaste = () => {
  return (
    <Aux>
        <div className={classes.Text}>
            <h1>Solid Wastes</h1>
        </div>
        <div className={classes.Images} >
            <div className={classes.Glass}>
                <img src={Glass} alt="Glass"/>
                <p>Wine bottles, beer bottles & glass jars</p>
            </div>
            <div className={classes.Plastic}>
                <img src={Plastic} alt="Plastic"/>
                <p>Plastic bags, plastic containers & bottles</p>
            </div>
            <div className={classes.Paper}>
                <img src={Paper} alt="Paper"/>
                <p>News papers, magazines books and paper packaging</p>
            </div>
            <div className={classes.Ewaste}>
                <img src={Ewaste} alt="Ewaste"/>
                <p>Electronic devices, computer parts</p>
            </div>
            <div className={classes.Metal}>
                <img src={Metal} alt="Metal"/>
                <p>Metal containers & cans</p>
            </div>
        </div>
    </Aux>
  )
}

export default SolidWaste;
