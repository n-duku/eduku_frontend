import axios from 'axios';
import React, { Component } from 'react';
import Participants from './Participants';

class Arena extends Component {
    constructor() {
        super();
        this.state = {
            questions: [],
            contestants: [],
            quizTitle: [],
            time: '',
            answer: false,
        };
        this.handleQuestions = this.handleQuestions.bind(this);
        this.handleShowAnswer = this.handleShowAnswer.bind(this);
    }

    async handleQuestions() {
        try {
            const getQuizId = window.location.href
            const quizId = getQuizId.split('/')[4]
            const { data, status } = await axios.get(`http://localhost:3001/api/v1/quiz/${quizId}`, { headers: { 'Authorization': sessionStorage.getItem('token') } })
            if (status === 200) {
                this.setState({
                    ...this.state,
                    questions: data.questions,
                    contestants: data.participants,
                    quizTitle: data.quizzes.title,
                })
            }
            console.log('[questions]', this.state.questions)
        } catch (error) {
            console.error(error)
        }
    }

    componentDidMount() {
        this.handleQuestions();
    }


    handleShowAnswer() {
        this.setState({
            ...this.state,
            answer: !this.state.answer
        })
    }







    render() {
        let quizTitle = this.state.quizTitle ? this.state.quizTitle : 'Loading...'
        let startQuestion = this.state.questions.length > 0 ? this.state.questions[0].question : 'Loading...';
        let maxPoints = this.state.questions.length > 0 ? this.state.questions[0].max_pt : 0;
        let minPoint = this.state.questions.length > 0 ? this.state.questions[0].min_pt : 0;
        let timer = this.state.questions.length > 0 ? this.state.questions[0].duration : 0;
        let answer = this.state.questions.length > 0 ? this.state.questions[0].correct_ans : '...'


        return (
            <div className='main-page'>
                <div className='quiz-title'><h1>{quizTitle}</h1></div>
                <div className='arena-display'>
                    <div className='buttons-display'>
                        <div className='score-display'>
                            <ul>
                                <li>Max Points: {maxPoints}</li>
                                <li>Min Points: {minPoint}</li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li><button onClick={this.handleShowAnswer}>{this.state.answer ? 'Hide Answer' : 'Show Answer'}</button></li>
                                <li><button>Next Question</button></li>
                                <li><button>Next Contestant</button></li>
                            </ul>
                        </div>
                    </div>
                    <div className='questions-display'>
                        <div className='questions-focus'>
                            <h2>{startQuestion}</h2>
                        </div>
                        {this.state.answer ? <div className='show-answer'><p id='showAnswer'>{answer}</p></div> : ''}
                    </div>

                    <div className='contestants-display'>
                        <div >
                            Time: {timer}s
                        </div>
                        <div className='contestants-focus'>
                            <table>
                                <thead style={{ width: '100%' }}>
                                    <tr>
                                        <th>Name</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.contestants.map((item, i) => <Participants contestant={item.name} score={item.score} key={i} />)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Arena;
