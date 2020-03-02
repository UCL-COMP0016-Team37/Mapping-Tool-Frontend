import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col, ButtonGroup, Table, Dropdown, Alert } from 'react-bootstrap';
import API from 'utils/backendApi';
import { formatMoney } from 'utils/formatting';
import Map from './locationMap';

const Divider = Dropdown.Divider;

function getNar(narrative, lang = 'en') {
    if (!narrative.narratives) {
        return '';
    }
    return narrative.narratives.find(item => item.language.code === lang).text;
}

function getNarArray(narrativeArray, lang = 'en') {
    return narrativeArray.map(item => getNar(item, lang));
}

function getMoney(value) {
    return formatMoney(value.value, value.currency.code);
}

function joinBR(array) {
    return array.map((j, i) => <div key={i}>{i === 0 || <br/>} {j}</div>);
}

function unique(array) {
    return array.filter((i, j) => array.indexOf(i) === j);
}

export default class projectPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {results: undefined, error: undefined};

        API.getProjects(this.props.id).then((response) => {
            console.log(response);
            this.setState({ results: response.data });
        }).catch((error) => {
            console.log(error.response);
            this.setState({ error: error.response });
        });
    }

    render() {
        const error = this.state.error;
        if (error !== undefined) {
            return <Container><Alert variant="danger">
                <Alert.Heading>
                    Backend Server Error: {error.data.error}
                </Alert.Heading>
                <p>
                    {error.data.message}
                </p>
            </Alert></Container>;
        }
        const results = this.state.results;
        if (results === undefined) {
            return <></>;
        }
        return <Container className="text-left">
            <Row>
                <Col>
                    {results.locations.length > 0 && <Map place={getNar(results.locations[0].name)}/>}
                </Col>
                <Col>
                    <h6>Title</h6>
                    <h5>{getNar(results.title)}</h5>
                    <Divider/>
                    <h6>Locations</h6>
                    <h5>{getNarArray(results.locations.map(item => item.name)).join(', ')}</h5>
                    <Divider/>
                    <h6>Reported By</h6>
                    <h5>{getNar(results.reporting_org)}</h5>
                    <Divider/>
                    <h6>Organisations</h6>
                    <h5>{joinBR(unique(getNarArray(results.participating_organisations)))}</h5>
                    <Divider/>
                    <h6>Budget</h6>
                    <h5>{joinBR(results.budgets.map(item => getMoney(item.value)))}</h5>
                    <Divider/>
                    <h6>Identifier</h6>
                    <Button variant="link" to={`/project-page/${results.iati_identifier}`} as={Link}><h5>{results.iati_identifier}</h5></Button>
                </Col>
            </Row>

            <div className="d-flex flex-column">
                <ButtonGroup className="mt-3">
                    <Button variant="link" href="#overview">Overview</Button>
                    <Button variant="link" href="#locations">Locations</Button>
                    <Button variant="link" href="#budgets">Budgets</Button>
                    <Button variant="link" href="#transactions">Transactions</Button>
                </ButtonGroup>
            </div>
            <div id="overview">
                <h4>Overview</h4>
            </div>
            {getNarArray(results.descriptions).map((i, j) => <p key={j}>{i}</p>)}
            <Row className="text-center"><Col>Start Date</Col><Col>End Date</Col></Row>

            <div id="locations">
                <h4>Locations</h4>
                {results.locations.map((item, i) =>
                    <div key={i}>
                        <h6>{getNar(item.name)}</h6>
                        {getNar(item.description)}
                        <Divider/>
                    </div>,
                )}
            </div>

            <div id="budgets">
                <h4>Budgets</h4>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.budgets.map((item, i) =>
                            <tr key={i}>
                                <td>{item.type.name}</td>
                                <td>{item.period_start}</td>
                                <td>{item.period_end}</td>
                                <td>{getMoney(item.value)}</td>
                            </tr>,
                        )}
                    </tbody>
                </Table>
            </div>

            <div id="transactions">
                <h4>Transactions</h4>
            </div>
        </Container>;
    }

}

projectPage.propTypes = {
    id: PropTypes.string,
};