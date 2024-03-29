import React from 'react';
import PropTypes from 'prop-types';
import extractSearchTerm from 'utils/extractSearchTerm';
import Map from '../components/map/pinMap';

export default class LocationPage extends React.Component {
    render() {
        return <div className="page">
            {/* {console.log(this.props)} */}
            <Map searchTerm={extractSearchTerm(this.props.location.search, 'location')} pathname={this.props.location.pathname} mapStyle='mapbox://styles/mapbox/dark-v10'/>
        </div>;
    }
}

LocationPage.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string,
        pathname: PropTypes.string,
    }),
};
