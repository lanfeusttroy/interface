import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


//type de filtre
const conditions = [
    {
        value:'Egal'				
    },
    {
        value:'Commence'				
    },
    {
        value:'Contient'				
    },
];

const styles = theme => ({   
    paper: {
        margin: 10,
        padding:5,
        width:300
    },
    iconButton:{
        padding:"0px"        
    },
    icon:{
        lineHeight:"1.75"
    }
});



class HeadFilter extends React.Component{
    constructor(props){
        super(props);

        this.state = {	
            open:false, //gestion du popup
            anchorEl: null, //popup   
            filterValue:'',	
            typeFilter:'Contient'          
        }   
    }
    /* Ouverture du popup */
    handleOpen=(event)=>{        
		this.setState({
                open:true, 
                anchorEl: event.currentTarget,
            });		
	}

    /*fermeture du popup*/
    handleClose=()=>{	
        const {champ} = this.props;
        const {typeFilter, filterValue} = this.state;
        this.setState({
                open:false, 
                anchorEl: null
            },()=>{
                // mise en oeuvre du filtre
                this.props.handleUpdateFilter(champ, typeFilter, filterValue);
            });          
    } 

    

    /* Modification de la valeur recherchee */
    handleChangeFilterValue=(event)=> {
        this.setState({filterValue: event.target.value});

    }

    /*Modification du type de filtre */
    handleChangeTypeFilter=(event)=>{
        this.setState({typeFilter: event.target.value});
    }


    render(){
        const {classes, champ, order, key} = this.props;

        return(
            <div>
                {
                    champ.row === order.row && [
                        order.tri === "ASC" ? (
                            <Icon key={"icon_" + key}>keyboard_arrow_up</Icon>
                           
                        ):(
                            <Icon key={"icon_" + key} >keyboard_arrow_down</Icon>                          
                            
                        )
                    ]
                }
                <Button key={"button_" + key} onClick = {()=>this.props.handleOrder(champ.row)}>
                    {champ.row}
                </Button>

                <IconButton onClick={this.handleOpen}>
                    {
                        this.state.filterValue !== '' ?(
                            <Icon color="primary">filter_list</Icon>
                        ):(
                            <Icon>filter_list</Icon>
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
                    <Paper className={classes.paper}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item xs={6}>
                                <TextField   
                                    select                                                     
                                    label="Filtre"                                              
                                    fullWidth                                    
                                    margin="normal"
                                    value={this.state.typeFilter}
							        onChange={this.handleChangeTypeFilter}	                                
                                >
                                {conditions.map(option => (
									<MenuItem key={option.value} value={option.value}>
									{option.value}
									</MenuItem>
								))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField                                                        
                                    label="Value"                                             
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

export default withStyles(styles)(HeadFilter);