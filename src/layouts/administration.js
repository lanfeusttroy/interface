//layouts/default

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';




// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

//styles
import defaultLayoutStyle from "assets/layouts/defaultLayoutStyle.js"


//components
import Sidebar from "components/sidebar/sidebar";
import Header from "components/header/header";

//pictures
import logo from "assets/img/reactlogo.png";




class AdministrationLayout extends Component { 
    constructor(props){
        super(props);      
    }  

    

    render(){
        

        const { classes, routes, route, hist } = this.props;
        const Component = this.props.component;

       
        
        return(
            <div  className={classes.root}>  
                <Sidebar 
                        logoText={this.props.username}
                        logo={logo}                
                        
                        open={this.props.openSidebar}    
                        handleSideBar = {this.props.handleOpenSidebar}
                        routes = {routes}
                        location = {hist.location.pathname}                        
                />

                <div className={classes.wrapper} ref="mainPanel">
                     <Header 
                        routes = {routes}
                        location = {hist.location.pathname} 
                     />
                    <div className={classes.content}>
                        <div className={classes.container}>
                            <Component 
                                route={route}                                                                
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {            
        username : state.storeLogin.username,
    }
}



export default connect(mapStateToProps)(withStyles(defaultLayoutStyle)(AdministrationLayout));
