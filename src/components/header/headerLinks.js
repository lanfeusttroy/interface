//components/header/headerLinks.js

import React from "react";
import { Link } from 'react-router-dom';

import _ from 'lodash';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";


// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";

import SvgIcon from '@material-ui/core/SvgIcon';

//core interface
import CustomButton from "components/customButton";

import headerLinksStyle from "assets/components/headerLinksStyle";


class HeaderLinks extends React.Component {
    constructor(props){
        super(props);
    }

    createLink(route, key){
        const { classes } = this.props;

        if(route.header == true){
            return(
                <CustomButton
                    key={key}
                    component={Link} to={route.path}
                    color={window.innerWidth > 959 ? "transparent" : "white"}
                    justIcon={window.innerWidth > 959}
                    simple={!(window.innerWidth > 959)}
                    aria-label={route.sidebarName}
                    className={classes.buttonLink}
                >                    
                    <Icon>{route.icon}</Icon>
                </CustomButton>
            )
        }
    }

    render(){
        const { classes } = this.props;
        return(
           <div>
               { _.map(this.props.routes, (route, key) => {
                    return this.createLink(route, key)         
               })} 

               <CustomButton
                    component={Link} to="/home"
                    color={window.innerWidth > 959 ? "transparent" : "white"}
                    justIcon={window.innerWidth > 959}
                    simple={!(window.innerWidth > 959)}
                    aria-label="Home"
                    className={classes.buttonLink}
                >                    
                    <Icon>{"home"}</Icon>
                </CustomButton>   

               <CustomButton
                    component={Link} to="/useradd"
                    color={window.innerWidth > 959 ? "transparent" : "white"}
                    justIcon={window.innerWidth > 959}
                    simple={!(window.innerWidth > 959)}
                    aria-label="Administration"
                    className={classes.buttonLink}
                >                    
                    <Icon>{"build"}</Icon>
                </CustomButton>                            

           </div>
        )
    }
}

export default withStyles(headerLinksStyle)(HeaderLinks);