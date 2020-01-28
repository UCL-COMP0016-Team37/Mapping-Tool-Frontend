import React from 'react';
import ProjectPage from 'components/projectPage';
import extractSearchTerm from 'utils/extractSearchTerm';

export default class Project extends React.Component {
    render() {
        return (<ProjectPage searchTerm={extractSearchTerm(this.props.location.search, 'id')}/>);
    }
}

