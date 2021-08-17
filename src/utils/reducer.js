const initialState = {
    isAuthenticated: false,
    user_id: '',
    username: '',
    isAdmin: false

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

        default:
            return state
    }
}

export default Reducer;