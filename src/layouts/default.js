//layouts/default

import React, { Component } from 'react';
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


//ressources
import ressourcesBackground  from "components/sidebar/ressourcesBackground";

class DefaultLayout extends Component { 
    constructor(props){
        super(props);       

        this.state = {
            selected:"sidebar-1",    
            color:"purple",        
        }        
        
    }

    handleChangeBackgroundSidebar = (name) =>{        
        this.setState({selected: name});        
    }

    handleChangeColor = (color) =>{
        console.log(color);
        this.setState({color: color});   
    }

    render(){
        

        const { classes, routes, route, hist } = this.props;
        const Component = this.props.component;

       
        
        return(
            <div  className={classes.root}>  
                <Sidebar 
                        logoText={"Lanfeust"}
                        logo={logo} 
                        color={this.state.color}
                        image={_.find(ressourcesBackground,{name: this.state.selected}).src}
                        open={this.props.openSidebar}    
                        handleSideBar = {this.props.handleOpenSidebar}
                        routes = {routes}
                        location = {hist.location.pathname}                        
                />

                <div className={classes.wrapper} ref="mainPanel">
                     <Header />
                    <div className={classes.content}>
                        <div className={classes.container}>
                            <Component 
                                route={route} 
                                color={this.state.color}
                                images={ressourcesBackground}
                                selectedBackground={this.state.selected}
                                handleChangeBackgroundSidebar = {this.handleChangeBackgroundSidebar}
                                handleChangeColor = {this.handleChangeColor}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(defaultLayoutStyle)(DefaultLayout);
