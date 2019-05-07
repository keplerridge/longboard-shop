import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import testpicture from './the-nigmatic-263109-unsplash.jpg';
import './Boards.css';

class Boards extends Component {
    constructor(props){
        super(props);
        this.state = {
            boards: []
        }
    }

    componentDidMount(){
        this.handleGetBoards();
    }

    handleGetBoards(){
        axios.get('/api/standard-boards')
        .then(res => {
            this.setState({
                boards: res.data
            })
        })
    }

    render(){
        const mappedBoards = this.state.boards.map((board, i) => {
            return(
                <Card bsPrefix='custom-card' key={i}>
                    <Card.Img variant="top" src={testpicture} style={{height: '165px', borderRadius: '10px 10px 0px 0px'}} />
                    <Card.Body>
                        <Card.Title>{board.longboard_title}, {board.price}</Card.Title>
                        <Card.Text>
                            {board.longboard_description}
                        </Card.Text>
                        <ButtonGroup bsPrefix='card-btn-group'>
                            <Link to='/board/:boardname'><Button bsPrefix='boards-custom-btn1'>More Info</Button></Link>
                            <Button bsPrefix='boards-custom-btn2'>Add to Cart</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Card>
            )
        })
        return(
            <div className='Boards'>
                <div className='Filter-group'>
                <ButtonGroup>
                    <div className='Filterby'>
                        Filter by:
                    </div>
                    <DropdownButton title='Design' bsPrefix='Filter-dropdownbutton'>
                            <Dropdown.Item>Option 1</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>Option 2</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton alignRight title='Size' bsPrefix='Filter-dropdownbutton'>
                        <Dropdown.Item>Option 1</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Option 2</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton alignRight title='Price' bsPrefix='Filter-dropdownbutton'>
                        <Dropdown.Item>High to Low</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Low to High</Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
                </div>
                <div className='boardsflex'>
                    {mappedBoards}
                </div>
            </div>
        )
    }
}

export default Boards;