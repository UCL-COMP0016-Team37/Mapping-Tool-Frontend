import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'components/chart';
import extractSearchTerm from 'utils/extractSearchTerm';
import extractTerm from 'utils/extractTerm';

export default class ChartPage extends React.Component {
    render() {
        const search = extractSearchTerm(this.props.location.search, 'search');
        return <Chart searchTerm={search} countryCode ={extractTerm(search,'recipient_country_code')} sectorCode = {extractTerm(search,'sector_code')}/>;
    }
}

ChartPage.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string,
    }),
};
