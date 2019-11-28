import React from 'react';
import { ReactBingmaps } from 'react-bingmaps';

export default class Page extends React.Component {
    render() {
        return <div className="page">
            <ReactBingmaps 
                bingmapKey = "[YourBingMapsKey]" > 
            </ReactBingmaps>
        </div>
    }
}