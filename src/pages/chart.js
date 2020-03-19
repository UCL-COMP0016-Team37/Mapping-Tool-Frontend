import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'components/chart';
import extractSearchTerm from 'utils/extractSearchTerm';

export default class ChartPage extends React.Component {
    render() {
        const search = extractSearchTerm(this.props.location.search, 'search');
        return <Chart countryCode ={extractTerm(search,'recipient_country_code')} sectorCode = {extractTerm(search,'sector_code')}/>;
    }
}

function extractTerm(parameters,parameterKey){
    if (parameters === undefined) {
        return '';
    }
    const result = parameters.split('AND%20').find(parameter => {
        const key = parameter.split('%3A(')[0];
        return key === parameterKey;
    });
    if (result === undefined) {
        return '';
    }
    return result.split('%3A(')[1].slice(0,-1);
}

ChartPage.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string,
    }),
};
