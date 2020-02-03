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
            <Nav variant="pills">
                <Nav.Item>
                    <Nav.Link href="/top-100">Top 100</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/search">Filter Data</Nav.Link>
                </Nav.Item>
            </Nav>
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
