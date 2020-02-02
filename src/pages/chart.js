import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'components/chart';
import extractSearchTerm from 'utils/extractSearchTerm';

export default class ChartPage extends React.Component {
    render() {
        return <Chart searchTerm={extractSearchTerm(this.props.location.search, 'search')}/>;
    }
}

ChartPage.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string,
    }),
};
