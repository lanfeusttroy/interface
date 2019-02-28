import React, { Component } from 'react';
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
        this.props.handleChangeColor(ev.target.name);
    }

    render(){
        const {classes} = this.props;
        return(
            <div>
               <Fab name="blue"  className={classes.blue}  onClick={this.handleChangeColor} />              
               <Fab name="purple"  className={classes.purple} onClick={this.handleChangeColor} />     
               <Fab name="orange"  className={classes.orange} onClick={this.handleChangeColor} />
               <Fab name="green"  className={classes.green} onClick={this.handleChangeColor} />
            </div>
        )
    }
}

export default withStyles(selectColorStyle)(SelectColor);