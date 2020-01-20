import React from 'react';
import SearchResult from 'components/searchResult';
import PropTypes from 'prop-types';

import extractSearchTerm from 'utils/extractSearchTerm';

export default class SearchResultsPage extends React.Component {
    render() {
        return (<SearchResult searchTerm={extractSearchTerm(this.props.location.search, 'search')}/>);
    }
}

SearchResultsPage.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string,
    }),
};

