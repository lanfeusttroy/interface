import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
    typography: {
      margin: theme.spacing.unit * 2,
    },
  });

class IconFilter extends React.Component{
    constructor(props){
        super(props);

        this.state = {	
            open:false, //gestion du popup
            anchorEl: null,
			actif:""
        }
        
        this.filter = ""; //contient la valeur du filtre
    }

    handleOpen=(event)=>{        
		this.setState({open:true, anchorEl: event.currentTarget,});		
	}
	
	handleClose=()=>{			
		this.setState({open:false, anchorEl: null});
	}


    render(){
        const {classes} = this.props;
        return(
            <div>
                {this.props.champ}
                <IconButton aria-label="Serach" onClick={this.handleOpen}>
                    <Icon>search</Icon>
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
                    <Typography className={classes.typography}>The content of the Popover.</Typography>
                </Popover>
            </div>
        )
    }
} 

export default withStyles(styles)(IconFilter);