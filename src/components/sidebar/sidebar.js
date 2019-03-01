//components/sidebar.js

import React from "react";
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import _ from 'lodash';
import classNames from "classnames";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";

//ressources
import ressourcesBackground  from "components/sidebar/ressourcesBackground";

import sidebarStyle from "assets/components/sidebarStyle";

class Sidebar extends React.Component {
    constructor(props){
        super(props);
    }

    isActive(route, location){
        if(route.path === location)
            return true;
        else
            return false;
    }

    createLink(route){
        const { classes, color, location } = this.props;

       

        let listItemClasses = classNames({
            [" " + classes[color]] : this.isActive(route, location)
          });

       

        return(
            <ListItem button className={classes.itemLink + listItemClasses} component={Link} to={route.path}>
              <ListItemIcon className={classes.itemIcon}  >
                {typeof route.icon === "string" ? (
                  <Icon>{route.icon}</Icon>
                ) : (
                  <route.icon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={route.sidebarName}
                className={classes.itemText + ' ' + classes.whiteFont}
                disableTypography={true}
              />
            </ListItem>
        )
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
                      { _.map(this.props.routes, route => this.createLink(route)) }               
                </div>
                <div
                    className={classes.background}
                    style={{ backgroundImage: "url(" +  _.find(ressourcesBackground,{name: this.props.backgroundSidebar}).src + ")" }}
                />
            </Drawer>
        )
    }

}

const mapStateToProps = (state) => {
    return {
            color: state.storeProfile.color,
            backgroundSidebar: state.storeProfile.backgroundSidebar,
    }
}

export default connect(mapStateToProps)(withStyles(sidebarStyle)(Sidebar));


