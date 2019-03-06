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


import tableCustomStyle from "assets/components/tableCustomStyle";

class TableCustom extends React.Component {
    constructor(props) {
        super(props);    
        
        this.state = {			
            selected:"",            
        }
    } 

    componentWillMount(){
        if(this.props.rowSelect !== ""){
            this.setState({selected: this.props.rowSelect});  
        }
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

    createLine(prop, key){    
        const { classes, color } = this.props;          

        const rowSelected = classNames({            
            [classes[color + "RowSelected"]]: this.isSelected(prop["_id"])
        });



        return(
            <TableRow key={key} onClick={()=>this.selectedItem(prop["_id"])} className={rowSelected} >
                {
                    this.props.tableHead.map((champ, key) => {                           
                        return (                                
                            <TableCell  key={key}>
                                {prop[champ.row]}
                            </TableCell>
                        )   
                    })
                }  
            </TableRow>
        )
    }
    
    render(){
        const { classes, tableHead, tableData, tableHeaderColor } = this.props;
        
        
        return(
            <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                    <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                        <TableRow>
                        {tableHead.map((prop, key) => {
                            return (
                                <TableCell
                                    className={classes.tableCell + " " + classes.tableHeadCell}
                                    key={key}
                                >
                                    {prop.libelle}
                                </TableCell>
                            );
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
        )
    }
}

export default withStyles(tableCustomStyle)(TableCustom);