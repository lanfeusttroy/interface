import React from "react";
import { connect } from 'react-redux';

import axios from 'axios';

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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

        this.state = {           
            isLoading: false,
            completed: 0,
            SnackbarOpen:false,
            message:'',
            user: {
                nom:'',
                prenom:'',
                username:'',
                email: '',
                presentation: '',
            },
        };

        this.timer = null;
    }

    handleCloseSnackbar=()=>{
        this.setState({	            
            SnackbarOpen:false,	           
        })
    }

    handleChange = (event) => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    progress = () => {
		const { completed } = this.state;
		this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
	};

    componentWillMount(){
        //chargement de la fiche
        this.timer = setInterval(this.progress, 20);
        
        axios.defaults.headers.common['Authorization'] = this.props.token;

        

        axios.get('/user/' + this.props.iduser).then(response => {
            if (response.data) {
                let user = {};
                user["nom"] = response.data.nom;
                user["prenom"] = response.data.prenom;
                user["username"] = response.data.username;
                user["email"] = response.data.email;
                user["presentation"] = response.data.presentation;

                this.setState({	
                    user:user,	                    				
                    isLoading: true
                },()=>{
                    console.log('chargement terminé');	
                    clearInterval(this.timer);	           
                                            
                });                
                
            }
        });
    }

    componentWillUnmount() {
		clearInterval(this.timer);
    }

    handleUpdateForm(user){
        
        axios.post('/user/update', user).then(response => {
            if (response.data) {
                this.setState({	
                    SnackbarOpen:true,
                    message:'Votre profil a été actualisé.'
                });
               
               
            }
        }).catch(error => {
            console.log(error)                
        })
  
    }

    render(){
        
		if(this.state.isLoading === false){
			return (
				this.renderLoadingView()
			)
		}else{
			return (
				this.renderLoadedView()
			)
		}
          
    }


    
    renderLoadingView(){
        const {classes} = this.props;
		return (
			<div className={classes.cssDivMiddle}>				
				<CircularProgress					
					variant="determinate"
					value={this.state.completed}
				/>				
			</div>			
		)
	}

    renderLoadedView(){
        const {classes, color} = this.props;
        const { user } = this.state;

        return(
            <div>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                    open={this.state.SnackbarOpen}
                    autoHideDuration={3000}
                    onClose={this.handleCloseSnackbar}
                   
                    message={<span>{this.state.message}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleCloseSnackbar}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />

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
                                        <ValidatorForm                        
                                            className={classes.form}                        
                                            onSubmit={()=>this.handleUpdateForm(user)}
                                            onError={errors => console.log(errors)}
                                        >
                                            <Grid container className={classes.root} spacing={16}>
                                                <Grid item xs>                                                    
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
                                                <Grid item xs>                                                    
                                                    <TextValidator
                                                        label="Prenom"
                                                        onChange={this.handleChange}
                                                        fullWidth
                                                        required
                                                        name="prenom"
                                                        value={user.prenom}
                                                        validators={['required']}
                                                        errorMessages={['this field is required']}
                                                    />                                                 
                                                </Grid>
                                                <Grid item xs>                                                    
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
                                            <Grid container className={classes.root} spacing={16}>
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
                                            <Grid container className={classes.root} spacing={16}>
                                                <Grid item xs={12}>                                                    
                                                    <TextValidator
                                                        label="Présentation"
                                                        onChange={this.handleChange}
                                                        fullWidth
                                                        multiline
                                                        variant="outlined"
                                                        rows={5}
                                                        required
                                                        name="presentation"
                                                        value={user.presentation}
                                                        validators={['required']}
                                                        errorMessages={['this field is required']}
                                                    />                                                
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.root} spacing={16}>
                                                <Grid item xs={12} >
                                                    <Button
                                                            type="submit"                                                            
                                                            variant="contained"
                                                            color="primary"
                                                            className={classes.submit}
                                                    >
                                                        Update
                                                    </Button>                                                   
                                                </Grid>
                                            </Grid>
                                        </ValidatorForm>
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
            iduser: state.storeLogin.iduser,
            email: state.storeLogin.email,
            token: state.storeLogin.token,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Profile));