import axios from 'axios';
import React, { Component } from 'react';
import Participants from './Participants';
import { connect } from 'react-redux';

class Arena extends Component {
    constructor() {
        super();
        this.state = {
            contestants: [],
            quizTitle: '',
            time: '',
            answer: false,
            prevQuestion: [],
            currentQuestion: null,
            currentContestant: {}
        };
        this.handleQuestions = this.handleQuestions.bind(this);
        this.handleShowAnswer = this.handleShowAnswer.bind(this);
        this.nextQuestionHandler = this.nextQuestionHandler.bind(this);
        this.nextContestantHandler = this.nextContestantHandler.bind(this);
    }

    async handleQuestions() {
        try {
            const getQuizId = window.location.href
            const quizId = getQuizId.split('/')[4]
            const { data, status } = await axios.get(`http://localhost:3001/api/v1/quiz/${quizId}`, { headers: { 'Authorization': sessionStorage.getItem('token') } })
            if (status === 200) {
                this.props.setQuestion(data.questions);
                this.nextQuestionHandler();
                this.setState({
                    ...this.state,
                    contestants: data.participants,
                    quizTitle: data.quizzes.title,
                })
                this.nextContestantHandler();
            }

        } catch (error) {
            console.error(error)
        }
    }

    nextQuestionHandler() {
        let currentQstn = this.state.currentQuestion;
        if (currentQstn) {
            this.setState({
                ...this.state,
                prevQuestion: this.state.prevQuestion.push(currentQstn)
            })
        }
        if (this.props.questions.length > 0) {
            if (this.state.prevQuestion.length !== this.props.questions.length) {
                currentQstn = this.props.questions[this.state.prevQuestion.length]
                this.setState({
                    ...this.state,
                    currentQuestion: currentQstn
                })
            } else {
                this.setState({
                    ...this.state,
                    currentQstn: 'Quiz Has Ended!'
                })
            }
        }
    }



    nextContestantHandler() {
        let currentConte = this.state.currentContestant;
        if (!currentConte) {
            this.setState({
                ...this.state,
                currentContestant: this.state.contestants[0]
            })
        } else {
            if ((this.state.contestants.indexOf(currentConte) + 1) < this.state.contestants.length) {
                this.setState({
                    ...this.state,
                    currentContestant: this.state.contestants[this.state.contestants.indexOf(currentConte) + 1]
                })
            } else {
                this.setState({
                    ...this.state,
                    currentContestant: this.state.contestants[0]
                })
            }
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
        let startQuestion = this.state.currentQuestion ? this.state.currentQuestion.question : 'Loading...';
        let maxPoints = this.state.currentQuestion ? this.state.currentQuestion.max_pt : 0;
        let minPoint = this.state.currentQuestion ? this.state.currentQuestion.min_pt : 0;
        let timer = this.state.currentQuestion ? this.state.currentQuestion.duration : 0;
        let answer = this.state.currentQuestion ? this.state.currentQuestion.correct_ans : '...';


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
                                <li><button onClick={this.nextQuestionHandler} >Next Question</button></li>
                                <li><button onClick={this.nextContestantHandler}>Next Contestant</button></li>
                                <li><button>Timer</button></li>
                                <li><button>Max Point</button></li>
                                <li><button>Min Point</button></li>
                            </ul>
                        </div>
                    </div>
                    <div className='questions-display'>
                        <div className='questions-focus'>
                            <h2>{startQuestion}</h2>
                        </div>
                        {this.state.answer ? <div className='show-answer'><p id='showAnswer'>{answer}</p></div> : ''}
                    </div>

                    <div className='contestants-display' style={{ width: '100%' }}>
                        <div >
                            Time: {timer}s
                        </div>
                        <div className='contestants-focus' style={{ width: '100%' }}>

                            <ul>
                                <li>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontWeight: '700' }}>
                                        <div>Name </div> <div>Score </div>
                                    </div>
                                </li>
                                {this.state.contestants.map((item, i) => <Participants active={this.state.currentContestant.name === item.name ? 'active-contestant' : '' } contestant={item.name} score={item.score} key={i} />)}

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        questions: state.questions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setQuestion: (data) => {
            dispatch({
                type: 'SETQUESTIONS',
                payload: data
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Arena);
