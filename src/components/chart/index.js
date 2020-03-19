import React from 'react';
import PropTypes from 'prop-types';
import './chart.scss';
import API from 'utils/backendApi';
import IndexItem from 'utils/indexItem';
import history from '../../utils/history';
import {DropdownButton,Dropdown,ButtonToolbar,Button} from 'react-bootstrap';

export default class Chart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            results: undefined,
            info: '',
            graph: 'pie',
            graphcolor: ['red','green','blue','yellow'],
            countryCode: props.countryCode,
            sectorCode: props.sectorCode,
            sector: props.sectorCode === '',
            country: props.countryCode === '',
            both: !(props.countryCode !== '' && props.sectorCode !== ''),
            ready: false,
            number: undefined,
        };
        API.getSearch(this.props.searchTerm,1).then((response) => {
            this.setState({ number: response.data.numFound});
        });
        this.chartRef = React.createRef();
    }

    _onClickGraph(data) {
        this.setState({graph : data});
    }

    _onClickInfo(data) {
        if(data === 'donors'){
            API.getTopDonorPerOrg(this.state.sectorCode).then((response) =>{
                this.setState({
                    results: response.data.tops,
                    number: response.data.orgNum,
                    ready:true,
                    info: 'top 4 donor organisation for sector (in $)',
                });
            });
        }
        else if(data === 'organization'){
            API.getTopReceiverPerOrg(this.state.sectorCode).then((response) =>{
                this.setState({
                    results: response.data.tops,
                    number: response.data.orgNum,
                    ready:true,
                    info: 'top 4 receiver organisation for sector (in $)',
                });
            });
        }
        else {
            API.getTopReceiverPerSector(this.state.sectorCode).then((response) =>{
                this.setState({
                    results: response.data.tops,
                    number: response.data.countryNum,
                    ready:true,
                    info: 'top 4 receiver country for sector (in $)',
                });
            });
        }
    }

    displaybothData(){
        API.getTopOrgsinCountry(this.state.countryCode,this.state.sectorCode).then((response) =>{
            this.setState({
                results: response.data.tops,
                number: response.data.totalOrgs,
                ready:true,
                info: 'top 4 organisation in country',
            });
        });
    }

    displayCountryData(){
        API.getSectorInCountryAnalysis(this.state.countryCode).then((response) =>{
            this.setState({
                results: response.data.tops,
                number: response.data.totalSector,
                ready:true,
                info: 'top 4 sector in country',
            });
        });
    }

    goToSearchResult(){
        history.push('/search-results/?search='+ this.props.searchTerm + '&page=1');
    }

    render() {
        let displaygraph;
        if (this.state.ready){
            displaygraph = <div className="chart-canvas">
                <IndexItem
                    id={this.state.sectorCode + '-'+ this.state.countryCode}
                    type={this.state.graph}
                    title={this.state.info}
                    labels={this.state.results.map(data => data.name.split('-')[0])}
                    data={this.state.results.map(data => data.number)}
                    color={this.state.graphcolor}
                />
                {/* <>{this.state.number}</> */}
            </div>;
        }
        else displaygraph = <div className="chart-canvas">
            {this.state.number} projects found
        </div>;
        return <div>
            <ButtonToolbar>
                <Button
                    className='both-button'
                    onClick={() => this.displaybothData()}
                    disabled={this.state.both}
                >Sector and country Analysis</Button>
                <Button
                    className='country-button'
                    onClick={() => this.displayCountryData()}
                    disabled={this.state.country}
                >Country Analysis</Button>
                <DropdownButton
                    id="dropdown-basic-button"
                    title="Sector Analysis"
                    disabled={this.state.sector}>
                    {information.map(info => <Dropdown.Item key={info.id} onClick={() => this._onClickInfo(info.id)} >{info.name}</Dropdown.Item>)}
                </DropdownButton>
                <DropdownButton
                    id="dropdown-basic-button"
                    title="Type of Graph">
                    {typeOfGraph.map(graph => <Dropdown.Item key={graph.id} onClick={() => this._onClickGraph(graph.id)} >{graph.name}</Dropdown.Item>)}
                </DropdownButton>
            </ButtonToolbar>
            {displaygraph}
            <Button
                className='search-result-button'
                onClick={() => this.goToSearchResult()}
            >Project List</Button>
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