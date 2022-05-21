import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import api from '../api'
export default class Verification extends Component {
    state = {
        show: false
    }
    async handleVerify() {
        console.log("verifying")
    }
    handleShow() {
        this.setState({
            show: true
        })
    }
    handleClose() {
        this.setState({
            show: false
        })
    }

    render() {
        return (

            <div>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.show} onHide={this.handleClose.bind(this)} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title><p>Login</p></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"
                                    value={this.state.vacID}
                                    onChange={this.handleVacChange.bind(this)}
                                    placeholder="Enter your vaccine trackID" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                    value={this.state.nationalID}
                                    onChange={this.handleNationalChange.bind(this)}
                                    placeholder="Enter your last 4 national ID number" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="mbutton" onClick={this.handleVerify.bind(this)}>
                            verify
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}