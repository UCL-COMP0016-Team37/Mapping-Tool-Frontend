import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Container } from 'react-bootstrap';
import history from 'utils/history';

export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search: props.searchTerm,
        };
    }

    setSearch() {
        // console.log(this.state.search);
        history.push('/search-results/?search='+ this.state.search);
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
        return <Container className='search-container'>
            <Form.Control
                className="search-bar"
                placeholder="Search..."
                value={this.state.search}
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
            />
<<<<<<< HEAD
            <Button variant="outline-primary" type="submit" className='search-button mx-2' onClick={this.setSearch.bind(this)}>Search</Button>
            <Button variant="outline-secondary" className='advanced-search-button' onClick={this.advanced.bind(this)}>Advanced</Button>
=======
            <Button variant="primary" type="submit" className='search-button mx-2' onClick={this.setSearch.bind(this)}>Search</Button>
            {/* <Button variant="secondary" className='advanced-search-button' onClick={this.advanced.bind(this)}>Advanced</Button> */}
>>>>>>> map-gl-version
        </Container>;
    }
}

Search.propTypes = {
    searchTerm: PropTypes.string,
};
