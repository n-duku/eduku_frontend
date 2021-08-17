import React, { Component } from 'react';

class Participants extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.contestant}</td>
                <td>{this.props.score}</td>
            </tr>
        );
    }
}

export default Participants;

