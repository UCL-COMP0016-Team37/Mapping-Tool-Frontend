import React from 'react'


class searchResultItem extends React.Component {
    
    render(){
        // var results = searchResultItem.map(items =><li>{items}</li>)
        return(
            <li>
                {this.props.country}
            </li>
        )
        
    }
} export default searchResultItem