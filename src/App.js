import React from 'react';
import {
    Router,
    Switch,
    Route,
} from 'react-router-dom';

import Map from 'pages/map';
import Data from 'pages/data';
import SearchResults from 'pages/searchResults';
import Navbar from 'components/navbar';
import FilterSearch from './components/filterSearch';
import history from 'utils/history';
import './App.css';


function App() {
    return (
        <div className = "App">
            <div className = "page-container">
                <Router history={history}>
                    <Navbar/>
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