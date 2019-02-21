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
        }        
        
    }

    handleChangeBackgroundSidebar = (name) =>{        
        this.setState({selected: name});        
    }

    render(){
        

        const { classes, routes, route } = this.props;
        const Component = this.props.component;
        
        return(
            <div  className={classes.root}>  
                <Sidebar 
                        logoText={"Lanfeust"}
                        logo={logo} 
                        image={_.find(ressourcesBackground,{name: this.state.selected}).src}
                        open={this.props.openSidebar}    
                        handleSideBar = {this.props.handleOpenSidebar}
                        routes = {routes}
                />

                <div className={classes.wrapper} ref="mainPanel">
                     <Header />
                    <div className={classes.content}>
                        <div className={classes.container}>
                            <Component 
                                route={route} 
                                images={ressourcesBackground}
                                selectedBackground={this.state.selected}
                                handleChangeBackgroundSidebar = {this.handleChangeBackgroundSidebar}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(defaultLayoutStyle)(DefaultLayout);
