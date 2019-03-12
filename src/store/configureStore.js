import { createStore, combineReducers  } from 'redux';

import profileReducer from './reducers/profileReducer';
import navireReducer from './reducers/navireReducer';
import loginReducer from './reducers/loginReducer';


const reducer = combineReducers({
    storeProfile:profileReducer,
    storeNavire:navireReducer,
    storeLogin:loginReducer
});

export default createStore(reducer);