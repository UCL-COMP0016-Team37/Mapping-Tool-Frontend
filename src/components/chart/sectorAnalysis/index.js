import React from 'react';
import PropTypes from 'prop-types';
import API from 'utils/backendApi';
import IndexItem from 'utils/indexItem';
import HeatMap from '../../map/heatmap';
import { DropdownButton, Dropdown, ButtonToolbar, Row, Col, Container, ButtonGroup } from 'react-bootstrap';
import {sector} from 'utils/sectorCode';

export default class SectorAnalysis extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            graph: 'bar',
            graphcolor: ['#0D47A1', '#1565C0', '#1976D2', '#1E88E5', '#2196F3'],
            sectorCode: props.sectorCode,
            donorlabel: undefined,
            donorcount: undefined,
            orglabel: undefined,
            orgcount: undefined,
            receiverlabel: undefined,
            receivercount: undefined,
            ready: false,
            donorNumber: undefined,
            orgNumber: undefined,
            receiverNumber: undefined,
        };
        API.getTopDonorPerOrg(props.sectorCode).then((response) =>{
            let value = response.data.tops.map(data => data.name);
            value.push(response.data.rest.name);
            let count = response.data.tops.map(data => data.number);
            count.push(response.data.rest.number);
            this.setState({
                donorlabel: value,
                donorcount:count,
                donorNumber: response.data.orgNum,
                // info: 'top 4 donor organisation for sector (in $)',
            });
        });
        API.getTopReceiverPerOrg(this.state.sectorCode).then((response) =>{
            let value = response.data.tops.map(data => data.name);
            value.push(response.data.rest.name);
            let count = response.data.tops.map(data => data.number);
            count.push(response.data.rest.number);
            this.setState({
                orglabel:value,
                orgcount:count,
                orgNumber: response.data.orgNum,
            });
        });
        API.getTopReceiverPerSector(this.state.sectorCode).then((response) =>{
            let value = response.data.tops.map(data => data.name);
            value.push(response.data.rest.name);
            let count = response.data.tops.map(data => data.number);
            count.push(response.data.rest.number);
            this.setState({
                receiverlabel:value,
                receivercount:count,
                receiverNumber: response.data.countryNum,
            });
        });
        API.getSearch(this.props.searchTerm,1).then((response) => {
            this.setState({ number: response.data.numFound, ready:true });
        });
        this.chartRef = React.createRef();
    }

    _onClickGraph(data) {
        this.setState({graph : data});
    }

    render() {
        const sectorobj = sector.find(data => data.code === parseInt(this.props.sectorCode));
        if (this.state.ready){
            return <Container fluid className='charts-container'>
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
                <h1>Sector Analysis</h1>
                <h4>{sectorobj.name}</h4>
                <Row className="my-5 text-center">
                    <Col><h1>{this.state.number}</h1> Total Projects</Col>
                    <Col><h1>{this.state.donorNumber}</h1> Donors</Col>
                    <Col><h1>{this.state.orgNumber}</h1> Receiving Organisations</Col>
                    <Col><h1>{this.state.receiverNumber}</h1> Receiving Country</Col>
                </Row>
                <Row>
                    <Col>
                        <IndexItem
                            id="donorchart"
                            type={this.state.graph}
                            title="Top donor organisation of the sector"
                            labels={this.state.donorlabel}
                            data={this.state.donorcount}
                            color={this.state.graphcolor}
                        />
                    </Col>
                    <Col>
                        <HeatMap mapStyle="mapbox://styles/mapbox/dark-v10" sectorCode={this.props.sectorCode}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <IndexItem
                            id="receiverchart"
                            type={this.state.graph}
                            title="Top receiver organisation of the sector"
                            labels={this.state.orglabel}
                            data={this.state.orgcount}
                            color={this.state.graphcolor}
                        />
                    </Col>
                    <Col>
                        <IndexItem
                            id="receivercountrychart"
                            type={this.state.graph}
                            title="Top receiver country of the sector"
                            labels={this.state.receiverlabel}
                            data={this.state.receivercount}
                            color={this.state.graphcolor}
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

SectorAnalysis.propTypes = {
    searchTerm: PropTypes.string,
    countryCode: PropTypes.string,
    sectorCode: PropTypes.string,
};