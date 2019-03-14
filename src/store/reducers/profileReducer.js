const initialStateLayer = {
    color:'blue',
		backgroundSidebar:'phare-1',
		openSidebar:true
};

function profile(state = initialStateLayer, action) {

    let nextState;
	
	
	
	switch (action.type) {
		case 'CHANGE_SIDEBAR':
			
			nextState = {
			  ...state,
			  openSidebar:  action.openSidebar
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