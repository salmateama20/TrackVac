import React, { Component } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Form from 'react-bootstrap/Form'
export default class Dropdown extends Component {
    state = {
        governorate: ""
    }
    handleChange() {

    }
    render() {
        const { cities } = this.props
        console.log(cities.data)
        return (
            <div style={{ width: '25%' }}>
                <label for={this.props.label}>{this.props.label}</label>
                <Form.Select >

                    {cities.data ? (cities.data).map((c) => (
                        <option value={c._id}> {c.name} </option>
                    )) : ""
                    }
                </Form.Select>
            </div>
        )
    }
}