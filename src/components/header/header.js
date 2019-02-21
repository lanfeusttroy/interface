//components/header.js

import React from "react";
import _ from 'lodash';
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";


//components
import CustomButton from "components/customButton";
import HeaderLinks from "components/header/headerLinks";

import headerStyle from "assets/components/headerStyle";

class Header extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const { classes } = this.props;

        return(
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.container}>
                <div className={classes.flex}>
                    {/* Here we create navbar brand, based on route name */}
                    <CustomButton color="transparent" href="#" className={classes.title}>
                       test
                    </CustomButton>
                </div>

                <HeaderLinks />

                </Toolbar>            
            </AppBar>
        )
    }
}

export default withStyles(headerStyle)(Header);