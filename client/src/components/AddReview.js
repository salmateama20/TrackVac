import React, { Component } from 'react'
import { Rating } from "@material-ui/lab";
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import { Typography } from '@mui/material';
import Modal from 'react-bootstrap/Modal'
import TextField from '@mui/material/TextField';
export default class Review extends Component {
    state = {
        title: "",
        cleannes: 0,
        speed: 0,
        service: 0,
    }
    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }
    render() {
        return (
            <Modal
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.show} onHide={this.handleClose.bind(this)} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <div className="add-review">


                                <InputGroup>
                                    <FormControl
                                        value={this.state.title}
                                        onChange={this.handleTitleChange.bind(this)}
                                        placeholder="Review title..."

                                    />
                                </InputGroup>
                                <br />
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Your Review</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                                <div className="rates-container" >
                                    <div>
                                        <Typography component="legend">cleannes</Typography>
                                        <Rating name="cleannes"
                                            size="large"
                                            value={this.state.cleannes}
                                            onChange={(event, v) => {
                                                this.setState({
                                                    cleannes: v
                                                })
                                            }} />
                                    </div>
                                    <div>
                                        <Typography component="legend">speed</Typography>
                                        <Rating name="speed"
                                            size="large"
                                            value={this.state.speed}
                                            onChange={(event, s) => {
                                                this.setState({
                                                    speed: s
                                                })
                                            }} />
                                    </div>
                                    <div>
                                        <Typography component="legend">service</Typography>
                                        <Rating
                                            size="large"
                                            name="service"
                                            value={this.state.service}
                                            onChange={(event, c) => {
                                                this.setState({
                                                    service: c
                                                })
                                            }} />
                                    </div>
                                </div>
                                <br />
                                <div className="review-bottom">
                                    <p> maybe add button here   </p>
                                </div>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="mbutton" onClick={this.handleClose.bind(this)}>
                                Reply
                            </Button>
                        </Modal.Footer>
                    </Modal>
        )
    }
}
