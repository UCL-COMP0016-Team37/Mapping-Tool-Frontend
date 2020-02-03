import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

import API from 'utils/backendApi';
import { formatMoney } from 'utils/formatting';

export default class projectPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {results: []};

        API.getProjects(this.props.searchTerm).then((response) => {
            this.setState({ results: response.data });
        });
    }

    render(){

        console.log(this.state.results);
        const results = this.state.results;
        return <Container fluid className="text-left">
            <h1>{results.projectName}</h1>
            <h3>{results.organization}</h3>
            <h3>{results.location}</h3>
            <h4>Budget {formatMoney(results.budgetNumeric, results.budgetCurrency)}</h4>
            <p>sector: {results.sectors}</p>
            <p>Start date: {results.startDate}</p>
            <p>End date: {results.endDate}</p>
            <p><a href={results.projectWebsite}>{results.projectWebsite}</a></p>
            <p>{results.projectDescription}</p>
            <p>Contact:</p>
            <p>Name: {results.projectContactPerson}</p>
            <p>Position: {results.projectContactPosition}</p>
            <p>Email: {results.projectContactEmail}</p>
        </Container>;
    }

}

projectPage.propTypes = {
    searchTerm: PropTypes.string,
};