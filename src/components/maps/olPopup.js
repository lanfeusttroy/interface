import React from "react";
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';


//style
import 'assets/css/olPopup.css';
import olPopupStyle from "assets/components/olPopupStyle";

class OlPopup extends React.Component{
    constructor(props){
        super(props);              
    }

    

    handleClick = e => {           
        this.props.close();
    }

    /*permet de contourner la gestion des events pour la classe overlay de openlayer*/
    convertToClick = e => {        
        const evt = new MouseEvent('click', { bubbles: true });
        evt.stopPropagation = () => {};
        e.target.dispatchEvent(evt);
    }
    
    

    render(){
        const {classes, open, color} = this.props;
        
        let display = 'none';
        if(open=== true){
            display = '';
        }

        const popupBackgroundClasses = classNames({
            [classes[color + "Background"]]: color
        });

        return(
            <div>
            {
                
                <div ref={this.props.refPopup} style={{display:display}} className={'ol-popup ' + classes.popup + ' ' + popupBackgroundClasses } onMouseUp={this.convertToClick}> 
                    <div className={classes.buttonAlignRight}>
                        <IconButton onClick={this.handleClick} ><Icon fontSize="small">close</Icon>  </IconButton>
                    </div>           
                    <div className={classes.content}>
                        {this.props.message}
                    </div>                
                </div>
                
            }
            {this.props.children}
            </div>
        )
    }
}

export default withStyles(olPopupStyle)(OlPopup);