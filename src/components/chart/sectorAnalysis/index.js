import React from 'react';
import PropTypes from 'prop-types';
import '../chart.scss';
import API from 'utils/backendApi';
import IndexItem from 'utils/indexItem';
import HeatMap from '../../map/heatmap';
import { DropdownButton, Dropdown, ButtonToolbar, Row, Col, Container, ButtonGroup } from 'react-bootstrap';

export default class SectorAnalysis extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            graph: 'bar',
            graphcolor: ['#1565C0','#0D47A1','#1976D2','#1E88E5'],
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
            this.setState({
                donorlabel:response.data.tops.map(data => data.name),
                donorcount:response.data.tops.map(data => data.number),
                donorNumber: response.data.orgNum,
                // info: 'top 4 donor organisation for sector (in $)',
            });
        });
        API.getTopReceiverPerOrg(this.state.sectorCode).then((response) =>{
            this.setState({
                orglabel:response.data.tops.map(data => data.name),
                orgcount:response.data.tops.map(data => data.number),
                orgNumber: response.data.orgNum,
            });
        });
        API.getTopReceiverPerSector(this.state.sectorCode).then((response) =>{
            this.setState({
                receiverlabel:response.data.tops.map(data => data.name),
                receivercount:response.data.tops.map(data => data.number),
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
                <Row className="my-5">
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