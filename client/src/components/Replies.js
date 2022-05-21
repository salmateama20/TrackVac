import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Question from './Question'
export default class Replies extends Component {
    state = {
        show: this.props.show
    }

    handleClose() {
        this.setState({
            show: false
        })
    }
    render() {
        const { replies } = this.props.replies
        return (
            <div>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.show} onHide={this.handleClose.bind(this)} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="list" >

                            {replies ? replies.map((q) =>
                            (
                                <Question body={q.body} votes={0} date={"sdada"} replies={[]} />
                            )) : "oops"
                            }

                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <p>footer buttons</p>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
