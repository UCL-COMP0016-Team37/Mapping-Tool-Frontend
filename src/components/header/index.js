import React from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';

import Search from 'components/search';
import './header.scss';

export default class Header extends React.Component {
    render() {
        return <Navbar>
            <Navbar.Brand className="logo-title" href="/">
                ANCSSC Mapping Tool
            </Navbar.Brand>
            <Nav className='mr-auto'></Nav>
            <Form inline>
                <Search/>
            </Form>
        </Navbar>;
    }
}
