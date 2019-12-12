import React from 'react';

export default class SearchResultsPage extends React.Component {
    render() {
        return <div>You searched for: <b>{this.props.location.search.split("=")[1].split("&")[0]}</b></div>;
    }
}

