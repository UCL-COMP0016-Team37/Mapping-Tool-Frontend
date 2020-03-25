import React from 'react';
import pinimg from '../assets/get-started/pin-hover.png';
import search from '../assets/get-started/search.png';
import analysis from '../assets/get-started/analysis-page.png';
import project from '../assets/get-started/project-page.png';
import searchresult from '../assets/get-started/search-result.png';
import top100 from '../assets/get-started/top-100.png';

export default class LocationPage extends React.Component {
    render() {
        return <div className="page">
            <h1>Using the ANCSSC Mapping Tool</h1>

            <h3>MAIN / MAP PAGE</h3>
            <p>
                Main page shows the number of ngo project around the world
                which is grouped in a pin. On initial zoom, some countries
                are grouped together. If the map is zoomed further, the pins
                will spread to each country in which the user can click to go
                and view location of each project. If it is then clicked again,
                user will go to search results page which shows all project in the
                country
            </p>
            <img src={pinimg} alt="pin" width='400vw'/>

            <h3>PROJECT PAGE</h3>
            <p>
                Project page shows all the details of one particular project.
                Among the data shown includes, location, reporting organisations,
                budget, overview and transactions.
            </p>
            <img src={project} alt="project"  margin-left='20vw' width='400vw'/>
            <h3>TOP 100</h3>
            <p>
                Top 100 page shows the list Top 100 donors/reportiong organisations
                including their number of projects reported.
            </p>
            <img src={top100} alt="top-100"  margin-left='20vw' width='400vw'/>
            <h3>SEARCH</h3>
            <p>
                In search, user can choose to search either by keyword, sectors or
                country or any combination of all of them. User will then be redirected
                to the search results page to view the project list.
            </p>
            <img src={search} alt="search"  margin-left='20vw' width='400vw'/>
            <img src={searchresult} alt="searchresult"  margin-left='20vw' width='400vw'/>
            <h3>ANALYSIS</h3>
            <p>
                Analysis helps aggregate all the data of the search category and graph
                it so that user would be able to get the general overview of projects in
                a country or projects in a sector or a combination of both.
            </p>
            <img src={analysis} alt="analysis"  margin-left='20vw' width='400vw'/>
        </div>;
    }
}
