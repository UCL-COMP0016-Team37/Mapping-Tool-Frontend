import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Search from 'components/search';

import extractSearchTerm from 'utils/extractSearchTerm';

import './header.scss';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchOpen: false,
        };
    }

    handleStartSearching() {
        this.setState({ searchOpen: true });
    }

    render() {
        return <>
            <Navbar>
                <LinkContainer to="/">
                    <Navbar.Brand className="logo-title">
                        ANCSSC Mapping Tool
                    </Navbar.Brand>
                </LinkContainer>
                <Nav>
                    <Nav.Item>
                        <LinkContainer to="/top-100">
                            <Nav.Link>Top 100</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/search">Filter Data</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Nav className='mr-auto'></Nav>
                <Search onFocus={this.handleStartSearching.bind(this)} searchTerm={extractSearchTerm(this.props.location.search, 'search')}/>
            </Navbar>
            {this.state.searchOpen && <Container fluid>Advanced filter</Container>}
        </>;
    }
}

Header.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string,
    }),
};
