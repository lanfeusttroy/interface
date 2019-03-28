import React from "react";
import classNames from "classnames";

import _ from 'lodash';


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


//style
import 'assets/css/olPopup.css';
import olPopupStyle from "assets/components/olPopupStyle";
import { isNull } from "util";

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
    
    obj2fiche(messageOlPopup){
        const {classes, color} = this.props;
        
        if (messageOlPopup != null){
            console.log(Object.keys(messageOlPopup));       
            return(
                <Table className={classes.table} >
                    <TableBody className={classes.tableBody}>
                        <TableRow>
                            <TableCell>IMO</TableCell>
                            <TableCell>{messageOlPopup["ident"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>MMSI</TableCell>
                            <TableCell>{messageOlPopup["mmsi"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>OTAN</TableCell>
                            <TableCell>{messageOlPopup["type_otan"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Rte</TableCell>
                            <TableCell>{messageOlPopup["rte"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Vitesse</TableCell>
                            <TableCell>{messageOlPopup["vit"]}</TableCell>
                        </TableRow>
                       
                    </TableBody>
                </Table>

            )
          
            
        }
      
    }
    

    render(){
        const {classes, open, color, messageOlPopup} = this.props;
        
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
                        {this.obj2fiche(messageOlPopup)}
                    </div>                
                </div>
                
            }
            {this.props.children}
            </div>
        )
    }
}

export default withStyles(olPopupStyle)(OlPopup);