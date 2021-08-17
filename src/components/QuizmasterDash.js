import axios from 'axios';
import React, { Component } from 'react';
import QuizData from './QuizData';
import UserForm from './UserForm';
import {handleBulkSave} from '../utils/uploadData'

class QuizmasterDash extends Component {
    constructor(){
        super();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.updateState = this.updateState.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleTextArea = this.handleTextArea.bind(this);
        this.state = {
            quizTitle: '',
            description: '',
            questions: [],
            contestants: [],
            quizzes: []
        }
    }


    componentDidMount(){
        this.fetchQuizzes();
    }

    async fetchQuizzes(){
        try {
            const {data, status } = await axios.get(`http://localhost:3001/api/v1/quizzes/${sessionStorage.getItem('user_id')}`, {headers: {'Authorization': sessionStorage.getItem('token')}})
            if(status === 200){
                this.setState({
                    ...this.state,
                    quizzes: data
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    updateState(data, isContestant){
       if(isContestant){
           this.setState({
               ...this.state,
               contestants: data
           })
       }else{
        this.setState({
            ...this.state,
            questions: data
        })
       }
    }

    handleInput(e){
        this.setState({
            ...this.state,
            quizTitle: e.target.value
        })
    }

    handleTextArea(e){
        this.setState({
            ...this.state,
            description: e.target.value
        })
    }

    async handleFormSubmit(e){
        e.preventDefault();
        const questionsNumber = this.state.questions.length;
        const contestantsNumber = this.state.contestants.length;
        if(this.state.quizTitle && (questionsNumber > 0) && (contestantsNumber > 0)){
            if( questionsNumber % contestantsNumber === 0){
                let quizData = {
                    title: this.state.quizTitle,
                    quizmasterUserId: sessionStorage.getItem('user_id')
                }
                if(this.state.description){
                    quizData.description = this.state.description
                }
                try {
                    const {data, status} = await axios.post('http://localhost:3001/api/v1/quiz', quizData , {headers: {'Authorization': sessionStorage.getItem('token')}}) ;
                    if(status === 200){
                        handleBulkSave(this.state.questions, false, data.quiz_id);
                        handleBulkSave(this.state.contestants, true, data.quiz_id);
                        this.fetchQuizzes();
                    }
                } catch (error) {
                    console.error(error)
                }
            }else{
                //flash error here
            }
        }else {
            console.log('Check for valid data')
        }
        e.target.reset();
    }


    render() {
        return (
            <div>
                <div className="content-view">
                    <div className='content-table'>
                        <h1>Quizzes</h1>
                        <div className='quizmasters-table' style={{paddingRight: 32}}>
                            <table style={{width: '100%'}}>
                                <thead>
                                    <tr>
                                        <th style={{width: '30%'}}>Title</th>
                                        <th style={{width: '50%'}}>Description</th>
                                        <th style={{width: '10%'}}></th>
                                        <th style={{width: '10%'}}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.quizzes.map((item,key) =>{
                                        return <QuizData key={key} title={item.title} description={item.description} quiz_id={item.quiz_id}/>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='content-form'>
                        <div>
                            <div className='quizmasters-view'>
                                <h3 className='add-quiz-title'>Add Quiz</h3>
                                <form className="uploader" onSubmit={this.handleFormSubmit}>
                                    <div>
                                        <label htmlFor='title' name='title' id='quiz-title'>Title:
                                        </label>
                                        <input type='text' id='title' style={{display: 'block', width: '100%', padding: 4}} onChange={this.handleInput}/>
                                    </div>
                                    <div>
                                    <label htmlFor='description' name='description' id='quiz-title'>Decsription:
                                        </label>
                                        <textarea type='text' id='description' style={{display: 'block', width: '100%', padding: 4}} onChange={this.handleTextArea}/>
                                    </div>
                                    <div className='upload questions'>
                                        <UserForm title={'Questions'} uploadType={false} stateHandler={this.updateState} />
                                    </div>
                                    <div className='upload contestants'>
                                        <UserForm title={'Contestants'} uploadType={true} stateHandler={this.updateState} />
                                    </div>
                                    <div>
                                        <input type='submit' value='Submit' />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuizmasterDash;
