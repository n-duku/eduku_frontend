import axios from "axios";

export async function handleBulkSave (data, isContestant, quiz_id) {
    let participants = [];
    let questionStream = [];
    if(isContestant){
        data.forEach(item => {
            participants.push({name: item[0], score: 0, participantsQuizId: quiz_id })
        })
        try {
            if(participants.length > 0){
                await axios.post('http://localhost:3001/api/v1/contestants', participants, {headers: {'Authorization': sessionStorage.getItem('token')}})
            }
        } catch (err) {
            console.error(err);
        }
    }else {
        data.forEach(item => {
            questionStream.push({
                question: item[0],
                correct_ans:  item[1],
                duration: item[2],
                min_pt: item[3],
                max_pt: item[4],
                quizquestionsQuizId: quiz_id
            })
        })
        try {
            if(questionStream.length > 0){
                await axios.post('http://localhost:3001/api/v1/question', questionStream, {headers: {'Authorization': sessionStorage.getItem('token')}})
            }
        } catch (err) {
            console.error(err);
        }
    }
}

