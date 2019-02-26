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
import IconFilter from "components/tables/filter/iconFilter";

import tableCustomStyle from "assets/components/tableCustomStyle";

//css
import "components/tables/filter/tableFilter.css";




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


class TableFilter extends React.Component{
    constructor(props) {
        super(props);   
        
        this.state = {
            order: {"champ":"Country", "tri":"ASC"}, 
			filters:[],
            selected:[],
            enabledFilters:[]
        }
    }
    componentWillMount() {
        this.state.order = this.props.defaultOrder;
    }

    handleOrder = (filterKey) =>{
        
        let tri = 'ASC';
		
		if(this.state.order.champ === filterKey){
			if(this.state.order.tri === "ASC"){
				tri = "DESC";
			}		
        }
        
        this.setState({           
            order: {champ: filterKey, tri: tri},           
        })

       
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
    
    createCell(champ){
        if (champ.visible === true){
            return (
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
    }
    
    render(){
        const { classes, tableHeaderColor } = this.props;
        return(
            <div className={classes.tableResponsive}>
                <Table className={classes.table} >
                    <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                        <TableRow>
                        {
                            this.props.tableHead.map((champ, key) => {
                                    return this.createCell(champ)
                            })
                        }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.tableData.map((prop, key) => {
                            return (
                                <TableRow key={key}>
                                    {
                                        this.props.tableHead.map((champ, key) => {
                                            
                                                return (
                                                    champ.visible === true &&(
                                                        <TableCell className={classes.tableCell} key={key}>
                                                            {prop[champ.row]}
                                                        </TableCell>
                                                    )
                                                )                                           
                                            
                                        })
                                    }                  
                                    
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

            </div>
        )
    }
}

export default withStyles(tableCustomStyle)(TableFilter);