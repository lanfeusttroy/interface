const initialStateLayer = {
    ficheNavire:{},
};

function navire(state = initialStateLayer, action) {

    let nextState;
	
	
	
	switch (action.type) {

		
		case 'CHANGE_NAVIRE':
			
			nextState = {
			  ...state,
			  ficheNavire:  action.ficheNavire
			}			
			
		return nextState || state
					
        		
		default:			
			return state
	}

}

export default navire;