import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import BoardsDisplay from './BoardsDisplay'
import AuthModal from './AuthModal';
import './Boards.css';

class Boards extends Component {
    constructor(props){
        super(props);
        this.state = {
            boards: [],
            user: {},
            showModal: false
        }
    }

    componentDidMount(){
        this.handleGetSessionUser();
        this.handleGetBoards();
    }

    handleGetSessionUser = () => {
        axios.get('/auth/get-session-user')
        .then(res => {
            this.setState({
                user: res.data
            })
        }) 
    }

    handleToggle = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    handleAddToCart = (boardID, price) => {
        if(this.state.user.user_id) {
            const orderItem = {
                order_id: this.state.user.order_id,
                standard_product: boardID,
                quantity: 1,
                price
            }
            axios.post('/api/add-to-cart-standard', orderItem)
            //add an alert to let the customer know their product was added
        } else {
            this.handleToggle()
        }
    }

    handleLogin = (data) => {
        this.setState({
            user: data
        })
    }

    handleGetBoards = () => {
        axios.get('/api/standard-boards')
        .then(res => {
            this.setState({
                boards: res.data
            })
        })
    }

    handleFilterPriceLow = () => {
        axios.get('/api/boards-price-filter-low')
        .then(res => {
            this.setState({
                boards: res.data
            })
        })
    }

    handleFilterPriceHigh = () => {
        axios.get('/api/boards-price-filter-high')
        .then(res => {
            this.setState({
                boards: res.data
            })
        })
    }

    render(){
        const mappedBoards = this.state.boards.map((board, i) => {
            return(
                <BoardsDisplay 
                    key={i}
                    board={board}
                    addToCart={this.handleAddToCart}/>
            )
        })
        return(
            <div>
                {!this.state.showModal
                ? (<div className='Boards'>
                    <div className='Filter-group'>
                    <ButtonGroup>
                        <div className='Filterby'>
                            Filter by:
                        </div>
                        <DropdownButton alignRight title='Design' bsPrefix='Filter-dropdownbutton'>
                            <div className='Dropdown-option-div'><Link to='/pintail-boards' className='Design-links'>Pintail</Link></div>
                            <Dropdown.Divider />
                            <div className='Dropdown-option-div'><Link to='/drop-boards' className='Design-links'>Drop</Link></div>
                        </DropdownButton>
                        <DropdownButton alignRight title='Price' bsPrefix='Filter-dropdownbutton'>
                            <div onClick={this.handleFilterPriceHigh} className='Dropdown-option-div'>High to Low</div>
                            <Dropdown.Divider />
                            <div onClick={this.handleFilterPriceLow} className='Dropdown-option-div'>Low to High</div>
                        </DropdownButton>
                    </ButtonGroup>
                    </div>
                    <div className='boardsflex'>
                        {mappedBoards}
                    </div>
                </div>) : (
                <div className='Boards'>
                    <div className='Filter-group'>
                    <ButtonGroup>
                    <div className='Filterby'>
                        Filter by:
                    </div>
                    <DropdownButton alignRight title='Design' bsPrefix='Filter-dropdownbutton'>
                        <div className='Dropdown-option-div'><Link to='/pintail-boards' className='Design-links'>Pintail</Link></div>
                        <Dropdown.Divider />
                        <div className='Dropdown-option-div'><Link to='/drop-boards' className='Design-links'>Drop</Link></div>
                    </DropdownButton>
                    <DropdownButton alignRight title='Price' bsPrefix='Filter-dropdownbutton'>
                        <div onClick={this.handleFilterPriceHigh} className='Dropdown-option-div'>High to Low</div>
                        <Dropdown.Divider />
                        <div onClick={this.handleFilterPriceLow} className='Dropdown-option-div'>Low to High</div>
                    </DropdownButton>
                    </ButtonGroup>
                    </div>
                    <AuthModal 
                        login={this.handleLogin}
                        toggle={this.handleToggle}/>
                    <div className='boardsflex'>
                        {mappedBoards}
                    </div>
                </div>
                )}
            </div>
        )
    }
}

export default Boards;