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
            name: this.props.location.name,
            address: this.props.location.address,
            notes: e.target.notes.value || this.props.location.notes ,
            images: this.props.location.images,
            types: this.props.location.types,
            lat: this.props.location.lat,
            lng: this.props.location.lng,
            place_id: this.props.location.place_id,
            __v: this.props.location.__v
        }
        this.props.handleUpdate(locationToUpdate)
        this.handleClose()
    }

    render() {
        return (
            <>
                <Button size="sm" variant="secondary" onClick={this.handleOpen} > Update Notes</Button>
                <Modal show={this.state.showModal} onHide={this.handleClose} centered className="modal" >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Title>Update Location</Modal.Title>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="notes">
                                <Form.Control as="textarea" type="text" placeholder='Edit Notes' defaultValue={this.props.location.notes} />
                            </Form.Group>
                            <Button className="button update-button" variant="secondary" type="submit" >Add Note</Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
