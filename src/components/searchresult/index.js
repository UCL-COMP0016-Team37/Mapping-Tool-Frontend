import React from 'react'
import SearchResultItem from './searchresultitem'

class searchResult extends React.Component{

    render(){
        var country = ["Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria",
                        "Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus"]
        return(country.map(something=> <SearchResultItem key={something} country={something}/>)
        )
        
    }
}
export default searchResult