import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import './App.css';
import Search from './components/search';
import Map from './pages/map';
import Data from './pages/data';
import SearchResults from './pages/searchResults';

function App() {
    return (
        <div className = "App">
            <div className = "page-container">
                <Search/>
                <Router>
                    <Switch>
                        <Route path = "/data">
                            <Data/>
                        </Route>
                        <Route path = "/search-results">
                            <SearchResults/>
                        </Route>
                        <Route>
                            <Map/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;