import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';


//style
import olPopupStyle from "assets/components/olPopupStyle";

class OlPopup extends React.Component{
    constructor(props){
        super(props);

              
    }

    handleTest(){
        console.log('ok');
    }

    render(){
        const {classes, open} = this.props;
                

        return(
            <div>
            {
                (open === true) &&(
                    <div ref={this.props.refPopup} className={classes.popup}> 
                        <IconButton onClick={e => this.handleTest()}><Icon >search</Icon>  </IconButton>
                                             
                        <div className={classes.content}>
                            {this.props.message}
                        </div>                
                    </div>
                )
            }
            {this.props.children}
            </div>
        )
    }
}

export default withStyles(olPopupStyle)(OlPopup);