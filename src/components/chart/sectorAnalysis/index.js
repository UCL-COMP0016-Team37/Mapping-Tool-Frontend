import React from 'react';
import PropTypes from 'prop-types';
import '../chart.scss';
import API from 'utils/backendApi';
import IndexItem from 'utils/indexItem';
import history from 'utils/history';
import {DropdownButton,Dropdown,ButtonToolbar,Button} from 'react-bootstrap';

export default class Chart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            graph: 'pie',
            graphcolor: ['red','green','blue','yellow'],
            sectorCode: props.sectorCode,
            donorlabel:undefined,
            donorcount:undefined,
            orglabel:undefined,
            orgcount:undefined,
            receiverlabel:undefined,
            receivercount:undefined,
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
            this.setState({ number: response.data.numFound,ready:true});
        });
        this.chartRef = React.createRef();
    }

    _onClickGraph(data) {
        this.setState({graph : data});
    }

    goToSearchResult(){
        history.push('/search-results/?search='+ this.props.searchTerm + '&page=1');
    }

    render() {
        if (this.state.ready){
            return <div>
                <ButtonToolbar>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Type of Graph">
                        {typeOfGraph.map(graph => <Dropdown.Item key={graph.id} onClick={() => this._onClickGraph(graph.id)} >{graph.name}</Dropdown.Item>)}
                    </DropdownButton>
                </ButtonToolbar>
                <div className="chart-canvas">
                    <IndexItem
                        id="donorchart"
                        type={this.state.graph}
                        title="top donor organisation of the sector"
                        labels={this.state.donorlabel}
                        data={this.state.donorcount}
                        color={this.state.graphcolor}
                    />
                </div>
                <div className="chart-canvas">
                    <IndexItem
                        id="receiverchart"
                        type={this.state.graph}
                        title="top receiver organisation of the sector"
                        labels={this.state.orglabel}
                        data={this.state.orgcount}
                        color={this.state.graphcolor}
                    />
                </div>
                <div className="chart-canvas">
                    <IndexItem
                        id="receivercountrychart"
                        type={this.state.graph}
                        title="top receiver country of the sector"
                        labels={this.state.receiverlabel}
                        data={this.state.receivercount}
                        color={this.state.graphcolor}
                    />
                </div>
                <div className="chart-canvas">
                    {this.state.number} total projects,
                    {this.state.donorNumber} donors,
                    {this.state.orgNumber} receiving organisations,
                    {this.state.receiverNumber} receiving country
                </div>
                <Button
                    className='search-result-button'
                    onClick={() => this.goToSearchResult()}
                >Project List</Button>
            </div>;}
        else return <div></div>;
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

// const information = [
//     {name:'Top Donor Org',id:'donors'},
//     {name:'Top Receiver Org',id:'organization'},
//     {name:'Top Receiver Country',id:'country'},
// ];

Chart.propTypes = {
    searchTerm: PropTypes.string,
    countryCode: PropTypes.string,
    sectorCode: PropTypes.string,
};