import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import history from 'utils/history';

export default class SearchResultItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {project: this.props};
    }

    projectView(){
        const projectId = this.state.project.data.interaction_intervention_id;
        history.push('/project-page/?id='+projectId);
    }

    render() {
        const { data } = this.props;
        return (
            <tr>
                <td>{data.interaction_intervention_id}</td>
                <td>{data.projectName}</td>
                <td><Button variant="light" onClick={this.projectView.bind(this)}>View Project</Button></td>
            </tr>
        );
    }
}

SearchResultItem.propTypes = {
    data: PropTypes.any,
};
