import React, { Component } from 'react';

class Participants extends Component {
    render() {
        return (
            <li className={this.props.active}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '-16px'}}>
                    <div>{this.props.contestant} </div> <div>{this.props.score} </div>
                </div>
            </li>
        );
    }
}

export default Participants;

