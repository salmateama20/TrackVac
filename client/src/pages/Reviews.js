import React, { Component } from 'react'
import AverageRates from '../components/AverageRates'
import NavBar from '../components/NavBar'
import Review from '../components/Review'
import { Rating } from "@material-ui/lab";
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Question from '../components/Question'
import IconLabelTabs from '../components/IconLabelTabs'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import rates_logo from '../components/rates.svg';
import guc from '../components/guc.jpg'
import verify_logo from '../components/verify.svg';
import questions_logo from '../components/questions.svg';
import '../reviews-style.css';
import api from '../api';

export default class Reviews extends Component {
    reply = { body: 'this is a reply', date: '16/10/2021' }
    question = {
        body: "to be or not to be",
        vote: 0,
        date: "15/09/2021",
        replies: [this.reply, this.reply, this.reply, this.reply, this.reply]
    }

    review = {
        title: "Nice place",
        body: "very good place overall.",
        date: "15/09/2021",
        cleannes: 4,
        speed: 4,
        service: 4,
        rate: 3,
        serviceRating: 3,
        speedRating: 3,
        cleanRating: 3

    }
    state = {
        governorate: "",
        district: "",
        cities: [],
        districts: [],
        verified: false,
        show: false,
        showVerification: false,
        isReview: (window.location.pathname === "/reviews" ? true : false),
        questions: [],
        reviews: [],
        qText: "",
        title: "",
        rText: "",
        cleannes: 0,
        speed: 0,
        service: 0,
        vacID: "",
        nationalID: "",
        errorMsg: "",
        // states for autocomplete dropdown 
        govInputValue: "",
        disInputValue: "",
        govText: "",
        disText: "",
        lang: true

    }
    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }
    handleShowReview() {
        if (this.state.verified === true) {
            this.setState({
                show: true
            })
        } else {
            this.setState({
                showVerification: true
            })
        }
    }
    handleCloseReview() {
        this.setState({
            show: false
        })
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
            this.handleCloseVerification()
            this.handleShowReview();
        }).catch((e, res) => {
            this.setState({
                vacID: "",
                nationalID: "",
                errorMsg: "Ops! Please make sure that you are already vaccienated and provided valid input"

            })

            console.log('There has been a problem with your fetch operation: ' + e.message);
        })


    }

    async handleAddReview(event) {

        event.preventDefault();
        const review = {
            title: this.state.title,
            rate: Math.round((this.state.cleannes + this.state.speed + this.state.service) / 3),
            cleanRating: this.state.cleannes,
            speedRating: this.state.speed,
            serviceRating: this.state.cleannes,
            body: this.state.rText,
        }

        await api.addReview(review, this.state.district.id).then((reviewID) => {

            this.setState({
                reviews: [...this.state.reviews,
                {
                    title: this.state.title,
                    rate: Math.round((this.state.cleannes + this.state.speed + this.state.service) / 3),
                    cleanRating: this.state.cleannes,
                    speedRating: this.state.speed,
                    serviceRating: this.state.cleannes,
                    body: this.state.rText,
                    date: new Date().toLocaleString(),
                    _id: reviewID.data,
                    vote: 0
                }],
                title: "",
                rText: "",
                cleannes: 0,
                speed: 0,
                service: 0
            });
        }).catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
        });

        this.handleCloseReview();
    }

    handleQuestChange(event) {
        this.setState({ qText: event.target.value });
    }
    handleRevChange(event) {
        this.setState({ rText: event.target.value });
    }

    async handleAddQuestion(event) {
        event.preventDefault();

        await api.addQuestion({ body: this.state.qText }, this.state.district.id).then((questionID) => {
            this.setState({
                questions: [...this.state.questions,
                {
                    body: this.state.qText,
                    vote: 0,
                    date: new Date().toLocaleString(),
                    replies: [],
                    _id: questionID.data
                }
                ],
                qText: ""
            });
        }).catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
        });


    }
    switchList = (newValue) => {
        if (newValue === 1) {
            this.setState({ isReview: false })
        } else {
            this.setState({ isReview: true })
        }
    };


    async handleGovChange(event, govObj) {
        this.setState({
            governorate: govObj ? govObj.id : '',
            govInputValue: govObj,
            disInputValue: ''
        });
        if (govObj) {
            await api.getAllDistricts(govObj.id).then(districtArr => {

                this.setState({
                    reviews: [],
                    districts: districtArr.data,
                    district: ""
                });

            }).catch(e => {
                console.log('There has been a problem with your fetch operation: ' + e.message);
            });
        }

    }
    async handleDistrictChange(event, district) {
        this.setState({
            district: district ? district.id : '',
            disInputValue: district
        })
        if (district) {
            await api.getAllReviews(this.state.governorate || 'cityID', district.id).then(reviewsArr => {
                this.setState({
                    reviews: reviewsArr.data,
                });
            }).catch(e => {
                console.log('There has been a problem with your fetch operation: ' + e.message);
            });
            await api.getAllQuestions(this.state.governorate || 'cityID', district.id).then(questionsArr => {
                this.setState({
                    district: district,
                    questions: questionsArr.data

                });
            }).catch(e => {
                console.log('There has been a problem with your fetch operation: ' + e.message);
            });
            this.setState({ district: district });
        }
    }


    handleSelectChange(e) {
        this.setState({ district: e.target.value });
    }
    handleVoteChange(id, votes, isQ) {
        if (isQ) {
            this.setState({
                questions: this.state.questions.map((q) => {
                    q.vote = q._id === id ? votes : q.vote;
                    return q;
                })
            })

        } else {
            this.setState({
                reviews: this.state.reviews.map((r) => {
                    r.vote = r._id === id ? votes : r.vote;
                    return r;
                })
            })
        }
    }
    sortArr(arr) {
        const mr = arr.sort((a, b) => {
            return b.vote - a.vote;
        })
        return mr;
    }
    handleGovTextChange(event, input) {
        this.setState({
            govText: input
        })


    }
    handleDistTextChange(event, input) {
        this.setState({
            disText: input
        })


    }
    handleGovInputChange(event, input) {
        this.setState({
            govInputValue: input
        })


    }
    handleDisInputChange(event, input) {
        this.setState({
            disInputValue: input
        })


    }








    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllCities().then(citiesArr => {
            this.setState({
                cities: citiesArr.data,
                isLoading: false,
            })
        }).catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
        });

        await api.getPlacesArray().then(placesArr => {
            this.setState({
                districts: placesArr.data,
                isLoading: false,
            })
        }).catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
        });
    }
    handleLang() {
        if (this.state.lang) {
            this.setState({
                lang: false
            })
        } else {
            this.setState({
                lang: true
            })
        }
    }
    render() {
        const { questions, reviews, lang, district } = this.state
        return (
            <div className="reviews-wrapper">
                <header>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
                    <NavBar lang={lang} handleLang={this.handleLang.bind(this)} />
                </header>
                <body>

                    {/* adding the list  */}
                    <div className="reviews-flex-container">
                        <AverageRates reviews={this.state.reviews} lang={lang} />
                        <div className="whole-list-container">
                            <div className="place-picker">
                                <div style={{ maxWidth: '50%', margin: "auto" }}>
                                    <Autocomplete
                                        size="small"
                                        value={this.state.govInputValue}
                                        onChange={(event, newValue) => {this.handleGovChange(event, newValue);}}
                                        inputValue={this.state.govText}
                                        onInputChange={(event, newInputValue) => {this.handleGovTextChange(event, newInputValue);}}
                                        options={this.state.cities.map((c) => { return { label: c.name, id: c._id } })}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label={lang ? "Governorate" : "المحافظه"} />}
                                    />
                                </div>
                                <div style={{ maxWidth: '50%', margin: "auto" }}>
                                    <Autocomplete
                                        size="small"
                                        value={this.state.disInputValue}
                                        onChange={(event, newValue) => {

                                            this.handleDistrictChange(event, newValue);
                                        }}
                                        inputValue={this.state.disText}
                                        onInputChange={(event, newInputValue) => {
                                            this.handleDistTextChange(event, newInputValue);
                                        }}
                                        // id="controllable-states-demo"
                                        options={this.state.districts.map((d) => { return { label: d.name, id: d._id, location: d.location } })}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label={lang ? "District" : "المكان"} />}
                                    />
                                </div>

                            </div>
                            <div className="list-container">
                                <IconLabelTabs lang={this.state.lang} handleTabChange={(newValue) => this.switchList(newValue)} />
                                <div className="list" >
                                    {(!this.state.isReview) ?
                                        (<div>
                                            {(questions && questions.length !== 0) ? (questions).map((q) => (
                                                <Question lang={this.state.lang} onVoteChange={(id, votes, isQ) => { this.handleVoteChange(id, votes, isQ) }} body={q.body} _id={q._id} vote={q.vote} date={q.date} replies={q.replies} />
                                            )) :
                                                (<div style={
                                                    {
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: '10px',
                                                        margin: '25px auto'
                                                    }}>


                                                    <img src={questions_logo} width="30%" height="30%" alt="question_logo"></img>

                                                    <p style={{ textAlign: "centre" }}> {lang ? "This place has no questions asked yet. " : "لا يوجد اسئلة حتى الان "} </p>
                                                </div>)
                                            }
                                        </div>) :
                                        (<div>
                                            {(reviews && reviews.length !== 0) ? (reviews).map((r) => (
                                                <Review lang={this.state.lang} onVoteChange={(id, votes, isQ) => { this.handleVoteChange(id, votes, isQ) }}
                                                    title={r.title} vote={r.vote}
                                                    body={r.body} _id={r._id} cleannes={r.cleanRating}
                                                    speed={r.speedRating} service={r.serviceRating}
                                                    rate={Math.round((r.cleanRating + r.speedRating + r.serviceRating) / 3)}
                                                    date={r.date} />
                                            )) :
                                                (<div style={
                                                    {
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: '10px',
                                                        margin: '25px auto'
                                                    }}>


                                                    <img src={rates_logo} width="30%" height="30%" alt="rate_logo"></img>

                                                    <p style={{ textAlign: "centre" }}> {lang ? "This place has no ratings yet." : "لا يوجد تقييمات حتى الان "} </p>
                                                </div>)
                                            }
                                        </div>)}
                                </div>

                            </div>
                            {this.state.district ? ((!this.state.isReview)
                                ?
                                <InputGroup>
                                    <FormControl
                                        value={this.state.qText}
                                        onChange={this.handleQuestChange.bind(this)}
                                        placeholder={lang ? "Type your question here ..." : "أكتب سؤالك هنا ..."}
                                    />
                                    <Button onClick={this.handleAddQuestion.bind(this)} variant="mbutton">{lang ? "Add question" : "أضف سؤال"}</Button>
                                </InputGroup>
                                :
                                <Button onClick={this.handleShowReview.bind(this)} variant="mbutton">{lang ? "Add review" : "أضف تقييم"}</Button>)
                                : ""
                            }
                        </div>
                        {this.state.district
                            ? (<div className="place-info">
                                <img src={guc} alt="place_img"></img>
                                <iframe src={district.location} allowFullScreen loading="lazy" title="place_location"/>
                            </div>)
                            : ""}
                    </div>

                    <Modal
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.show} onHide={this.handleCloseReview.bind(this)} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>{lang ? "Add review" : "أضف مراجعة"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <div className="add-review">


                                <InputGroup>
                                    <FormControl
                                        value={this.state.title}
                                        onChange={this.handleTitleChange.bind(this)}
                                        placeholder={lang ? "Review title..." : " عنوان المراجعة"}

                                    />
                                </InputGroup>
                                <br />
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Your Review</Form.Label>
                                    <Form.Control
                                        value={this.state.rText}
                                        as="textarea" rows={3}
                                        onChange={this.handleRevChange.bind(this)} />
                                </Form.Group>
                                <div className="rates-container" >
                                    <div>
                                        <Typography component="legend">Cleannes</Typography>
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
                                        <Typography component="legend">Speed</Typography>
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
                                        <Typography component="legend">Service</Typography>
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
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="mbutton" onClick={this.handleAddReview.bind(this)}>
                                ADD REVIEW
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* verification modal  */}
                    <Modal
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.showVerification} onHide={this.handleCloseVerification.bind(this)} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>

                            </Modal.Title>

                        </Modal.Header>
                        <Modal.Body>
                            <div className="flex-center">
                                <img src={verify_logo} width="30%" height="30%" alt="verify_logo"></img>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>VACCINATION ID:</Form.Label>
                                        <Form.Control type="text" minlength="20" maxlength="20"
                                            value={this.state.vacID}
                                            onChange={this.handleVacChange.bind(this)}
                                            placeholder="Enter your vaccine track ID" required />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>NATIONAL ID LAST 4 DIGITS:</Form.Label>
                                        <Form.Control type="text" pattern="4" minlength="4" maxlength="4"
                                            value={this.state.nationalID}
                                            onChange={this.handleNationalChange.bind(this)}
                                            placeholder="Enter your last 4 national ID number" />
                                        <Form.Text className="text-muted">
                                            We'll never store nor share your info with anyone else.
                                        </Form.Text>
                                        <p style={{ color: 'red' }} > {this.state.errorMsg}</p>
                                    </Form.Group>

                                </Form>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="mbutton" onClick={this.handleVerify.bind(this)}>
                                verify
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </body>
            </div>
        )
    }
}
