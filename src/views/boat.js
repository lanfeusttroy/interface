import React from "react";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

//components
import FicheNavire from "components/metiers/ficheNavire/ficheNavire";

class Boat extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <FicheNavire />
            </div>
        )
    }
};

export default Boat;