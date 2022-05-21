import React, { Component } from 'react'
import { Rating } from "@material-ui/lab";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import api from '../api';
import Modal from 'react-bootstrap/Modal'
export default class Review extends Component {

    state = {
        vote: this.props.vote,
        rate: this.props.rate,
        _id: this.props._id,
        show: false,
        upVoted: false,
        downVoted: false
    }

    async handleReport() {

        await api.updateReport(this.props._id).then(() => { }).catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
        });
        this.handleShow();
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
    async handleUpvote() {
        const { upVoted, downVoted, vote } = this.state
        if (!downVoted && !upVoted) {
            await api.updateVote({ vote: vote + 1 }, this.state._id).then(() => {

                this.setState({
                    vote: vote + 1,
                    upVoted: true
                })
                this.props.onVoteChange(this.props._id, this.state.vote, false)

            }).catch(e => {
                console.log('There has been a problem with your fetch operation: ' + e.message);
            });
        } else if (downVoted) {
            await api.updateVote({ vote: vote + 1 }, this.state._id).then(() => {

                this.setState({
                    vote: vote + 1,
                    downVoted: true
                })
                this.props.onVoteChange(this.props._id, this.state.vote, false)

            }).catch(e => {
                console.log('There has been a problem with your fetch operation: ' + e.message);
            });
        }

    }


    async handleDownvote() {
        const { upVoted, downVoted, vote } = this.state

        if (!upVoted && !downVoted) {
            await api.updateVote({ vote: vote - 1 }, this.state._id).then(() => {

                this.setState({
                    vote: vote - 1,
                    downVoted: true
                })
                this.props.onVoteChange(this.props._id, this.state.vote, false)

            }).catch(e => {
                console.log('There has been a problem with your fetch operation: ' + e.message);
            });
        } else if (upVoted) {
            await api.updateVote({ vote: vote - 1 }, this.state._id).then(() => {

                this.setState({
                    vote: vote - 1,
                    upVoted: false
                })
                this.props.onVoteChange(this.props._id, this.state.vote, false)

            }).catch(e => {
                console.log('There has been a problem with your fetch operation: ' + e.message);
            });
        }

    }
    render() {
        const { lang } = this.props
        const { upVoted, downVoted, vote } = this.state
        return (
            <div className="review" style={{ padding: "10px 10px 10px 10px" }}>




                <div className="upvote">
                    <ArrowUpwardIcon style={{ color: upVoted ? "#276678" : "gray" }} onClick={this.handleUpvote.bind(this)} className="arrow" />
                    <p>{vote ? vote : 0}</p>
                    <p>{lang ? "vote" : "تصويت "}</p>
                    <ArrowDownwardIcon style={{ color: downVoted ? "#276678" : "gray" }} onClick={this.handleDownvote.bind(this)} className="arrow" />
                </div>


                {/* review body */}
                <div className="review-body">
                    <Rating name="read-only" value={this.props.rate} readOnly />
                    <h3> {this.props.title} </h3>
                    <p>{this.props.body}</p>
                    <br />
                    <div className="review-bottom">
                        <p>{this.props.date}</p>
                        <p onClick={this.handleReport.bind(this)} className="reply-button">{lang ? "Report" : "إبلاغ"}</p>
                    </div>
                </div>

                <Modal
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.show} onHide={this.handleClose.bind(this)} animation={false}>
                    <Modal.Header closeButton>
                        {lang ? "Review reported successfully" : "تم الابلاغ بنجاح"}
                    </Modal.Header>
                    <Modal.Body>

                        <h3 style={{ textTransform: 'lowercase' }}>{lang ? "Thank you for reporting ! , we will look into it as soon as possible." : "شكرا على الإبلاغ! ، سوف ننظر في الأمر في أقرب وقت ممكن."}</h3>

                    </Modal.Body>

                </Modal>

            </div >
        )
    }
}
