import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Row, Col, ButtonGroup, Dropdown } from 'react-bootstrap';

import API from 'utils/backendApi';
import { formatMoney } from 'utils/formatting';
import { Link } from 'react-router-dom';


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

function joinBR(array) {
    return array.map((j, i) => {
        return <>{i == 0 || <br/>} {j}</>;
    });
}

function unique(array) {
    return array.filter((i, j) => array.indexOf(i) == j);
}

export default class projectPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {results: undefined};

        API.getProjects(this.props.id).then((response) => {
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
            <Row>
                <Col>

                </Col>
                <Col>
                    <h6>Title</h6>
                    <h5>{getNar(results.title)}</h5>
                    <Dropdown.Divider/>
                    <h6>Locations</h6>
                    <h5>{getNarArray(results.locations.map(item => item.name)).join(', ')}</h5>
                    <Dropdown.Divider/>
                    <h6>Reported By</h6>
                    <h5>{getNar(results.reporting_org)}</h5>
                    <Dropdown.Divider/>
                    <h6>Organisations</h6>
                    <h5>{joinBR(unique(getNarArray(results.participating_organisations)))}</h5>
                    <Dropdown.Divider/>
                    <h6>Budget</h6>
                    <h5>{joinBR(results.budgets.map(item => getMoney(item.value)))}</h5>
                    <Dropdown.Divider/>
                    <h6>Identifier</h6>
                    <Button variant="link" to={`/project-page/${results.iati_identifier}`} as={Link}><h5>{results.iati_identifier}</h5></Button>
                </Col>
            </Row>

            <div className="d-flex flex-column">
                <ButtonGroup className="mt-3">
                    <Button variant="link" href="#overview">Overview</Button>
                    <Button variant="link">Budgets</Button>
                    <Button variant="link">Transactions</Button>
                </ButtonGroup>
            </div>
            <div id="overview">
                <h2>Overview</h2>
            </div>
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
    id: PropTypes.string,
};