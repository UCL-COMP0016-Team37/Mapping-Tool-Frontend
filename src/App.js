import React from 'react';
import {
    Router,
    Switch,
    Route,
} from 'react-router-dom';

import Map from 'pages/map';
import Data from 'pages/data';
import SearchResults from 'pages/searchResults';
import Chart from 'pages/chart';
import Location from 'pages/location';
import Help from 'pages/help';
import Navbar from 'components/header';
// import FilterSearch from './components/filterSearch';
import history from 'utils/history';
import Top100 from 'components/top100';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectPage from 'pages/project';

function App() {
    return (
        <div className = "App">
            <div className = "page-container">
                <Router history={history}>
                    <Route component={Navbar}/>
                    <Switch>
                        <Route path="/data" component={Data}/>
                        <Route path="/top-100" component={Top100}/>
                        {/* <Route path="/search" component={FilterSearch}/> */}
                        <Route path="/search-results" component={SearchResults}/>
                        <Route path="/project-page/:id" component={ProjectPage}/>
                        <Route path="/chart" component={Chart}/>
                        <Route path="/location" component={Location}/>
                        <Route path="/help" component={Help}/>
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