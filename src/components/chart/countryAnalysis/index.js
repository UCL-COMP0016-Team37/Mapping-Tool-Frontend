import React from 'react';
import PropTypes from 'prop-types';
import API from 'utils/backendApi';
import IndexItem from 'utils/indexItem';
import { DropdownButton, Dropdown, ButtonToolbar, Container, Row, Col, ButtonGroup } from 'react-bootstrap';
import FundingFlow from '../../map/fundingFlow';

export default class CountryAnalysis extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            graph: 'pie',
            graphcolor: ['#0D47A1', '#1565C0', '#1976D2', '#1E88E5', '#2196F3'],
            value: undefined,
            count: undefined,
            countryCode: props.countryCode,
            ready: false,
            totalSector: undefined,
            number: undefined,
            orgsvalue: undefined,
            orgscount: undefined,
            orgsnumber: undefined,
            name:undefined,
        };
        // API.getSectorInCountryAnalysis(props.countryCode).then((response) =>{
        //     let value = response.data.tops.map(data => data.name.split('-')[0]);
        //     value.push(response.data.rest.name);
        //     let count = response.data.tops.map(data => data.number);
        //     count.push(response.data.rest.number);
        //     this.setState({
        //         value: value,
        //         count: count,
        //         totalSector: response.data.totalSector,
        //     });
        // });
        API.getTopOrgsPerCountry(props.countryCode).then((response) =>{
            let value = response.data.tops.map(data => data.name.split('-')[0]);
            value.push(response.data.rest.name);
            let count = response.data.tops.map(data => data.number);
            count.push(response.data.rest.number);
            this.setState({
                orgsvalue: value,
                orgscount: count,
                orgsnumber: response.data.totalOrgs,
            });
        });
        API.getSearch(this.props.searchTerm,1).then((response) => {
            this.setState({ number: response.data.numFound,ready:true});
        });
        API.getCountry(props.countryCode).then((response) => {
            this.setState({
                name:response.data.name,
            });
        });
        this.chartRef = React.createRef();
    }

    _onClickGraph(data) {
        this.setState({graph : data});
    }

    render() {
        if (this.state.ready){
            return <Container fluid>
                <Container fluid className='my-3 text-right'>
                    <ButtonGroup className='float-right'>
                        <ButtonToolbar>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title="Change Graph">
                                {typeOfGraph.map(graph => <Dropdown.Item key={graph.id} onClick={() => this._onClickGraph(graph.id)} >{graph.name}</Dropdown.Item>)}
                            </DropdownButton>
                        </ButtonToolbar>
                    </ButtonGroup>
                </Container>
                <h1>Country Analysis</h1>
                <h4>{this.state.name}</h4>
                <Row className="text-center">
                    <Col><h1>{this.state.number}</h1> Total Projects</Col>
                    <Col><h1>{this.state.orgsnumber}</h1> Total Reporting organisations</Col>
                    {/* <Col><h1>{this.state.totalSector}</h1> Total Sector</Col> */}
                </Row>
                <Row>
                    {/* <Col>
                        <IndexItem
                            id={this.state.sectorCode + '-'+ this.state.countryCode}
                            type={this.state.graph}
                            title="Sector analysis for country"
                            labels={this.state.value}
                            data={this.state.count}
                            color={this.state.graphcolor}
                        />
                    </Col> */}
                    <Col>
                        <IndexItem
                            id={this.state.sectorCode + '-'+ this.state.countryCode}
                            type={this.state.graph}
                            title="Top organisation for country"
                            labels={this.state.orgsvalue}
                            data={this.state.orgscount}
                            color={this.state.graphcolor}
                        />
                    </Col>
                    <Col>
                        <FundingFlow
                            mapStyle="mapbox://styles/mapbox/dark-v10"
                            countryCode={this.props.countryCode}
                        />
                    </Col>
                </Row>
            </Container>;
        } else
            return <div></div>;
    }
}

const typeOfGraph = [
    {name:'Line Graph',id:'line'},
    {name:'Bar Chart',id:'bar'},
    {name:'Radar',id:'radar'},
    {name:'Doughnut chart',id:'doughnut'},
    {name:'Pie Chart',id:'pie'},
    {name:'Polar Area',id:'polarArea'},
    {name:'Bubble Graph',id:'bubble'},
];

CountryAnalysis.propTypes = {
    searchTerm: PropTypes.string,
    countryCode: PropTypes.string,
    sectorCode: PropTypes.string,
};