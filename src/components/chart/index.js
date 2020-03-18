import React from 'react';
import PropTypes from 'prop-types';
import './chart.scss';
import API from 'utils/backendApi';
import IndexItem from 'utils/indexItem';
import {DropdownButton,Dropdown,ButtonToolbar,Button} from 'react-bootstrap';
import getarrayvalue from 'utils/sortUniqueArray';

function isMatch(needle, haystack) {
    return haystack.toLowerCase().includes(needle.toLowerCase());
}

export default class Chart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            results: undefined,
            info: 'humanitarian',
            graph: 'doughnut',
            graphcolor: ['#00C6F7','#43D86F','#662541','#7FC432'],
            countryCode: props.countryCode,
            sectorCode: props.sectorCode,
            sector: props.sectorCode === '',
            country: props.countryCode === '',
            both: !(props.countryCode !== '' && props.sectorCode !== ''),
            ready: false,
        };
        this.chartRef = React.createRef();
    }

    _onClickInfo(data) {
        if(data === 'donors'){
            API.getTopDonorPerOrg(this.state.sectorCode).then((response) =>{
                this.setState({results: response.data.tops, number: response.data.totalOrgs, ready:true});
            });
        }
        else if(data === 'organization'){
            API.getTopReceiverPerOrg(this.state.sectorCode).then((response) =>{
                this.setState({results: response.data.tops, number: response.data.totalOrgs, ready:true});
            });
        }
        else {
            API.getTopReceiverPerSector(this.state.sectorCode).then((response) =>{
                this.setState({results: response.data.tops, number: response.data.totalOrgs, ready:true});
            });
        }
        // console.log(data)
    }

    _onClickGraph(data) {
        this.setState({graph : data});
        // console.log(data)
    }

    displaybothData(){
        API.getTopOrgsinCountry(this.state.countryCode,this.state.sectorCode).then((response) =>{
            this.setState({results: response.data.tops, number: response.data.totalOrgs, ready:true});
        });
    }

    displayCountryData(){
        API.getSectorInCountryAnalysis(this.state.countryCode).then((response) =>{
            this.setState({results: response.data.tops, number: response.data.totalOrgs, ready:true});
        });
    }
    render() {
        if (this.state.ready)
            return <div className="chart-canvas">
                <ButtonToolbar>
                    <Button className='both-button' onClick={() => this.displaybothData()}disabled={this.state.both}>Sector and country Analysis</Button>
                    <Button className='country-button' onClick={() => this.displayCountryData()} disabled={this.state.country}>Country Analysis</Button>
                    <DropdownButton id="dropdown-basic-button" title="Sector Analysis" disabled={this.state.sector}>
                        {information.map(info => <Dropdown.Item key={info.id} onClick={() => this._onClickInfo(info.id)} >{info.name}</Dropdown.Item>)}
                    </DropdownButton>
                    <DropdownButton id="dropdown-basic-button" title="Type of Graph">
                        {typeOfGraph.map(graph => <Dropdown.Item key={graph.id} onClick={() => this._onClickGraph(graph.id)} >{graph.name}</Dropdown.Item>)}
                    </DropdownButton>
                </ButtonToolbar>
                <IndexItem id={this.state.sectorCode + '-'+ this.state.countryCode} type={this.state.graph} title={this.state.info} labels={this.state.results.map(data => data.name)} data={this.state.results.map(data => data.number)} color={this.state.graphcolour}/>
            </div>;
        return<div className="chart-canvas">
            <ButtonToolbar>
                <Button className='both-button' onClick={() => this.displaybothData()}disabled={this.state.both}>Sector and country Analysis</Button>
                <Button className='country-button'disabled={this.state.country}>Country Analysis</Button>
                <DropdownButton id="dropdown-basic-button" title="Sector Analysis" disabled={this.state.sector}>
                    {information.map(info => <Dropdown.Item key={info.id} onClick={() => this._onClickInfo(info.id)} >{info.name}</Dropdown.Item>)}
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title="Type of Graph">
                    {typeOfGraph.map(graph => <Dropdown.Item key={graph.id} onClick={() => this._onClickGraph(graph.id)} >{graph.name}</Dropdown.Item>)}
                </DropdownButton>
            </ButtonToolbar>
        </div>;
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

const information = [
    {name:'Top Donor Org',id:'donors'},
    {name:'Top Receiver Org',id:'organization'},
    {name:'Top Receiver Country',id:'country'},
];

Chart.propTypes = {
    searchTerm: PropTypes.string,
    countryCode: PropTypes.string,
    sectorCode: PropTypes.string,
};