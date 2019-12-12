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
import Header from './header'
import Mytab from './tabs/tabs';
import FilterSearch from './components/filterSearch'


function App() {
    return (
        <div className = "App">
            <div className = "page-container">  
                <div className = "App-header">
                    <Header/>  
                </div>
                <div className = "header-element">
                <Mytab className="side-bar"/>
                <Search className="search-bar" /> 
                </div>
                <Router history={history}>
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