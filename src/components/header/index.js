import React from 'react';

import { Navbar, Nav, Form } from 'react-bootstrap';

import Search from 'components/search';
import Logo from './logo';
import './navbar.scss';

export default class Header extends React.Component {
    render() {
        return <Navbar>
            <Navbar.Brand href="/">
                <Logo/>
            </Navbar.Brand>
            <Nav className='mr-auto'></Nav>
            <Form inline>
                <Search/>
            </Form>
        </Navbar>;
    }
}