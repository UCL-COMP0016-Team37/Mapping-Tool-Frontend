import React from 'react';
import PropTypes from 'prop-types';
import extractSearchTerm from 'utils/extractSearchTerm';
import Top100 from '../components/top100';

export default class Top100Page extends React.Component {
    render() {
        return <Top100 searchTerm={extractSearchTerm(this.props.location.search, 'page')}/>;
    }
}

Top100Page.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string,
    }),
};
