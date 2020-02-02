import React from 'react';
import PropTypes from 'prop-types';
import API from 'utils/backendApi';

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
        return <>
            <h1>{this.state.results.projectName}</h1>
            <h3>{this.state.results.organization}</h3>
            <h3>{this.state.results.location}</h3>
            <p>sector: {this.state.results.sectors}</p>
            <p>Start date: {this.state.results.startDate}</p>
            <p>End date: {this.state.results.endDate}</p>
            <p><a href={this.state.results.projectWebsite}>{this.state.results.projectWebsite}</a></p>
            <p>{this.state.results.projectDescription}</p>
            <p>contact:</p>
            <p>name: {this.state.results.projectContactPerson}</p>
            <p>position: {this.state.results.projectContactPosition}</p>
            <p>email: {this.state.results.projectContactEmail}</p>    
        </>;
    }
    
}

projectPage.propTypes = {
    searchTerm: PropTypes.string,
};