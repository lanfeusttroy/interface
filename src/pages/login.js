import React from 'react';


// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';


import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
 

import loginStyle from "assets/pages/loginStyle";

class Login extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            user: {
                email: '',
                password: '',
            },
        }
    }

    handleChange = (event) => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }
 
    
    render(){
        const { classes } = this.props;
        const { user } = this.state;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <ValidatorForm                        
                        className={classes.form}                        
                        onSubmit={()=>this.props.handleValidateLogin(user)}
                        onError={errors => console.log(errors)}
                    >
                        <TextValidator
                            label="Adresse Mail"
                            onChange={this.handleChange}
                            fullWidth
                            required
                            name="email"
                            value={user.email}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />
                        <TextValidator
                            label="Password"
                            onChange={this.handleChange}
                            name="password"
                            type="password"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            fullWidth
                            value={user.password}
                        />
                    
                        <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                        >
                            Sign in
                        </Button>
                    </ValidatorForm>

                    {/*
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign in
                        </Button>
                    </form>
                    */}
                </Paper>
            </main>
        )
    }
}

export default withStyles(loginStyle)(Login);
