import React from 'react';
import PropTypes from 'prop-types';


export default class SearchResultItem extends React.Component {
    render() {
        return (
            <li>
                {this.props.country.id}: 
                {this.props.country.title}
            </li>
        );
    }
}

SearchResultItem.propTypes = {
    country: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
    }),
};
