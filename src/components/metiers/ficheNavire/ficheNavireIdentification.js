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

//parametre
import proxy_photo from "config/parametres";

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
        const { classes, data, boolPhoto = true, boolPavillon = true, title='' } = this.props;

                
        //selection de la premiere photo
        let navirePhoto = proxy_photo + 'photos/boatDefault.jpg';
        
        if(data["photos"][0] !== undefined){
            navirePhoto = proxy_photo + data["photos"][0].uri_file;
        }
           

        return (  
            <Card navire>
                {
                    title !==''  && (
                        <CardHeader>
                            {title}
                        </CardHeader>
                    )
                }
                {
                    boolPhoto === true && (
                        <CardAvatar navire>                            
                            <img src={navirePhoto} alt="..." />                            
                        </CardAvatar>
                    )
                }
                <CardBody>
                    {
                        boolPavillon === true && (
                            <Grid container  spacing={16}>
                                <Grid item xs={6} >
                                    <img src={pavillon} className={classes.iconPavillon} alt="..." /> 
                                </Grid>
                            </Grid>
                        )
                    }
                    <Grid container  spacing={16}>
                        <Grid item xs={6} >
                            <Paper className={classes.paper}>
                                <TextField                                                        
                                        label="N° IMO"                                            
                                        fullWidth                                            
                                        margin="normal"                                        
                                        value={data["imo"]}                                       

                                    />   
                                <TextField                                                        
                                        label="MMSI"                                                
                                        fullWidth                                            
                                        margin="normal"
                                        value={data["mmsi"]}     
                                    />
                                <TextField                                                        
                                        label="Nom"                                                    
                                        fullWidth                                            
                                        margin="normal"
                                        value={data["nom"]}     
                                    /> 
                                <TextField                                                        
                                        label="Pavillon"                                                
                                        fullWidth                                            
                                        margin="normal"
                                        value={data["pavillon"]}     
                                    />
                                
                                
                            </Paper>
                        </Grid> 
                        <Grid item xs={6} >
                            <Paper className={classes.paper}>
                                
                                <TextField                                                        
                                        label="Type OTAN"                                                
                                        fullWidth                                            
                                        margin="normal"
                                        value={data["type_otan"]}     
                                    />
                                <TextField                                                        
                                        label="Séquence"                                                
                                        fullWidth                                            
                                        margin="normal"
                                        value={data["sequence"]}     
                                    />
                                <TextField                                                        
                                        label="Indicatif"                                                
                                        fullWidth                                            
                                        margin="normal"
                                        value={data["indicatif"]}     
                                    />
                                <TextField                                                        
                                        label="SCONUM"                                                
                                        fullWidth                                            
                                        margin="normal"
                                        value={data["sconum"]}     
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