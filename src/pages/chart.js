import React from 'react';
import Chart from 'components/chart';
import extractSearchTerm from 'utils/extractSearchTerm';

export default class ChartPage extends React.Component {
    render() {
        return (<Chart searchTerm={extractSearchTerm(this.props.location.search, 'search')}/>);
    }
}

