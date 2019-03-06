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
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    },
    iconButton:{
        float:"right",
        padding:"0px",
        color:"#000"      
    },
    iconPavillon:{
        width:"80px",
        height:"auto"
    },
    paper:{
        padding:"10px"
    }
    
  };

class NavireCaracteristique extends React.Component{
    render(){
        const { classes, data } = this.props;
        return (     
            <Card navire >
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
                                        label="Construction"                                            
                                        fullWidth                                            
                                        margin="normal"
                                        value={data["construction"]}       
                                    />   
                                <TextField                                                        
                                        label="Tonnage"                                                    
                                        fullWidth                                            
                                        margin="normal"
                                        value={data["tonnage"]}  
                                    /> 
                                <TextField                                                        
                                        label="Franc bord"                                                
                                        fullWidth                                            
                                        margin="normal"
                                        value={data["franc_bord"]}  
                                    />
                                <TextField                                                        
                                        label="Tirant d'eau"                                                
                                        fullWidth                                            
                                        margin="normal"
                                        value={data["tirant_eau"]}  
                                    />
                                <TextField                                                        
                                        label="Nbre d'hélice"                                                
                                        fullWidth                                            
                                        margin="normal"
                                        value={data["nbr_helice"]}  
                                    />
                                <TextField                                                        
                                        label="Vitesse"                                                
                                        fullWidth                                            
                                        margin="normal"
                                        value={data["vitesse"]}  
                                    />
                            </Paper>
                        </Grid>
                        <Grid item xs={6} >
                            <Paper className={classes.paper}>
                                <TextField                                                        
                                        label="Nbr de pont"                                            
                                        fullWidth                                            
                                        margin="normal"
                                        value={data["nbr_pont"]} 
                                    />   
                                <TextField                                                        
                                        label="Tonnage net"                                                    
                                        fullWidth                                            
                                        margin="normal"
                                        value={data["tonnage_net"]} 
                                    /> 
                                <TextField                                                        
                                        label="Largeur"                                                
                                        fullWidth                                            
                                        margin="normal"
                                        value={data["largeur"]} 
                                    />
                                <TextField                                                        
                                        label="Long hors tout"                                                
                                        fullWidth                                            
                                        margin="normal"
                                        value={data["long_hors_tout"]} 
                                    />
                                <TextField                                                        
                                        label="Type d'hélice"                                                
                                        fullWidth                                            
                                        margin="normal"
                                        value={data["type_helice"]} 
                                    />                            
                            </Paper>
                        </Grid>
                    </Grid>  
                </CardBody>
            </Card>
            
        )
    }

}



export default withStyles(styles)(NavireCaracteristique);