import React from "react";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

//components
import OlMap from "components/maps/olMap";

class Map extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <OlMap />
            </div>
        )
    }
};

export default Map;