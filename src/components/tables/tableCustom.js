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
                                {prop}
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((prop, key) => {
                            return (
                            <TableRow key={key}>
                                {prop.map((prop, key) => {
                                return (
                                    <TableCell className={classes.tableCell} key={key}>
                                    {prop}
                                    </TableCell>
                                );
                                })}
                            </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default withStyles(tableCustomStyle)(TableCustom);