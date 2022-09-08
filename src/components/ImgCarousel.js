import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import '../pages/Profile.css'




export default class ImgCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
    }

    handleOpen = () => {
        this.setState({ showModal: true })
    }

    handleClose = () => {
        this.setState({ showModal: false })
    }

    imgModal = (image) => {
        return (
            <Modal show={this.state.showModal} onHide={this.handleClose} centered className='modal' >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <img className="modal-image" src={image} alt={`${this.props.location.name} img`} />
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        )
    }

    render() {
        return (

            <Carousel className='image-carousel'>
                {this.props.location.images.map((image, i) => {
                    return (
                        <Carousel.Item key={i} >
                            <img className="location-image" src={image} alt={`${this.props.location.name} img ${i}`} 
                            onClick={() => this.imgModal(image)} 
                            />
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        )
    }
}