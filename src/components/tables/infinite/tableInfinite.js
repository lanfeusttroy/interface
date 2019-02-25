//components/tables/infiniteTable.js

import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//components
import IconFilter from "components/tables/infinite/iconFilter";

import tableCustomStyle from "assets/components/tableCustomStyle";

//css
import "components/tables/infinite/tableInfinite.css";


//format json
const tableHead = [
    {
        row: 'ID',
        filter:true
    }, 
    {
        row: 'Country',
        filter:true
    },    
    {
        row: 'City',
        filter:false
    },
    {
        row: 'Salary',
        filter:false
    },    
];


const listFilterValue = [
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


class TableInfinite extends React.Component{
    constructor(props) {
        super(props);   
        
        this.state = {
            order: {"champ":"Country", "tri":"ASC"}, 
			filters:[],
            selected:[],
            enabledFilters:[]
        }
    }

    handleOrder = (filterKey, order) =>{
        console.log("filter");
    }

    handleChangeFilter = (champ, filter, filterValue) =>{
        
        let filters = this.state.filters;

        if (filterValue !== ''){
            filters[champ] = filterValue;
        }else{
            delete filters[champ];
        }
        

        this.setState({
            filters:filters
        });
        
    }
    
    
    render(){
        const { classes, tableHeaderColor } = this.props;
        return(
            <div className={classes.tableResponsive}>
                <Table className={classes.table} >
                    <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                        <TableRow>
                        {
                            tableHead.map((champ, key) => {  
                                    return(
                                        <TableCell>
                                            {
                                                champ.filter === true ?(
                                                    <IconFilter 
                                                        champ={champ.row} 
                                                        order={this.state.order}
                                                        listFilter = {listFilterValue}
                                                        handleOrder = {this.handleOrder} 
                                                        handleChangeFilter = {this.handleChangeFilter}
                                                        defaultFilter = {"Contient"}
                                                    />
                                                ):(
                                                    champ.row
                                                )
                                            }
                                        </TableCell>     
                                    )
                                }
                                                  
                            )
                        }
                        </TableRow>
                    </TableHead>
                </Table>

            </div>
        )
    }
}

export default withStyles(tableCustomStyle)(TableInfinite);