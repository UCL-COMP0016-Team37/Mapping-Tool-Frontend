import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Logo extends React.Component{
    render() {
        return <NavLink className='logo-title' to='/'>
            <h1>ANCSSC Mapping Tool</h1>
        </NavLink>;
    }
}
