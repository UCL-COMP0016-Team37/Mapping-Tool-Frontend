import React from 'react';

import { Button, InputGroup, FormControl } from 'react-bootstrap';

import './search.scss';
import history from 'utils/history';

export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
        };
    }
    
    setSearch() {
        history.push('/search-results/?value='+ this.state.search);
    }

    advanced() {
        history.push('/search');
    }

    handleChange(e) {
        this.setState({
            [e.target.value]: e.target.value,
        });
    }

    onChange(e){
        this.setState({ search: e.target.value });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.setSearch(e);
        }
    }
    
    render() {
        return (
            <InputGroup className="search">
                <FormControl
                    className="search-bar"
                    placeholder=""
                    value={this.state.search}
                    onChange={this.onChange.bind(this)} 
                    onKeyPress={this.handleKeyPress}
                />
                <InputGroup.Append>
                    <Button variant="primary" className='search-button' onClick={this.setSearch.bind(this)}>Search</Button>
                    <Button variant="secondary" className='advanced-search-button' onClick={this.advanced.bind(this)}>Advanced</Button>
                </InputGroup.Append>
            </InputGroup>
        );
    }
}