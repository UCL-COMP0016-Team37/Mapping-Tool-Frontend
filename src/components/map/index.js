import React from 'react';
import { ReactBingmaps } from 'react-bingmaps';

import API_KEY from '../../utils/bingMaps';
import './map.scss';

export default class Map extends React.Component {
    callBackMethod() {
        console.log('test');
    }

    render() {
        return <div className="map-container">
            <ReactBingmaps 
                bingmapKey={API_KEY}
                center={[13.0827, 80.2707]}
                pushPins = {[
                    {
                        "location":[13.0827, 80.2707],
                        "option":{ color: 'red' },
                        "addHandler": {"type" : "click", callback: this.callBackMethod }
                    }
                ]}
            />
            </div>;
    }
}