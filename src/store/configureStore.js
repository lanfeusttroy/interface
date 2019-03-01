import { createStore, combineReducers  } from 'redux';

import profileReducer from './reducers/profileReducer';


const reducer = combineReducers({
    storeProfile:profileReducer,
});

export default createStore(reducer);