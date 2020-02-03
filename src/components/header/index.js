import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Search from 'components/search';

import extractSearchTerm from 'utils/extractSearchTerm';

import './header.scss';

export default class Header extends React.Component {
    render() {
        return <Navbar>
            <LinkContainer to="/">
                <Navbar.Brand className="logo-title">
                    ANCSSC Mapping Tool
                </Navbar.Brand>
            </LinkContainer>
            <Nav variant="pills">
                <Nav.Item>
                    <LinkContainer to="/top-100">
                        <Nav.Link>Top 100</Nav.Link>
                    </LinkContainer>
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
