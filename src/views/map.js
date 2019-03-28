import React from "react";
import { connect } from 'react-redux';

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

//components
import OlMap from "components/maps/olMap";

class Map extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const {color} = this.props;

        return(
            <div>
                <OlMap 
                    color={color}
                />
            </div>
        )
    }
};



const mapStateToProps = (state) => {
    return {
            color: state.storeProfile.color
            
    }
}
export default connect(mapStateToProps)(Map);