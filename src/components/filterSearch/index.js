import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';

import './filterSearch.scss';
import history from 'utils/history';

export default class filterSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: '',
            sector: '',
            startYear: '1990',
            endYear: '1990',
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    handleSubmit(){
        history.push(
            '/search-results/?country='+ this.state.country +
            '&sector=' + this.state.sector + 
            '&start=' + this.state.startYear +
            '&end=' + this.state.endYear,
        );
    }

    render() {
        const years = [1990,1991,1992,1993,2000,2018,2019,2020];
        const yearsOptions = years.map(year=> <option key={year} value={year}>{year}</option>);
        return(
            <div className="form">
                <Form onSubmit={e=> this.handleSubmit(e)}>
                    <Form.Group controlId="country">
                        <Form.Label>Recipient country: </Form.Label>
                        <Form.Control type="text" name="country" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="sector">
                        <Form.Label>Sector:</Form.Label>
                        <Form.Control type="text" name="sector" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="startYear">
                            <Form.Label>Start Year</Form.Label>
                            <Form.Control as="select" name="startYear" onChange={this.handleChange}>
                                {yearsOptions}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="endYear">
                            <Form.Label>End Year</Form.Label>
                            <Form.Control as="select" name="endYear" onChange={this.handleChange}>
                                {yearsOptions}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit">Search</Button>
                </Form>
            </div>
        ) ;
    }
}