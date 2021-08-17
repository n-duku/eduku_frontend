import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class QuizData extends Component {


    render() {
        return (
            <>
                <tr>
                    <td>{this.props.title}</td>
                    <td>{this.props.description}</td>
                    <td>
                        <button>
                            <Link to={`/quiz/${this.props.quiz_id}`} style={{ textDecoration: 'none', color: 'white', padding: 4 }}>
                                Start
                            </Link>
                        </button>
                    </td>
                    <td>
                        <button className='delete-btn' data-id={this.props.quiz_id}>
                                Delete
                        </button>
                    </td>
                </tr>
            </>
        );
    }
}

export default QuizData;
