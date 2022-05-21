import React, { Component } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ReplyIcon from '@mui/icons-material/Reply';
import Replies from './Replies';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import verify_logo from '../components/verify.svg';
import Reply from './Reply';
import api from '../api';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
export default class Question extends Component {
    state = {
        _id: this.props._id
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

    async handleDelete() {
        await api.deleteQuestion(this.props._id).then(() => {
        }).catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
        });
        window.location.reload();
    }


    render() {
        const { replies } = this.state
        return (<div>
            <div className="review" style={{ padding: "10px 10px 0px 10px", display: 'flex ' }}>

                <div className="review">
                    <p>{this.props.body}</p>
                </div>
                <br />
                <div className="review-bottom">
                    <Button onClick={this.handleDelete.bind(this)} variant="mbutton">delete</Button>
                </div>

            </div>
        </div >
        )
    }
}
