import React from 'react';
// import Map from 'components/map';
import Map from 'components/map/fundingFlow';

export default class MapPage extends React.Component {
    render() {
        return <div className="page">
            <Map/>
        </div>;
    }
}