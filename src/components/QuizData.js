import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class QuizData extends Component {

    constructor(){
        super();
        this.deleteQuiz = this.deleteQuiz.bind(this);
    }

    async deleteQuiz(){
        try {
            const {data, status} = await axios.delete(`http://localhost:3001/api/v1/quiz/${this.props.quiz_id}`, {headers: {'Authorization': sessionStorage.getItem('token')}})
        if(status === 200){
            console.log(data)
        }
        } catch (error) {
            console.error(error)
        }
    }


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
                        <button className='delete-btn' data-id={this.props.quiz_id} onClick={this.deleteQuiz}>
                                Delete
                        </button>
                    </td>
                </tr>
            </>
        );
    }
}

export default QuizData;
