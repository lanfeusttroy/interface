import React from "react";

import { connect } from 'react-redux';
import classNames from "classnames";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

//components
import Card from "components/card/card";
import CardHeader from "components/card/cardHeader";
import CardBody from "components/card/cardBody";
import CardFooter from "components/card/cardFooter";
import CardAvatar from "components/card/cardAvatar";

import pavillon from "assets/img/pavillon_fr.png";
import navire from "assets/img/test.jpg";

const styles = {
    
    iconPavillon:{
        width:"80px",
        height:"auto"
    },
    paper:{
        padding:"10px"
    }
    
  };

class NavireIdentification extends React.Component{
    render(){
        const { classes } = this.props;
        return (  
            <Card navire>
                <CardAvatar navire>                            
                    <img src={navire} alt="..." />                            
                </CardAvatar>
                <CardBody>
                    <Grid container  spacing={16}>
                        <Grid item xs={6} >
                            <img src={pavillon} className={classes.iconPavillon} alt="..." /> 
                        </Grid>
                    </Grid>
                    <Grid container  spacing={16}>
                        <Grid item xs={6} >
                            <Paper className={classes.paper}>
                                <TextField                                                        
                                        label="N° IMO"                                            
                                        fullWidth                                            
                                        margin="normal"
                                    />   
                                <TextField                                                        
                                        label="MMSI"                                                
                                        fullWidth                                            
                                        margin="normal"
                                    />
                                <TextField                                                        
                                        label="Nom"                                                    
                                        fullWidth                                            
                                        margin="normal"
                                    /> 
                                <TextField                                                        
                                        label="Pavillon"                                                
                                        fullWidth                                            
                                        margin="normal"
                                    />
                                <TextField                                                        
                                        label="Type OTAN"                                                
                                        fullWidth                                            
                                        margin="normal"
                                    />
                                <TextField                                                        
                                        label="Séquence"                                                
                                        fullWidth                                            
                                        margin="normal"
                                    />
                                <TextField                                                        
                                        label="Indicatif"                                                
                                        fullWidth                                            
                                        margin="normal"
                                    />
                                <TextField                                                        
                                        label="SCONUM"                                                
                                        fullWidth                                            
                                        margin="normal"
                                    />
                                
                            </Paper>
                        </Grid> 
                                 
                    </Grid>  
                </CardBody>
            </Card>
            
        )
    }

}



export default withStyles(styles)(NavireIdentification);