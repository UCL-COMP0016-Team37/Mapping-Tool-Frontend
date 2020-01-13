import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';


export default class SearchResultItem extends React.Component {
    render() {
        return (
            <ListGroup.Item>
                {this.props.country.id}: 
                {this.props.country.title}
            </ListGroup.Item>
        );
    }
}

SearchResultItem.propTypes = {
    country: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
    }),
};
