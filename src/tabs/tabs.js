import React from 'react';
import './tabs.scss';
import history from 'utils/history';

class MyTab extends React.Component{

    setSearch() {
        history.push('/search');
    }

    render() {
        return (
            <div>
                <button className="tab-content" >Country</button>
                <button className="tab-content" >Funding</button>
                <button className="tab-content" onClick={() => this.setSearch()}>Search</button>
            </div>
        );
    }
}
export default MyTab;
