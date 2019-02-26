import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
    typography: {
      margin: theme.spacing.unit * 2
    },
    paper: {
		margin: 10,
		padding:5,
		height:90,
		width:300
	},
    iconButton:{
        padding:"0px"        
    },
    icon:{
        lineHeight:"1.75"
    }
  });



class IconFilter extends React.Component{
    constructor(props){
        super(props);

        this.state = {	
            open:false, //gestion du popup
            anchorEl: null,
            filterValue:'',	
            filter:'Contient' 

        }      
    }

    componentWillMount() {
        this.setState({filter:this.props.defaultFilter});		
    }

    handleOpen=(event)=>{        
		this.setState({open:true, anchorEl: event.currentTarget,});		
	}
	
	handleClose=()=>{			
        this.setState({open:false, anchorEl: null});      
        
        this.props.handleChangeFilter(this.props.champ, this.state.filter, this.state.filterValue);
        
    } 

   

    
    handleChangeFilterValue=(event)=> {
        this.setState({filterValue: event.target.value});

    }

    handleChangeFilter=(event)=>{
        this.setState({filter: event.target.value});
    }


    render(){
        const {classes} = this.props;
        return(
            <div>
                {
                    this.props.champ === this.props.order.champ && [
                        this.props.order.tri === "ASC" ? (
                            <Icon className={classes.icon}>keyboard_arrow_down</Icon>
                           
                        ):(
                            <Icon className={classes.icon}>keyboard_arrow_up</Icon>
                            
                        )
                    ]
                }
               
                <Button onClick = {()=>this.props.handleOrder(this.props.champ)}>
                    {this.props.champ}
                </Button>
                
              
                
                <IconButton aria-label="Search" className={classes.iconButton} onClick={this.handleOpen}>
                    {
                        this.state.filterValue !== '' ?(
                            <Icon color="primary">search</Icon>
                        ):(
                            <Icon>search</Icon>
                        )
                    }                    
                </IconButton>

                <Popover 
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    >
                    <Paper className={classes.paper} >
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item xs={6}>
                                <TextField   
                                    select                                                     
                                    label="Filtre"
                                    className={classes.textField}                
                                    fullWidth                                    
                                    margin="normal"
                                    value={this.state.filter}
							        onChange={this.handleChangeFilter}	                                
                                >
                                {this.props.listFilter.map(option => (
									<MenuItem key={option.value} value={option.value}>
									{option.value}
									</MenuItem>
								))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField                                                        
                                    label="Value"
                                    className={classes.textField}                
                                    fullWidth
                                    value= {this.state.filterValue}
                                    margin="normal"
                                    onChange={this.handleChangeFilterValue}
                                />
                            </Grid>
                        </Grid>
                    </Paper>              
                    
                </Popover>
            </div>
        )
    }
} 

export default withStyles(styles)(IconFilter);