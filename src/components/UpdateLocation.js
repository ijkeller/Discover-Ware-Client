import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default class UpdateLocation extends React.Component {
    constructor(props) {
        super(props)
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

    handleSubmit = (e) => {
        e.preventDefault();
        let locationToUpdate = {
            _id: this.props.location._id,
            placename: this.props.location.placename,
            type: this.props.location.type,
            notes: e.target.notes.value || this.props.location.notes,
            lat: this.props.location.lat,
            lon: this.props.location.lon,
            placeimage: this.props.location.placeimage,
            __v: this.props.location.__v
        }
        this.props.handleUpdate(locationToUpdate)
    }

    render() {
        return (
            <>
                <Button variant="secondary" onClick={this.handleOpen} > Update Location</Button>
                <Modal show={this.state.showModal} onHide={this.handleClose} centered className="modal" >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Title>Update Location</Modal.Title>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="notes">
                                <Form.Control type="text" placeholder='Notes' />
                            </Form.Group>
                            <Button variant="secondary" type="submit" onClick={this.handleClose} >Submit</Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}