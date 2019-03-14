//components/tables/tableCustom.js

import React from "react";
import classNames from "classnames";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

//parametre
import proxy_photo from "config/parametres";


import tableCustomStyle from "assets/components/tableCustomStyle";

class TableCustom extends React.Component {
    constructor(props) {
        super(props);    
        
        this.state = {			
            selected:"", 
            boolPicture: false                
        }
    } 

    componentWillMount(){
        if(this.props.rowSelect !== ""){
            this.setState({selected: this.props.rowSelect});  
        }

        if(this.props.boolPicture !== undefined){
            this.setState({boolPicture: this.props.boolPicture});  
        }
    }

  
    
    handleChange = (evt, name) =>{        
        this.setState({ ...this.state, [name]: evt.target.checked });
    }

    selectedItem = (id)=>{       
        this.setState({selected: id});  
        this.props.handleSelect(id);         
    }

    isSelected(key){
        const { classes, color } = this.props;

        if( this.state.selected === key) {
           return color;
        }else{
            return false;
        }
    }

    createLine(data, key){    
        const { classes, color } = this.props;          

        const rowSelected = classNames({            
            [classes[color + "RowSelected"]]: this.isSelected(data["_id"])
        });

        //selection de la premiere photo
        let navirePhoto;
        if (this.props.enabledPicture === true){
            navirePhoto = proxy_photo + 'photos/boatDefault.jpg';
            if(data["photos"][0] !== undefined){
                navirePhoto = proxy_photo + data["photos"][0].uri_file;
            }       
        } 

        if(this.props.boolSelected === true){
            return(                
                <TableRow key={key} onClick={()=>this.selectedItem(data["_id"])} className={rowSelected} >
                    {this.state.boolPicture === true &&(
                        <TableCell  key={key}>
                            <Avatar  src={ navirePhoto } />
                        </TableCell>
                    )}
    
                    {
                        
                        this.props.tableHead.map((champ, key) => {                           
                            return (                                
                                <TableCell  key={key}>
                                    {data[champ.row]}
                                </TableCell>
                            )   
                        })
                    }  
                </TableRow>
            )
            
        }else{
            return(                
                <TableRow key={key} className={rowSelected} >
                    {this.state.boolPicture === true &&(
                        <TableCell  key={key}>
                            <Avatar  src={ navirePhoto } />
                        </TableCell>
                    )}
    
                    {
                        
                        this.props.tableHead.map((champ, key) => {                           
                            return (                                
                                <TableCell  key={key}>
                                    {data[champ.row]}
                                </TableCell>
                            )   
                        })
                    }  
                </TableRow>
            )
        }
        
    }

    createHead(prop, key){
        const { classes} = this.props;

        if(prop.width !== undefined){
            return (
                <TableCell                                        
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    style={{"width":prop.width}}
                    key={key}
                >
                    {prop.libelle}
                </TableCell>
            )
        }else{
            return (
                <TableCell                                        
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                >
                    {prop.libelle}
                </TableCell>
            )
        }
    }
    
    render(){
        const { classes, tableHead, tableData, tableHeaderColor} = this.props;
        
        
        return(
            <div  >
                {
                    this.props.enabledPicture === true &&(
                        <FormControlLabel
                            control={
                            <Switch
                                checked={this.state.checkedA}
                                onChange={(evt) => this.handleChange(evt, 'boolPicture')}                            
                                value="boolPicture"
                                color="primary"
                            />
                            }
                            label="Miniatures"
                        />
                    )
                }

                <div className={classes.tableResponsive} style={{ height: this.props.height }} >
                    <Table className={classes.table} >
                        <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                            <TableRow>
                                {this.state.boolPicture === true &&(
                                    <TableCell
                                        style={{width: '10em'}}                                                        
                                        className={classes.tableCell + " " + classes.tableHeadCell}                                
                                    >
                                    </TableCell>
                                )}

                                {tableHead.map((prop, key) => {
                                    return this.createHead(prop, key)                 
                                
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((prop, key) => {
                                return this.createLine(prop, key)
                            })}                        
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default withStyles(tableCustomStyle)(TableCustom);