import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Row, Col, ButtonGroup, Dropdown } from 'react-bootstrap';

import API from 'utils/backendApi';
import { formatMoney } from 'utils/formatting';


function getNar(narrative, lang = 'en') {
    if (!narrative.narratives) {
        return '';
    }
    return narrative.narratives.find(item => item.language.code == lang).text;
}

function getNarArray(narrativeArray, lang = 'en') {
    return narrativeArray.map(item => getNar(item, lang));
}

function getMoney(value) {
    return formatMoney(value.value, value.currency.code);
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
        return <Container className="text-left">
            <h6>Title</h6>
            <h4>{getNar(results.title)}</h4>
            <Dropdown.Divider/>
            <h6>Locations</h6>
            <h4>{getNarArray(results.locations.map(item => item.name)).join(', ')}</h4>
            <Dropdown.Divider/>
            <h6>Reported By</h6>
            <h4>{getNar(results.reporting_org)}</h4>
            <Dropdown.Divider/>
            <h6>Organisations</h6>
            <h4>{getNarArray(results.participating_organisations).join(', ')}</h4>
            <Dropdown.Divider/>
            <h6>Budget</h6>
            <h4>{results.budgets.map(item => getMoney(item.value)).join(', ')}</h4>
            <Dropdown.Divider/>
            <h6>Identifier</h6>
            <h4>{results.iati_identifier}</h4>

            <div className="d-flex flex-column">
                <ButtonGroup className="mt-3">
                    <Button variant="link">Overview</Button>
                    <Button variant="link">Budgets</Button>
                    <Button variant="link">Transactions</Button>
                </ButtonGroup>
            </div>
            <h2>Overview</h2>
            {getNarArray(results.descriptions).map((i, j) => <p key={j}>{i}</p>)}
            <p>Sectors: </p>
            <Row className="text-center"><Col>Start Date</Col><Col>End Date</Col></Row>
            <p><Button variant="primary">Project Website</Button></p>
            <p>Project Description</p>
            <p>Contact:</p>
            <p>Name:</p>
            <p>Position:</p>
            <p>Email:</p>
        </Container>;
    }

}

projectPage.propTypes = {
    searchTerm: PropTypes.string,
};