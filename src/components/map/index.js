import React from 'react';
import { ReactBingmaps } from 'react-bingmaps';

import mapData from './data/mapData'
import API_KEY from '../../utils/bingMaps';
import './map.scss';

export default class Map extends React.Component {
    callBackMethod() {
        console.log('test');
    }    

    render() {
        // const hello = mapData.map((item) => infoboxesWithPushPins= {item})
        return <div className="map-container">
            <ReactBingmaps 
                bingmapKey={API_KEY}
                // center={[13.0827, 80.2707]}
                zoom={-10}
                infoboxesWithPushPins = {mapData}
            />
            </div>;
    }
}