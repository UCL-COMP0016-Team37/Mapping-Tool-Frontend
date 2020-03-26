import React from 'react';
import PropTypes from 'prop-types';

import { Container, Dropdown } from 'react-bootstrap';
import PinHover from 'assets/helpScreenshots/pin-hover.png';
import Search from 'assets/helpScreenshots/search.png';
import Analysis from 'assets/helpScreenshots/analysis.png';
import AnalysisPage from 'assets/helpScreenshots/analysis-page.png';
import ProjectPage from 'assets/helpScreenshots/project-page.png';
import SearchResult from 'assets/helpScreenshots/search-result.png';
import Top100 from 'assets/helpScreenshots/top-100.png';
const Divider = Dropdown.Divider;

function Img(props) {
    const { src, alt } = props;
    const srcList = Array.isArray(src) ? src : [src];
    return <div className="img-container">{srcList.map(el => <div key={el} className="img-wrapper"><img alt={alt} src={el}/></div>)}</div>;
}

Img.propTypes = {
    src: PropTypes.any,
    alt: PropTypes.any,
};

export default class LocationPage extends React.Component {
    render() {
        return <Container className="help-page page text-left my-3">
            <h2>Using the ANCSSC Mapping Tool</h2>
            <Divider/>

            <h4>MAIN / MAP PAGE</h4>
            <p>
                Main page shows the number of ngo project around the world
                which is grouped in a pin. On initial zoom, some countries
                are grouped together. If the map is zoomed further, the pins
                will spread to each country in which the user can click to go
                and view location of each project. If it is then clicked again,
                user will go to search results page which shows all project in the
                country.
            </p>
            <Img src={PinHover} alt="Main Map" />
            <Divider/>

            <h4>PROJECT PAGE</h4>
            <p>
                Project page shows all the details of one particular project.
                Among the data shown includes, location, reporting organisations,
                budget, overview and transactions.
            </p>
            <Img src={ProjectPage} alt="Project Page"/>
            <Divider/>

            <h4>TOP 100</h4>
            <p>
                Top 100 page shows the list Top 100 donors/reportiong organisations
                including their number of projects reported.
            </p>
            <Img src={Top100} alt="Top 100"/>
            <Divider/>

            <h4>SEARCH</h4>
            <p>
                In search, user can choose to search either by keyword, sectors or
                country or any combination of all of them. User will then be redirected
                to the search results page to view the project list.
            </p>
            <Img src={[Search, SearchResult]} alt="Search"/>
            <Divider/>

            <h4>ANALYSIS</h4>
            <p>
                Analysis helps aggregate all the data of the search category and graph
                it so that user would be able to get the general overview of projects in
                a country or projects in a sector or a combination of both.
            </p>
            <Img src={[AnalysisPage, Analysis]} alt="Analysis Page"/>
        </Container>;
    }
}
