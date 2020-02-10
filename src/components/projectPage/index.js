import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

import API from 'utils/backendApi';
import { formatMoney } from 'utils/formatting';

function getNarrative(narrative) {
    return narrative.narratives[0].text;
}

export default class projectPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {results: undefined};

        API.getProjects(this.props.searchTerm).then((response) => {
            this.setState({ results: response.data });
        });
    }

    render() {

        console.log(this.state.results);
        const results = this.state.results;
        if (results === undefined) {
            return <></>;
        }
        return <Container fluid className="text-left">
            <h1>{getNarrative(results.title)}</h1>
            <h3>{results.participating_organisations.map(getNarrative).join(', ')}</h3>
            <h3>{results.locations.map(location => getNarrative(location.name)).join(', ')}</h3>
            <h4>Budget {results.budgets.map(budget => formatMoney(budget.value.value, budget.value.currency.code)).join(', ')}</h4>
            <h4>{results.iati_identifier}</h4>
            <p>sector: {results.sectors[0].sector.name}</p>
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