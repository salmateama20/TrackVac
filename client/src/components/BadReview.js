import React, { Component } from 'react'
import { Rating } from "@material-ui/lab";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from 'react-bootstrap/Button'
import api from '../api';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { display } from '@mui/system';
export default class Review extends Component {

    state = {
        _id: this.props._id,
        show: false,
    }
    async handleDelete() {
        await api.deleteReview(this.state._id).then(() => {
        }).catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
        });
        window.location.reload();
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
            <div className="review" style={{ padding: "10px 10px 0px 10px" }}>
                <div className="question-body" style={{ marginBottom: "5px" }} >

                    <div className="review">
                        <h5>{this.props.title}</h5>
                        <p>{this.props.body}</p>
                    </div>
                    <br />
                    <div className="review-bottom">
                        <Button onClick={this.handleDelete.bind(this)} variant="mbutton">delete</Button>
                    </div>
                </div>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.show} onHide={this.handleClose.bind(this)} animation={false}>
                    <Modal.Body>

                        <p>deleted successfuly</p>

                    </Modal.Body>

                </Modal>

            </div >
        )
    }
}

//614e2058ad7aa1f062964c49