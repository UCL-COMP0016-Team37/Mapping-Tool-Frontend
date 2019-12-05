import React from 'react';
import {
    Router,
    Switch,
    Route
} from 'react-router-dom';
import './App.css';
import Search from './components/search';
import Map from './pages/map';
import Data from './pages/data';
import SearchResults from './pages/searchResults';
import history from './history';

function App() {
    return (
        <div className = "App">
            <div className = "page-container">    
                <Router history={history}>
                    <Search />
                    <Switch>
                        <Route path = "/data">
                            <Data/>
                        </Route>
                        <Route path = "/search-results">
                            <SearchResults/>
                        </Route>
                        <Route path = "/">
                            <Map/>
                        </Route>
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