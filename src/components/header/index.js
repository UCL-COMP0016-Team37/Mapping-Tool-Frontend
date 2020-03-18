import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Form, Container, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Search from 'components/search';

import extractSearchTerm from 'utils/extractSearchTerm';

import './header.scss';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.search = React.createRef();
        this.state = {
            searchOpen: false,
        };
    }

    handleStartSearching() {
        this.setState({ searchOpen: true });
        this.search.current.blur();
    }

    handleStopSearching() {
        this.setState({ searchOpen: false });
        this.search.current.blur();
    }

    render() {
        return <>
            <Navbar className="navbar" variant="dark" bg="primary">
                <LinkContainer to="/">
                    <Navbar.Brand className="logo-title">
                        ANCSSC Mapping Tool
                    </Navbar.Brand>
                </LinkContainer>
                <Nav>
                    <Nav.Item>
                        <LinkContainer to="/top-100/?page=1">
                            <Nav.Link>Top 100</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/help">Help</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Nav className='mr-auto'></Nav>
                <Container className="search-container">
                    <Form.Control
                        className="search-bar"
                        placeholder="Search..."
                        value={extractSearchTerm(this.props.location.search, 'search')}
                        onClick={this.handleStartSearching.bind(this)}
                        onChange={() => {}}
                        ref={this.search}
                    />
                </Container>
            </Navbar>
            <Modal size="lg" show={this.state.searchOpen} onHide={this.handleStopSearching.bind(this)} enforceFocus={false}>
                <Modal.Body>
                    <Search onHide={this.handleStopSearching.bind(this)} searchTerm={extractSearchTerm(this.props.location.search, 'search')}/>
                </Modal.Body>
            </Modal>
        </>;
    }
}

Header.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string,
    }),
};
