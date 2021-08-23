const initialState = {
    isAuthenticated: false,
    user_id: '',
    username: '',
    isAdmin: false,
    questions: []

}

const Reducer =(state = initialState, action)=>{
    switch(action.type){
        case 'SETAUTH':
            return {
                ...state,
                isAuthenticated: !state.isAuthenticated
            }

        case 'SETUSER':
            return {
                ...state,
                user_id: action.payload.user_id,
                username: action.payload.username,
                isAdmin: action.payload.isAdmin
            }

        case 'SETQUESTIONS':
            return {
                ...state,
                questions: state.questions.concat(action.payload)
            }

        default:
            return state
    }
}

export default Reducer;