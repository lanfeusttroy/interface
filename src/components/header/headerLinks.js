//components/header/headerLinks.js

import React from "react";
import { Link } from 'react-router-dom'

import _ from 'lodash';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

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
    render(){
        const { classes } = this.props;
        return(
           <div>
               <div className={classes.manager}>

                    <CustomButton                   
                        color={window.innerWidth > 959 ? "transparent" : "white"}
                        justIcon={window.innerWidth > 959}
                        simple={!(window.innerWidth > 959)}
                        
                        aria-haspopup="true"                    
                        className={classes.buttonLink}
                    >
                        <Notifications className={classes.icons} />
                        <span className={classes.notifications}>5</span>
                    </CustomButton>
               </div>
               
                    <CustomButton
                        component={Link} to="/home"
                        color={window.innerWidth > 959 ? "transparent" : "white"}
                        justIcon={window.innerWidth > 959}
                        simple={!(window.innerWidth > 959)}
                        aria-label="Home"
                        className={classes.buttonLink}
                    >
                        <SvgIcon className={classes.icons}>
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        </SvgIcon>
                        
                    </CustomButton>
                    <CustomButton
                        component={Link} to="/profile"
                        color={window.innerWidth > 959 ? "transparent" : "white"}
                        justIcon={window.innerWidth > 959}
                        simple={!(window.innerWidth > 959)}
                        aria-label="Person"
                        className={classes.buttonLink}
                    >
                        <Person className={classes.icons} />
                        
                    </CustomButton>
               

           </div>
        )
    }
}

export default withStyles(headerLinksStyle)(HeaderLinks);