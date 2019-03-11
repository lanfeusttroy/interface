import React from "react";
import { connect } from 'react-redux';

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


//components
import Card from "components/card/card";
import CardHeader from "components/card/cardHeader";
import CardBody from "components/card/cardBody";
import CardFooter from "components/card/cardFooter";
import CardAvatar from "components/card/cardAvatar";
import CustomButton from "components/customButton";

import SidebarBackground  from "components/sidebarBackground";
import SelectColor from "components/selectColor";


//axios
import axios from 'config/axios';


import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


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

class AddUser extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            user: {
                nom:'',
                prenom:'',
                username:'',
                email: '',
                password: '',
            },
        }
    }

    handleAddUser = (user)=>{
        console.log(user);
        axios.post('/user/add', user).then(response => {
            if (response.data) {
                console.log("ok");        
            }
        }).catch(error => {
            console.log(error)                
        })
    }

    handleChange = (event) => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    render(){
        const {classes, color} = this.props;
        const { user } = this.state;

        return(
            <div>
                <Grid container  spacing={16}>
                    <Grid item xs={6}>
                        <Card>
                            <CardHeader color={color}>
                                <h4 className={classes.cardTitleWhite}>Ajout d'un utilisateur</h4>
                                <p className={classes.cardCategoryWhite}>Complete la fiche</p>
                            </CardHeader>
                            <CardBody>
                                <ValidatorForm                        
                                    className={classes.form}                        
                                    onSubmit={()=>this.handleAddUser(user)}
                                    onError={errors => console.log(errors)}
                                >
                                    <Grid container  spacing={16}>
                                        <Grid item xs={6}>
                                            <TextValidator
                                                label="Username"
                                                onChange={this.handleChange}
                                                fullWidth
                                                required
                                                name="username"
                                                value={user.username}
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                            />
                                        </Grid>                                    
                                    </Grid>
                                    <Grid container  spacing={16}>
                                        <Grid item xs={6}>
                                            <TextValidator
                                                label="Nom"
                                                onChange={this.handleChange}
                                                fullWidth
                                                required
                                                name="nom"
                                                value={user.nom}
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                            />

                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextValidator
                                                label="Prénom"
                                                onChange={this.handleChange}
                                                fullWidth
                                                required
                                                name="prenom"
                                                value={user.prenom}
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container  spacing={16}>
                                        <Grid item xs={12}>
                                            <TextValidator
                                                label="Email"
                                                onChange={this.handleChange}
                                                fullWidth
                                                required
                                                name="email"
                                                value={user.email}
                                                validators={['required', 'isEmail']}
                                                errorMessages={['this field is required', 'email is not valid']}
                                            />
                                        </Grid>                                    
                                    </Grid>
                                    <Grid container  spacing={16}>
                                        <Grid item xs={6}>
                                            <TextValidator
                                                label="Password"
                                                onChange={this.handleChange}
                                                fullWidth
                                                required
                                                name="password"
                                                type="password"
                                                value={user.password}
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                            />

                                        </Grid>
                                        
                                    </Grid>
                                    <Grid container  spacing={16}>
                                        <Grid item xs={12}>
                                        <CustomButton 
                                            color="blue"  
                                            className={classes.title}
                                            type="submit"
                                        >
                                             Create
                                        </CustomButton>
                                            
                                        </Grid>                                    
                                    </Grid>                           
                                    
                                
                                </ValidatorForm>


                                
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

export default connect(mapStateToProps)(withStyles(styles)(AddUser));