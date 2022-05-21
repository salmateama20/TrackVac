import React, { Component } from 'react'
import { Rating } from "@material-ui/lab";
import star from './star.svg';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default class AverageRates extends Component {
    state = {

    }
    calculateAverage() {
        let average = 0;
        const { reviews } = this.props
        reviews.forEach(r => average += r.rate);
        average = Math.round(average / reviews.length);
        return reviews ? average : 0;
    }
    calculateNum(n) {
        let c = 0;
        const { reviews } = this.props
        reviews.map(r => r.rate === n ? c++ : '');
        return reviews ? Math.round(c * 100 / reviews.length) : 0;
    }
    render() {
        const { lang } = this.props
        return (
            <div className="average-rates">
                <h2>{lang ? "Average rates" : "متوسط التقييمات"}</h2>
                <h3>{this.calculateAverage() ? this.calculateAverage() : 0}</h3>
                <Rating name="read-only" value={this.calculateAverage() ? this.calculateAverage() : 0} readOnly />
                {lang ? (<h4>{this.props.reviews.length} ratings</h4>)
                    : (<h4>تقييمات {this.props.reviews.length}</h4>)

                }
                <div className="rate-bar">
                    <p>5</p>
                    <img src={star} width="5%" height="5%" alt="star"></img>


                    <ProgressBar className="progressBar" variant="warning" now={this.calculateNum(5) || 0} label={`${this.calculateNum(5)}`} />

                </div>
                <div className="rate-bar">
                    <p>4</p>
                    <img src={star} width="5%" height="5%" alt="star"></img>

                    <ProgressBar className="progressBar" variant="warning" now={this.calculateNum(4) || 0} label={`${this.calculateNum(4)}`} />
                </div>
                <div className="rate-bar">
                    <p>3</p>
                    <img src={star} width="5%" height="5%" alt="star"></img>
                    <ProgressBar className="progressBar" variant="warning" now={this.calculateNum(3) || 0} label={`${this.calculateNum(3)}`} />
                </div>
                <div className="rate-bar">
                    <p>2</p>
                    <img src={star} width="5%" height="5%" alt="star"></img>
                    <ProgressBar className="progressBar" variant="warning" now={this.calculateNum(2) || 0} label={`${this.calculateNum(2)}`} />
                </div>
                <div className="rate-bar">
                    <p>1</p>
                    <img src={star} width="5%" height="5%" alt="star"></img>
                    <ProgressBar className="progressBar" variant="warning" now={this.calculateNum(1) || 0} label={`${this.calculateNum(1)}`} />
                </div>



            </div >
        )
    }
}
