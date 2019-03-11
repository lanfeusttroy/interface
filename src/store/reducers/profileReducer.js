const initialStateLayer = {
    color:'blue',
		backgroundSidebar:'phare-1',
		token:''
};

function profile(state = initialStateLayer, action) {

    let nextState;
	
	
	
	switch (action.type) {
		case 'CHANGE_TOKEN':
			
			nextState = {
			  ...state,
			  token:  action.token
			}			
			
		return nextState || state

		
		case 'CHANGE_COLOR':
			
			nextState = {
			  ...state,
			  color:  action.color
			}			
			
		return nextState || state
					
        case 'CHANGE_BACKGROUND':
			
			nextState = {
			  ...state,
			  backgroundSidebar:  action.backgroundSidebar
			}			
			
		return nextState || state	
		
		default:			
			return state
	}

}

export default profile;