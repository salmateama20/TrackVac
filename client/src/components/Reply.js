import React, { Component } from 'react'
export default class Reply extends Component {
    state = {
        show: false,
        showReplies: false,
        votes: this.props.votes,
        upVoted: false,
        downVoted: false,
        replies: this.props.replies,
        reply: ""
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
    handleShowReplies() {
        this.setState({
            showReplies: true
        })
    }

    handleReplyChange(event) {
        this.setState({ reply: event.target.value });
    }
    handleAddReply() {
        this.setState({
            replies: [
                ...this.state.replies,
                this.state.reply

            ],
            reply: ""

        })
        this.handleClose();

    }

    render() {
        return (
            <div className="review" style={{ padding: "10px 10px 0px 10px", display: "flex", flexDirection: "column" }}>
                <div className="question-body" style={{ marginBottom: "5px" }} >
                    <h3> {this.props.body} </h3>
                </div>

                <div className="review-bottom" style={{ paddingTop: "10px" }} >
                    <p >{this.props.date}</p>


                </div>
                <div className="replies">

                </div>

            </div>
        )
    }
}
