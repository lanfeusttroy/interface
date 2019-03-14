const initialStateLayer = {   
		iduser:'',
		token:'',
		username:'',
		email:'',
    isLogged: true
};

function login(state = initialStateLayer, action) {

    let nextState;
	
	
	
	switch (action.type) {
		case 'CHANGE_TOKEN':
			
			nextState = {
			  ...state,
			  token:  action.token
			}			
			
		return nextState || state

        case 'CHANGE_LOGIN':			
			nextState = {
			  ...state,
              isLogged:  action.isLogged,
							token:  action.token,
							iduser: action.iduser,
							username: action.username,
							email:action.email
			}			
			
		return nextState || state
		
				
		default:			
			return state
	}

}

export default login;