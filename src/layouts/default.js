//layouts/default

import React, { Component } from 'react';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

//styles
import defaultLayoutStyle from "assets/layouts/defaultLayoutStyle.js"


//components
import Sidebar from "components/sidebar";


//pictures
import image from "assets/img/sidebar-1.jpg";
import logo from "assets/img/reactlogo.png";

class DefaultLayout extends Component { 
    constructor(props){
        super(props);
    }

    render(){
        const { classes, route } = this.props;
        const Component = this.props.component;

        return(
            <div  className={classes.root}>  
                <Sidebar 
                        logoText={"Lanfeust"}
                        logo={logo} 
                        image={image}
                        open={this.props.openSidebar}    
                        
                        handleSideBar = {this.props.handleOpenSidebar}
                />

                <div className={classes.wrapper} ref="mainPanel">
                    <div className={classes.content}>
                        <div className={classes.container}>
                            <Component route={route}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(defaultLayoutStyle)(DefaultLayout);
