import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Row, Col } from 'react-bootstrap';

import API from 'utils/backendApi';
// import { formatMoney } from 'utils/formatting';

// function getNarrative(narrative) {
//     return narrative.narratives[0].text;
// }

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
            <h1>Title</h1>
            <h3>Reported By Reporter</h3>
            <h3>Organisations</h3>
            <h3>Locations</h3>
            <h4>Total Budget</h4>
            <h4>IATI Identifier</h4>
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