import React, { Component } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ReplyIcon from '@mui/icons-material/Reply';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Reply from './Reply';
import api from '../api';
export default class Question extends Component {
    state = {
        show: false,
        showReplies: false,
        vote: this.props.vote,
        replies: this.props.replies,
        showVerification: false,
        reply: "",
        _id: this.props._id,
        upVoted: false,
        downVoted: false
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
    handleCloseReplies() {
        this.setState({
            showReplies: false
        })
    }
    handleShowReplies() {
        this.setState({
            showReplies: true
        })
    }

    handleReplyChange(event) {
        this.setState({ reply: event.target.value });
    }

    async handleAddReply(event) {

        event.preventDefault();


        await api.addReply({ body: this.state.reply }, this.state._id).then(() => {
            this.setState({
                replies: [
                    ...this.state.replies,
                    {
                        body: this.state.reply,
                        date: new Date().toLocaleString(),
                    }
                ],
                reply: ""

            });
        }).catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
        });
        this.handleClose();

    }

    handleShowVerification() {
        this.setState({
            showVerification: true
        })
    }
    handleCloseVerification() {
        this.setState({
            showVerification: false
        })
    }

    handleVacChange(event) {
        this.setState({ vacID: event.target.value });
    }

    handleNationalChange(event) {
        this.setState({ nationalID: event.target.value });
    }

    async handleVerify() {
        const userInfo = {
            vacID: this.state.vacID,
            nationalID: this.state.nationalID
        }
        await api.validateUser(userInfo).then((res) => {
            this.setState({
                verified: res.data.success,
                showVerification: false,
                vacID: "",
                nationalID: ""
            })
        }).catch(e => {
            this.setState({
                vacID: "",
                nationalID: "",
            })
            this.handleCloseVerification()
            console.log('There has been a problem with your fetch operation: ' + e.message);
        })
    }

    async handleUpvote() {
        const { upVoted, downVoted, vote } = this.state
        if (!downVoted && !upVoted) {
            await api.updateVoteQuestion({ vote: vote + 1 }, this.state._id).then(() => {
                this.setState({
                    vote: vote + 1,
                    upVoted: true
                })
                this.props.onVoteChange(this.props._id, this.state.vote, true)
            }).catch(e => {
                console.log('There has been a problem with your fetch operation: ' + e.message);
            });
        } else if (downVoted) {
            await api.updateVoteQuestion({ vote: vote + 1 }, this.state._id).then(() => {
                this.setState({
                    vote: vote + 1,
                    downVoted: false
                })
                this.props.onVoteChange(this.props._id, this.state.vote, true)
            }).catch(e => {
                console.log('There has been a problem with your fetch operation: ' + e.message);
            });
        }


    }


    async handleDownvote() {
        const { upVoted, downVoted, vote } = this.state
        if (!upVoted && !downVoted) {
            await api.updateVoteQuestion({ vote: vote - 1 }, this.state._id).then(() => {
                this.setState({
                    vote: vote - 1,
                    downVoted: true
                })
                this.props.onVoteChange(this.props._id, this.state.vote, true)
            }).catch(e => {
                console.log('There has been a problem with your fetch operation: ' + e.message);
            });
        } else if (upVoted) {
            await api.updateVoteQuestion({ vote: vote - 1 }, this.state._id).then(() => {
                this.setState({
                    vote: vote - 1,
                    upVoted: false
                })
                this.props.onVoteChange(this.props._id, this.state.vote, true)
            }).catch(e => {
                console.log('There has been a problem with your fetch operation: ' + e.message);
            });
        }


    }




    render() {
        const { replies, upVoted, downVoted } = this.state
        const { lang } = this.props
        return (
            <div className="question" style={{ padding: "10px 10px 0px 10px" }}>
                <div className="question-body" style={{ marginBottom: "5px" }} >
                    <div className="upvote">
                        <ArrowUpwardIcon style={{ color: upVoted ? "#276678" : "gray" }} onClick={this.handleUpvote.bind(this)} className="arrow" />
                        <p>{this.props.vote ? this.props.vote : 0}</p>
                        <p>{lang ? "vote" : "تصويت "}</p>
                        <ArrowDownwardIcon style={{ color: downVoted ? "#276678" : "gray" }} onClick={this.handleDownvote.bind(this)} className="arrow" />
                    </div>
                    <h3> {this.props.body} </h3>
                </div>

                <div className="review-bottom" style={{ paddingTop: "10px" }} >
                    <p >{this.props.date}</p>
                    <div style={{ display: "flex", gap: "25px", color: '#1687A7' }}>
                        <div onClick={replies.length !== 0 ? this.handleShowReplies.bind(this) : ''} className="reply-button">
                            <p style={{ color: replies.length !== 0 ? '#1687A7' : 'gray', cursor: replies.length !== 0 ? 'pointer' : 'default' }}>{lang ? "Replies " : "الردود "} ({replies.length})</p>
                        </div>
                        <div style={{ color: '#1687A7' }} onClick={this.handleShow.bind(this)} className="reply-button" >
                            <ReplyIcon />
                            <p>{lang ? "Reply" : "اضف رد"}</p>
                        </div>
                    </div>

                </div>

                {/* add reply modal  */}
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.show} onHide={this.handleClose.bind(this)} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>{lang ? "Add reply" : "أضف رد"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="add-review">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>{lang ? "Your reply" : "ردك"}</Form.Label>
                                <Form.Control
                                    value={this.state.rText}
                                    as="textarea" rows={3}
                                    onChange={this.handleReplyChange.bind(this)} />
                            </Form.Group>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="mbutton" onClick={this.handleAddReply.bind(this)}>
                            {lang ? "Reply" : "اضف رد"}
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="replies">

                    <Modal
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.showReplies && !this.state.show} onHide={this.handleCloseReplies.bind(this)} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="list" >

                                {replies ? replies.map((r) =>
                                (
                                    <Reply body={r.body} date={r.date} />
                                )) : <p>No replies yet</p>
                                }

                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <div onClick={this.handleShow.bind(this)} className="reply-button" >
                                <ReplyIcon />
                                <p>{lang ? "Reply" : "اضف رد"}</p>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}
