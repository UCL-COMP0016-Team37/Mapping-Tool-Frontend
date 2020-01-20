import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav} from 'react-bootstrap';

import Search from 'components/search';

import extractSearchTerm from 'utils/extractSearchTerm';

import './header.scss';

export default class Header extends React.Component {
    render() {
        return <Navbar>
            <Navbar.Brand className="logo-title" href="/">
                ANCSSC Mapping Tool
            </Navbar.Brand>
            <Nav className='mr-auto'></Nav>
            <Search searchTerm={extractSearchTerm(this.props.location.search, 'search')}/>
        </Navbar>;
    }
}

Header.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string,
    }),
};
