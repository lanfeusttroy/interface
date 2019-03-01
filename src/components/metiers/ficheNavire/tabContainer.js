import React, { Component } from 'react';

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';

class TabContainer extends React.Component {
    constructor(props){
        super(props);
    }
   

    render(){

        return(
            <Typography component="div" style={{ padding: 8 * 3 }}>
                {this.props.children}
            </Typography>
        )
    }
}

export default TabContainer;