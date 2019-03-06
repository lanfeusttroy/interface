import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Fab from '@material-ui/core/Fab';

import selectColorStyle from "assets/components/selectColorStyle";

class SelectColor extends Component { 
    constructor(props){
        super(props);       
    }

    handleChangeColor=(ev)=>{        
        //this.props.handleChangeColor(ev.target.name);

        const action = { type: "CHANGE_COLOR", color: ev.target.name };
		this.props.dispatch(action);

    }

    render(){
        const {classes} = this.props;
        return(
            <div>
               <Fab name="blue"  className={classes.blue}  onClick={this.handleChangeColor} > </Fab>        
               <Fab name="purple"  className={classes.purple} onClick={this.handleChangeColor} > </Fab>        
               <Fab name="orange"  className={classes.orange} onClick={this.handleChangeColor} > </Fab>    
               <Fab name="green"  className={classes.green} onClick={this.handleChangeColor} > </Fab>    
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
            color: state.storeProfile.color,
    }
}

export default connect(mapStateToProps)(withStyles(selectColorStyle)(SelectColor));

