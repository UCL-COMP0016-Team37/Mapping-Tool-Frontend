// from https://github.com/uber/react-map-gl/blob/5.2-release/examples/controls/src/pins.js

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-map-gl';
import PinImage from 'assets/images/red-white.png';
import './map.scss';

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default class Pins extends PureComponent {


    render() {
        const {data,onMouseOver,onMouseLeave,onClick} = this.props;
        // console.log(data);
        return data.map(data =>
            <Marker key={`marker-${data.index}`} longitude={data.longitude} latitude={data.latitude}>
<<<<<<< HEAD
                <div className="image-container"
                    onMouseOver={() => onMouseOver(data)}
                    onMouseOut ={() => onMouseLeave()}
                    onClick ={() => onClick(data.city)}>
                    <img src={PinImage} width="25" height="25"/>
=======
                <div className="image-container">
                    <img src={require('../../utils/images/white-white.png')} width="25" height="25" 
                        onMouseOver={() => onMouseOver(data)} 
                        onMouseOut ={() => onMouseLeave()}
                        onClick ={() => onClick(data.city)}/>
>>>>>>> map-gl-version
                    <div className="image-marker">{data.description}</div>
                </div>
            </Marker>,
        );
    }
}

Pins.propTypes = {
    data: PropTypes.any,
    onMouseOver: PropTypes.any,
    onClick: PropTypes.any,
    onMouseLeave: PropTypes.any,
};
