import React from 'react';
import PropTypes from 'prop-types';


export default class SearchResultItem extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <tbody>
                <tr>
                    <td> {data.interaction_intervention_id}</td>
                    <td>{data.projectName}</td>
                    <td>{data.organization}</td>
                    <td>{data.location}</td>
                    <td>{data.status}</td>
                    <td>{data.humanitarian}</td>
                </tr>
            </tbody>
        );
    }
}

SearchResultItem.propTypes = {
    data: PropTypes.any,
};
