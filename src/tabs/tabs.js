import React from 'react';
import './tabs.scss'
import history from '../history'

class Mytab extends React.Component{

    setSearch(e){
        history.push('/search')
    }

    render(){
 return(
     <div>
            <button className="tab-content" >Country</button>
            <button className="tab-content" >Funding</button>
            <button className="tab-content" onClick={(e) => this.setSearch(e)}>Search</button>
     </div>
 )}
}
export default Mytab