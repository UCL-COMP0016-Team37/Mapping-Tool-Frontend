import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import history from 'utils/history';

function trimText(text, limit=300) {
    if (text.length < limit)
        return text;
    text = text.slice(0, limit);
    text = text.slice(0, text.lastIndexOf(' '));
    return `${text}...`;
}

export default class SearchResultItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {project: this.props};
    }

    projectView(){
        const projectId = this.state.project.data.iati_identifier;
        history.push('/project-page/?id='+projectId);
    }

    render() {
        const { data } = this.props;
        return <Card>
            <Card.Body>
                <Card.Title>{data.title.narratives[0].text}</Card.Title>
                <Card.Subtitle>{data.recipient_countries[0].country.name}</Card.Subtitle>
                {/* <Card.Text>{trimText(data.projectDescription)}</Card.Text> */}
                <Card.Link variant="light" href="" onClick={this.projectView.bind(this)}>View Project</Card.Link>
            </Card.Body>
        </Card>;
    }
}

SearchResultItem.propTypes = {
    data: PropTypes.any,
};
