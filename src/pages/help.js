import React from 'react';

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
            <h3>PROJECT PAGE</h3>
            <p>
                Project page shows all the details of one particular project.
                Among the data shown includes, location, reporting organisations, 
                budget, overview and transactions.
            </p>
            <h3>TOP 100</h3>
            <p>
                Top 100 page shows the list Top 100 donors/reportiong organisations
                including their number of projects reported.
            </p>
            <h3>SEARCH</h3>
            <p>
                In search, user can choose to search either by keyword, sectors or 
                country or any combination of all of them. User will then be redirected
                to the search results page to view the project list.
            </p>
            <h3>ANALYSIS</h3>
            <p>
                Analysis helps aggregate all the data of the search category and graph 
                it so that user would be able to get the general overview of projects in
                a country or projects in a sector or a combination of both.
            </p>

        </div>;
    }
}
