import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Container, Col } from 'react-bootstrap';
import history from 'utils/history';
import API from '../../utils/backendApi';
import {sector} from '../../utils/sectorCode';

export default class Search extends React.Component {
    constructor(props){
        super(props);
        // console.log('Test');
        this.searchInput = React.createRef();
        this.state = {
            search: '',
            searchCountry: '',
            searchSector: null,
            country: [],
        };
        API.getCountry('').then((response) => {
            this.setState({country: response.data});
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.searchInput.current.focus();
        }, 1);
    }

    setSearch() {
        var first = true;
        var searchterm = '';
        if (this.state.search !== ''){
            searchterm = 'title_narrative%3A'+this.state.search+' OR description_narrative%3A' +this.state.search;
            first = false;
        }
        if (this.state.searchCountry !== ''){
            if (!first){
                searchterm = searchterm + 'AND%20';
            }
            else{first = false;}
            searchterm = searchterm + 'recipient_country_code%3A('+ this.state.searchCountry+')';
        }
        if (this.state.searchSector !== null){
            if (!first){
                searchterm = searchterm + 'AND%20';
            }
            else{first = false;}
            searchterm = searchterm + 'sector_code%3A('+ this.state.searchSector+')';
        }
        history.push('/search-results/?search='+searchterm+'&page=1');
        this.props.onHide && this.props.onHide();
    }

    handleChange(e) {
        this.setState({ search: e.target.value });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.setSearch();
        }
    }

    setcountry(e){
        // console.log(e.target.value);
        if (e.target.value !== 'All Countries'){
            const id = this.state.country.find(country => country.name === e.target.value);
            this.setState({searchCountry: id.code});
        }
        else{ this.setState({searchCountry: ''});}
    }

    setSector(e){
        if (e.target.value !== 'All Sectors'){
            const id = sector.find(sector => sector.name === e.target.value);
            this.setState({searchSector: id.code});
        }
        else{ this.setState({searchSector: null});}
    }
    render() {
        console.log(this.state.search);
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
                    <Form.Group as={Col} controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control as="select" onClick={this.setcountry.bind(this)}>
                            <option>All Countries</option>
                            {this.state.country.map(country => <option key={country.code}>{country.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Sector</Form.Label>
                        <Form.Control as="select" onClick={this.setSector.bind(this)}>
                            <option>All Sectors</option>
                            {sector.map(sector => <option key={sector.code}>{sector.name}</option>)}
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
