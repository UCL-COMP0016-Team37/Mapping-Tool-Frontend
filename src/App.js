import React from 'react';
import {
    Router,
    Switch,
    Route,
} from 'react-router-dom';

import Map from 'pages/map';
import Data from 'pages/data';
import SearchResults from 'pages/searchResults';
import Search from 'components/search';
import Header from 'components/navbar/header';
import FilterSearch from './components/filterSearch';
import MyTab from 'tabs/tabs';
import history from 'utils/history';
import './App.css';


function App() {
    return (
        <div className = "App">
            <div className = "page-container">
                <Router history={history}>  
                    <div className = "App-header">
                        <Header/>  
                    </div>
                    <div className = "header-element">
                        <MyTab className="side-bar"/>
                        <Search className="search-bar" /> 
                    </div>
                    <Switch>
                        <Route path="/data" component={Data}/>
                        <Route path="/search" component={FilterSearch}/>
                        <Route path="/search-results" component={SearchResults}/>
                        <Route path="/" component={Map}/>
                        <Route>
                            {/* Error */}
                        </Route>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;