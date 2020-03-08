import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Container, Col } from 'react-bootstrap';
import history from 'utils/history';

export default class Search extends React.Component {
    constructor(props){
        super(props);
        console.log('Test');
        this.searchInput = React.createRef();
        this.state = {
            search: props.searchTerm,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.searchInput.current.focus();
        }, 1);
    }

    setSearch() {
        // console.log(this.state.search);
        const searchterm = 'title_narrative%3A'+this.state.search+' OR description_narrative%3A' +this.state.search;
        history.push('/search-results/?search='+searchterm+'&page=1');
        this.props.onHide && this.props.onHide();
    }

    // advanced() {
    //     history.push('/search');
    // }

    handleChange(e) {
        this.setState({ search: e.target.value });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.setSearch();
        }
    }

    render() {
        return <Container className='advanced-search-container'>
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Control
                            as="input"
                            className="search-bar"
                            placeholder="Search..."
                            value={this.state.search}
                            onFocus={this.props.onFocus}
                            onChange={this.handleChange.bind(this)}
                            onKeyPress={this.handleKeyPress.bind(this)}
                            autoFocus
                            ref={this.searchInput}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Country</Form.Label>
                        <Form.Control as="select">
                            <option>All Countries</option>
                            <option>Russia</option>
                            <option>Cambodia</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Sector</Form.Label>
                        <Form.Control as="select">
                            <option>All Sectors</option>
                            <option>Health</option>
                            <option>Humanitarian</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit" className='search-button mx-2' onClick={this.setSearch.bind(this)}>Search</Button>
            </Form>
        </Container>;
    }
}

Search.propTypes = {
    searchTerm: PropTypes.string,
    onFocus: PropTypes.func,
    onHide: PropTypes.func,
};
