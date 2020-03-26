import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col, Table, Dropdown, Alert } from 'react-bootstrap';
import API from 'utils/backendApi';
import { formatMoney } from 'utils/formatting';
import Map from './locationMap';
import './projectPage.scss';

const Divider = Dropdown.Divider;

function getNar(narrative, lang = 'en') {
    if (!narrative.narratives || narrative.narratives.length === 0) {
        return '';
    }
    const nar = narrative.narratives.find(item => item.language.code === lang);
    if (nar === undefined) {
        return narrative.narratives[0].text;
    }
    return nar.text;
}

function getNarArray(narrativeArray, lang = 'en') {
    return narrativeArray.map(item => getNar(item, lang));
}

function getMoney(value) {
    return formatMoney(value.value, value.currency.code);
}

function joinBR(array) {
    return array.map((j, i) => {
        return <div key={i}>{i === 0 || <br/>} {j}</div>;
    });
}

function unique(array) {
    return array.filter((i, j) => array.indexOf(i) === j);
}

function mapOr(array, func, otherwise) {
    if (array === undefined || array.length === 0)
        return otherwise;
    return array.map(func);
}

function errorWrapper(func, otherwise='') {
    try {
        return func();
    } catch (error) {
        return otherwise;
    }
}

export default class ProjectPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {results: undefined, error: undefined, id:undefined};

        this.getdata();
    }

    getdata(){
        API.getProjects(this.props.id).then((response) => {
            console.log(response);
            this.setState({ results: response.data });
        }).catch((error) => {
            console.log(error.response);
            this.setState({ error: error.response });
        });

        API.getTransactions(this.props.id).then((response) => {
            console.log(response);
            this.setState({ transactionResults: response.data });
        }).catch((error) => {
            console.log(error.response);
            this.setState({ transactionError: error.response});
        });
    }

    componentDidUpdate(){
        if (this.props.id !== this.state.id){
            this.getdata();
            this.setState({id:this.props.id});
        }
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
        const overview = <>
            <h6>Title</h6>
            <h5>{getNar(results.title)}</h5>
            <Divider/>
            <h6>Locations</h6>
            <h5>{getNarArray(results.locations.map(item => item.name).filter(Boolean)).join(', ')}</h5>
            <Divider/>
            <h6>Reported By</h6>
            <h5>{getNar(results.reporting_org)}</h5>
            <Divider/>
            <h6>Organisations</h6>
            <h5>{joinBR(unique(getNarArray(results.participating_organisations)))}</h5>
            <Divider/>
            <h6>Budget</h6>
            <h5>{results.budgets.map(item => getMoney(item.value)).join(', ')}</h5>
            <Divider/>
            <h6>Identifier</h6>
            <Button variant="link" to={`/project-page/${results.iati_identifier}`} as={Link}><h5>{results.iati_identifier}</h5></Button>
        </>;
        return <Container className="text-left">
            <div className="section">
                {results.locations.length > 0 && results.locations[0].name ?
                    <Row>
                        <Col>
                            <Map place={getNar(results.locations[0].name)}/>
                        </Col>
                        <Col>
                            {overview}
                        </Col>
                    </Row>
                    : overview
                }
            </div>

            <Divider/>

            <div id="overview" className="section">
                <h4>Overview</h4>
                {getNarArray(results.descriptions).map((i, j) => <p key={j}>{i}</p>)}
                <Row className="text-center">
                    {results.activity_dates.reverse().map(el => <Col key={el.type.name}>{el.type.name}</Col>)}
                </Row>
                <Row className="text-center">
                    {results.activity_dates.reverse().map(el => <Col key={el.type.name}>{el.iso_date}</Col>)}
                </Row>
            </div>
            <Divider/>

            <div id="locations" className="section">
                <h4>Locations</h4>
                {mapOr(results.locations.filter(item => item.name), (item, i) =>
                    <div key={i}>
                        <h6>{getNar(item.name)}</h6>
                        <Divider/>
                    </div>,
                'There are no locations.',
                )}
            </div>

            <Divider/>

            <div id="budgets" className="section">
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
                        {mapOr(results.budgets, (item, i) =>
                            <tr key={i}>
                                <td>{errorWrapper(() => item.type.name)}</td>
                                <td>{errorWrapper(() => item.period_start)}</td>
                                <td>{errorWrapper(() => item.period_end)}</td>
                                <td>{errorWrapper(() => getMoney(item.value))}</td>
                            </tr>,
                        'There are no budgets',
                        )}
                    </tbody>
                </Table>
            </div>

            <Divider/>

            <div id="transactions" className="section">
                <h4>Transactions</h4>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Finance Type</th>
                            <th>Tied Status</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mapOr(this.state.transactionResults, (transaction, i) =>
                            <tr key={i}>
                                <td>{errorWrapper(() => transaction.transaction_date)}</td>
                                <td>{errorWrapper(() => transaction.transaction_type.name)}</td>
                                <td>{errorWrapper(() => transaction.finance_type.name)}</td>
                                <td>{errorWrapper(() => transaction.tied_status.name)}</td>
                                <td>{getMoney(transaction)}</td>
                            </tr>,
                        'There are no transactions.')}
                    </tbody>
                </Table>
            </div>

            <Divider/>

            <div id="related" className="section">
                <h4>Related Activities</h4>
                {mapOr(results.related_activities, el => <Button key={el.ref} variant="link" to={`/project-page/${el.ref}`} as={Link}>{el.ref}</Button>, 'There are no related activities')}
            </div>
        </Container>;
    }

}

ProjectPage.propTypes = {
    id: PropTypes.string,
};