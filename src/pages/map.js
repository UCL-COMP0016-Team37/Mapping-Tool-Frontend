import React from 'react';
import Map from '../components/map/heatmap';

export default class MapPage extends React.Component {
    render() {
        return <div className="page">
            <Map/>
        </div>;
    }
}