import React from 'react';
import extractSearchTerm from 'utils/extractSearchTerm';
import Map from '../components/map'

export default class LocationPage extends React.Component {
    render() {
        return <div className="page">
            {/* {console.log(this.props)} */}
            <Map searchTerm={extractSearchTerm(this.props.location.search, 'location')} pathname={this.props.location.pathname}/>
        </div>;
    }
}