import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

class Trucks extends Component {
    render(){
        return (
            <div className='Design'>
                <ButtonGroup>
                    <div className='customize-step-prompt'>
                        Step:
                    </div>
                    <Link to='/customize'><Button bsPrefix='customize-step-btn'>1</Button></Link>
                    <Link to='/boardsize'><Button bsPrefix='customize-step-btn'>2</Button></Link>
                    <Button bsPrefix='active-customize-step-btn'>3</Button>
                    <Link to='/wheels'><Button bsPrefix='customize-step-btn'>4</Button></Link>
                    <Link to='/graphics'><Button bsPrefix='customize-step-btn'>5</Button></Link>
                </ButtonGroup>
                <div className='custom-board-image-div'>
                    <h5 className='custom-step-name'>Trucks</h5>
                </div>
                <div className='custom-board-parts-div'>
                    <div className='custom-parts-card'>
                        
                    </div>
                    <div className='custom-parts-card'>

                    </div>
                    <div className='custom-parts-card'>

                    </div>
                </div>
            </div>
        )
    }
}

export default Trucks;