import React from 'react';
import { ReactBingmaps } from 'react-bingmaps';

import API_KEY from '../../utils/bingMaps';

export default class Map extends React.Component {
    render() {
        return <ReactBingmaps 
                bingmapKey={API_KEY}
                center={[13.0827, 80.2707]}
            />;
    }
}