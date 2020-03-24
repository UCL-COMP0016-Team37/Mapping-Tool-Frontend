import React from 'react';
import PropTypes from 'prop-types';
import API from 'utils/backendApi';
import IndexItem from 'utils/indexItem';
import { DropdownButton, Dropdown, ButtonToolbar, Spinner, Row, Col, Container, ButtonGroup } from 'react-bootstrap';

export default class BothAnalysis extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            graph: 'pie',
            graphcolor: ['#0D47A1', '#1565C0', '#1976D2', '#1E88E5', '#2196F3'],
            value: undefined,
            count: undefined,
            sectorCode: props.sectorCode,
            countryCode: props.countryCode,
            ready: false,
            rest: undefined,
            totalorgs: undefined,
        };
        API.getTopOrgsinCountry(this.state.countryCode,this.state.sectorCode).then((response) =>{
            let value = response.data.tops.map(data => data.name);
            value.push(response.data.rest.name);
            let count = response.data.tops.map(data => data.number);
            count.push(response.data.rest.number);
            this.setState({
                value: value,
                count: count,
                totalorgs: response.data.totalOrgs,
                rest: response.data.rest,
            });
        });
        API.getSearch(this.props.searchTerm,1).then((response) => {
            this.setState({ number: response.data.numFound,ready:true});
        });
        this.chartRef = React.createRef();
    }

    _onClickGraph(data) {
        this.setState({graph : data});
    }

    render() {
        if (this.state.ready) {
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
                <h1>Country and Sector Analysis</h1>
                <h4>{decodeURIComponent(this.props.searchTerm)}</h4>
                <Row className="text-center">
                    <Col><h1>{this.state.number}</h1> Total Projects</Col>
                </Row>
                <Row>
                    <Col>
                        <IndexItem
                            id={this.state.sectorCode + '-'+ this.state.countryCode}
                            type={this.state.graph}
                            title="Top report organisation of sector in country"
                            labels={this.state.value}
                            data={this.state.count}
                            color={this.state.graphcolor}
                        />
                    </Col>
                </Row>
            </Container>;
        }
        else return <Spinner className="loading" variant="primary" animation="border"/>;
    }
}

const typeOfGraph = [
    {name:'line Graph',id:'line'},
    {name:'Bar Chart',id:'bar'},
    {name:'Radar',id:'radar'},
    {name:'Doughnut chart',id:'doughnut'},
    {name:'Pie Chart',id:'pie'},
    {name:'Polar Area',id:'polarArea'},
    {name:'Bubble Graph',id:'bubble'},
];

BothAnalysis.propTypes = {
    searchTerm: PropTypes.string,
    countryCode: PropTypes.string,
    sectorCode: PropTypes.string,
};