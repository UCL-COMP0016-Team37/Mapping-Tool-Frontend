import React from 'react';

import './search.scss';
import history from 'utils/history';

export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
        };
    }
    
    setSearch(){
        history.push('/search-results/?value='+ this.state.search);
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
            <div className="search">
                <input
                    className="search-bar"
                    placeholder="Search Input Here"
                    value={this.state.search}
                    onChange={this.onChange.bind(this)} 
                    onKeyPress={this.handleKeyPress}
                ></input>
                <button className="search-button" onClick={this.setSearch.bind(this)}>Search</button>
                <button className='advanced-search-button'>Advanced</button>
            </div>
        );
    }
}