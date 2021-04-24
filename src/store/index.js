import {createStore} from 'redux';

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_JWT':
            return {...state, jwt: action.payload};

        case 'SET_USER':
            return {...state, user: action.payload};
    
        default:
            return state;
    }
}

const INITIAL_STATE = {
    jwt: null,
    user: null
}

const store = createStore(reducer, INITIAL_STATE);

export default store;


/*
const myState = {
    user: null
}


const myReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state, user: action.payload}
    
        default:
            break;
    }
}


store = {
    reducer: myReducer,
    state: myState,
    dispatch: (action) => {
        const newState = this.reducer(this.state, action);

        this.state = newState;
    }
}

console.log(store.state.user); // null

store.dispatch({type: 'SET_USER', payload: 'JAKE DOE'});

console.log(store.state.user); // 'JAKE DOE'
*/
