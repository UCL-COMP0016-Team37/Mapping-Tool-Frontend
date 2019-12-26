import React from 'react';
import './filterSearch.scss';
import history from 'utils/history';

export default class filterSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: '',
            sectorgroup: '',
            startyear: '',
            endyear: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    handleSubmit(){
        history.push('/search-results/?country='+ this.state.country +
            '&sectorgroup=' + this.state.sectorgroup + 
            '&startyear=' + this.state.startyear +
            '&endyear=' + this.state.endyear);
    }

    render() {
        const years = [1990,1991,1992,1993,2000,2018,2019,2020];
        let thisyear = years.map(year=> <option key={year} value={year}>{year}</option>);
        return(
            <div className="form">
                <form onSubmit={e=> this.handleSubmit(e)}>
                    <label>Recipient country: </label>
                    <input className="multiple" type="text" name="country" onChange={this.handleChange} />
                   
                    <label>Sector Group:</label>
                    <input className="multiple" type="text" name="sectorgroup" onChange={this.handleChange} />
                    
                    <label className="years">Year Range </label>
                    <label>Start Year:</label>
                    <select className="multiple" name="startyear">
                        {thisyear}
                    </select>
                        
                    <label>End Year:</label>
                    <select className="multiple" name="endyear">
                        {thisyear}
                    </select>
                        
                   
                    <input type="submit" value="Submit" />
                </form>
            </div>
        ) ;
    }
}