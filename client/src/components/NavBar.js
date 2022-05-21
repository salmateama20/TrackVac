import React, { Component } from 'react'
import white_logo from './white-png.png';
import LanguageIcon from '@mui/icons-material/Language';
export default class NavBar extends Component {

    render() {
        const { lang } = this.props
        return (
            <div className="topnav">
                <div className="logo-nav">
                    <a href="http://localhost:3000/trackvac-api/home">
                        <img href="http://localhost:3000/trackvac-api/home" src={white_logo} alt="TrackVac logo" width="150rem" />
                    </a>
                </div>
                <div className="links">
                    <a href="http://localhost:3000/trackvac-api/home">
                        Home
                    </a>
                    <a className="active" href="/trackvac-api/reviews">Reviews</a>
                    <div onClick={this.props.handleLang} className="lang-btn">
                        <LanguageIcon style={{ width: '25px', height: '25px' }} />
                        <div style={{ display: 'flex', gap: '2px' }}>
                            <p style={{ color: lang ? 'white' : 'rgb(209, 209, 209)' }} >ENG </p>
                            <p> | </p>
                            <p style={{ color: !lang ? 'white' : 'rgb(209, 209, 209)' }} > عربى</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}