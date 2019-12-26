import React from 'react';
import Logo from './logo';

import './navbar.scss';
import Search from 'components/search';

export default class Navbar extends React.Component {
    render() {
        return <div className='navbar'>
            <Logo/>
            <Search/>
        </div>;
    }
}
