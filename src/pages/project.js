import React from 'react';
import PropTypes from 'prop-types';
import ProjectPage from 'components/projectPage';

export default class Project extends React.Component {
    render() {
        return <ProjectPage id={this.props.match.params.id}/>;
    }
}

Project.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }),
    }),
};

