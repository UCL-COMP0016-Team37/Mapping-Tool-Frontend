import React from 'react';
import extractSearchTerm from 'utils/extractSearchTerm';
import LocationMap from '../components/location'

export default class LocationPage extends React.Component {
    render() {
        return <div className="page">
            <LocationMap searchTerm={extractSearchTerm(this.props.location.search, 'location')}/>
        </div>;
    }
}