import React from 'react';
import SearchResult from 'components/searchResult';
import PropTypes from 'prop-types';
import extractTerm from '../utils/extractTerm';

import extractSearchTerm from 'utils/extractSearchTerm';

export default class SearchResultsPage extends React.Component {
    render() {
        const search = extractSearchTerm(this.props.location.search, 'search');
        return <SearchResult
            searchTerm={search}
            page={extractSearchTerm(this.props.location.search, 'page')}
            countryCode ={extractTerm(search,'recipient_country_code')} 
            sectorCode = {extractTerm(search,'sector_code')}
        />;
    }
}

SearchResultsPage.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string,
    }),
};

