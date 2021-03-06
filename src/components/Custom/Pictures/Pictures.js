import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {v4 as randomString} from 'uuid';
import Dropzone from 'react-dropzone';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import AuthModal from '../../User/AuthModal/AuthModal';
import {updateGraphic} from '../../../ducks/reducer';
import './Pictures.css';

class Pictures extends Component {
    constructor(props){
        super(props);
        this.state = {
            isUploading: false,
            showModal: false,
            user: {}
        }
    }

    componentDidMount(){
        this.handleGetUser();
        this.handleNoSelectedParts();
    }

    //grabs the user from sessions, if one is logged in
    handleGetUser = () => {
        axios.get('/auth/session-user')
        .then(res => {
            this.setState({
                user: res.data
            })
        })  
    }

    //handles login functionality
    handleLogin = async(data) => {
        const {design, grip, trucks, wheels, graphic, total} = this.props;
        await this.setState({
            user: data
        })
        this.handleAddToCart(design.id, grip.id, trucks.id, wheels.id, graphic, total);
    }

    //toggle set up to show the authentication modal when value is true
    handleToggle = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    handleAddToCart = (design, grip, trucks, wheels, graphic, total) => {
        if(this.state.user.user_id) {
            const orderItem = {
                order_id: this.state.user.order_id,
                design,
                grip,
                trucks,
                wheels,
                graphic,
                total
            }
            axios.post('/api/custom-cart-item', orderItem)
            .then(res => {
                alert('Item added successfully')
            })
        } else {
            this.handleToggle()
        }
    }

    //puts the url of the uploaded image onto redux state
    handleGraphic = (url) => {
        this.props.updateGraphic({graphic: url})
    }

    //this and uploadFile handle putting the image into s3 bucket, as well as invoke the handleGraphic function(in uploadFile)
    getSignedRequest = ([file]) => {
        this.setState({ isUploading: true });
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;
        axios.get('/api/signs3', {
            params: {
              'file-name': fileName,
              'file-type': file.type,
            },
        })
        .then(response => {
            const { signedRequest, url } = response.data;
            this.uploadFile(file, signedRequest, url);
        })
        .catch(err => {
            console.log(err);
        });
    };

    uploadFile = (file, signedRequest, url) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        };    
        axios.put(signedRequest, file, options)
        .then(response => {
            this.setState({ isUploading: false})
            this.handleGraphic(url)
        })
        .catch(err => {
            this.setState({
              isUploading: false,
            });
            if (err.response.status === 403) {
              alert(`Your request for a signed URL failed with a status 403.`);
            } else {
              alert(`ERROR: ${err.status}\n ${err.stack}`);
            }
          });
      };

    handleNoSelectedParts = () => {
        if(!this.props.design.name || !this.props.grip.name || !this.props.trucks.name || !this.props.wheels.color){
            this.props.history.push('/customize')
        }
    }
    
    //conditional rendering for the authentication modal, as well as for whether an image has been uploaded or not
    render(){
        const {design, grip, trucks, wheels, graphic, total} = this.props;
        const{isUploading} = this.state;
        return (
            <div className='Design'>
                <div>
                    <ButtonGroup>
                        <div className='customize-step-prompt'>
                            Step:
                        </div>
                        <Link to='/customize'><Button bsPrefix='customize-step-btn'>1</Button><Button bsPrefix='desktop-customize-step-btn'>Design</Button></Link>
                        <Link to='/board-grip'><Button bsPrefix='customize-step-btn'>2</Button><Button bsPrefix='desktop-customize-step-btn'>Grip</Button></Link>
                        <Link to='/trucks'><Button bsPrefix='customize-step-btn'>3</Button><Button bsPrefix='desktop-customize-step-btn'>Trucks</Button></Link>
                        <Link to='/wheels'><Button bsPrefix='customize-step-btn'>4</Button><Button bsPrefix='desktop-customize-step-btn'>Wheels</Button></Link>
                        <Button bsPrefix='active-customize-step-btn'>5</Button>
                        <Button bsPrefix='active-desktop-customize-step-btn'>Graphics</Button>
                    </ButtonGroup>
                    <div className='custom-graphic-container'>
                        <h5>Add a Graphic</h5>
                        <div className='custom-image'>
                            {this.props.graphic
                            ?(<img src={this.props.graphic} alt='graphic' className='uploaded-graphic'/>)
                            : null}
                        </div>
                        <div className='custom-board-buttons-div'>
                            <h6>Add a Graphic</h6>
                            <ButtonGroup bsPrefix='custom-btn-group'>
                                <Dropzone
                                    onDropAccepted={this.getSignedRequest}
                                    accept="image/*"
                                    multiple={false}>
                                    {({getRootProps, getInputProps}) => (
                                    <Button bsPrefix='custom-board-btn' {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {isUploading ? <span>Loading...</span> : <span>Upload Graphic</span>}
                                    </Button>
                                )}
                                </Dropzone>
                                <Button bsPrefix='custom-board-btn' onClick={() => this.handleAddToCart(design.id, grip.id, trucks.id, wheels.id, graphic, total)}>Add to Cart</Button>
                            </ButtonGroup>
                            <p>*Note that all images may not fit onto the the longboard surface. It is recommended that you use images that have been cropped to work with your
                                selected longboard shape.
                            </p>
                        </div>
                    </div>
                </div>
                {this.state.showModal
                ?(<AuthModal
                    user={this.state.user} 
                    login={this.handleLogin}
                    toggle={this.handleToggle}/>)
                :(null)}
            </div>
        )
    }
}

//bringing in the state from redux, as well as the updateGraphic action
const mapStateToProps = reduxState => {
    const {total, graphic, wheels, trucks, grip, design} = reduxState;
    return {
        total,
        graphic,
        wheels,
        trucks,
        grip,
        design
    }
}

const mapDispatchToProps = {
    updateGraphic
}

export default connect(mapStateToProps, mapDispatchToProps)(Pictures);