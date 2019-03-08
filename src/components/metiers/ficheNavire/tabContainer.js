import React, { Component } from 'react';

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';


import ficheNavireStyle from "assets/components/ficheNavireStyle";

const styles = {
    background:{
        backgroundColor:"#fff"
    }
}

class TabContainer extends React.Component {
    constructor(props){
        super(props);
    }
   

    render(){
        const {classes} = this.props;

        return(
            <Typography component="div" className={classes.tabBody} style={{ padding: 8 * 3 }}>
                {this.props.children}
            </Typography>
        )
    }
}

export default withStyles(ficheNavireStyle)(TabContainer);