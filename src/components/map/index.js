import React from 'react';
import { ReactBingmaps } from 'react-bingmaps';

import API_KEY from '../../utils/bingMaps';

export default class Map extends React.Component {
    callBackMethod() {
        console.log('test');
    }

    render() {
        return <ReactBingmaps 
                bingmapKey={API_KEY}
                center={[0, 0]}
                pushPins = {
                    [
                      {
                        "location":[13.0827, 80.2707],
                        "option":{ color: 'red' },
                        "addHandler": {"type" : "click", callback: this.callBackMethod }
                      }
                    ]
                  }
            />;
    }
}