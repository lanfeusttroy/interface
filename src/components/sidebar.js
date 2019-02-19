//components/sidebar.js

import React from "react";
import _ from 'lodash';
import classNames from "classnames";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Drawer from "@material-ui/core/Drawer";

import sidebarStyle from "assets/components/sidebarStyle";

class Sidebar extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        const { classes, color, logo, image, logoText, open } = this.props;

        return(
           <Drawer
                anchor="left"
                variant="permanent"
                open = {open}
                className={classNames( classes.drawer,{
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}                    
                classes={{
                    paper: classNames({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.logo}>
                    <div className={classes.logoLink}>
                        <div 
                            className={classes.logoImage}
                            onClick={this.props.handleSideBar}
                        >
                            
                            <img src={logo} alt="logo" className={classes.img} />
                            <span className={classes.logoText}>{logoText}</span>

                        </div>
                        
                    </div>
                </div>
                <div className={classes.sidebarWrapper}>
                                     
                </div>
                <div
                    className={classes.background}
                    style={{ backgroundImage: "url(" + image + ")" }}
                />
            </Drawer>
        )
    }

}

export default withStyles(sidebarStyle)(Sidebar);
