import React from 'react';
import { NavLink } from 'react-router-dom';

import './header.scss';

export default class Header extends React.Component{
    render() {
        return <NavLink className='header-title' to='/'><h1>ANCSSC Mapping Tool</h1></NavLink>;
    }
}
