import { createStore, combineReducers  } from 'redux';

import profileReducer from './reducers/profileReducer';
import navireReducer from './reducers/navireReducer';


const reducer = combineReducers({
    storeProfile:profileReducer,
    storeNavire:navireReducer
});

export default createStore(reducer);