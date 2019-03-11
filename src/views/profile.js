import React from "react";
import { connect } from 'react-redux';

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


//components
import Card from "components/card/card";
import CardHeader from "components/card/cardHeader";
import CardBody from "components/card/cardBody";
import CardFooter from "components/card/cardFooter";
import CardAvatar from "components/card/cardAvatar";
import CustomButton from "components/customButton";

import SidebarBackground  from "components/sidebarBackground";
import SelectColor from "components/selectColor";


import avatar from "assets/img/faces/inconnu.jpg";

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
    }
  };

class Profile extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const {classes, color} = this.props;
        return(
            <div>
                <Grid container  spacing={16}>
                    <Grid item xs={8}>
                        <Card>
                            <CardHeader color={color}>
                                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                                <p className={classes.cardCategoryWhite}>Complete your profile</p>
                            </CardHeader>
                            <CardBody>
                                <Grid container  spacing={16}>
                                    <Grid item xs={3}>
                                        <SidebarBackground />
                                        <SelectColor />

                                    </Grid>
                                    <Grid item xs={9}>
                                         <form className={classes.container} noValidate autoComplete="off">
                                            <Grid container className={classes.root} spacing={16}>
                                                <Grid item xs>                                                    
                                                    <TextField                                                        
                                                        label="Nom"
                                                        className={classes.textField}                
                                                        fullWidth
                                                        required
                                                        margin="normal"
                                                    />                                                
                                                </Grid>
                                                <Grid item xs>                                                    
                                                    <TextField                                                        
                                                        label="Prénom"
                                                        className={classes.textField}                
                                                        fullWidth
                                                        required
                                                        margin="normal"
                                                    />                                                
                                                </Grid>
                                                <Grid item xs>                                                    
                                                    <TextField                                                        
                                                        label="Username"
                                                        className={classes.textField}                
                                                        fullWidth
                                                        required
                                                        margin="normal"
                                                    />                                                
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.root} spacing={16}>
                                                <Grid item xs={8}>                                                    
                                                    <TextField                                                        
                                                        label="Email"
                                                        className={classes.textField}                
                                                        fullWidth
                                                        required
                                                        margin="normal"
                                                    />                                                
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.root} spacing={16}>
                                                <Grid item xs={12}>                                                    
                                                    <TextField                                                        
                                                        label="Présentation"
                                                        className={classes.textField}                
                                                        fullWidth
                                                        multiline
                                                        rows="4"
                                                        margin="normal"
                                                    />                                                
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.root} spacing={16}>
                                                <Grid item xs={12} >
                                                    <CustomButton color="blue"  className={classes.title}>
                                                        Update
                                                    </CustomButton>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Grid>
                            </CardBody>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card profile>
                            <CardAvatar profile>
                            
                                <img src={avatar} alt="..." />
                            
                            </CardAvatar>
                            <CardBody profile>
                                <h6 className={classes.cardCategory}>SERVICE INFORMATIQUE</h6>
                                <h4 className={classes.cardTitle}>Lanfeust</h4>
                                <p className={classes.description}>
                                    Exemple de présentation du poste ou de la fonction au sein de l'entreprise.
                                </p>
                            
                            </CardBody>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
            color: state.storeProfile.color,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Profile));