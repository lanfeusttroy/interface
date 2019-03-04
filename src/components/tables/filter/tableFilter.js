//components/tables/infiniteTable.js

import React from "react";
import classNames from "classnames";

import _ from "lodash";

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
            order: {}, 
			filters:[],
            selected:[],
            enabledFilters:[],
            data:[]
        }
    }
    componentWillMount() {
        this.state.order = this.props.defaultOrder;

        //Gestion du tri

        let results =  _.sortBy(this.props.tableData, [this.state.order.champ]);

        if(this.state.order.tri === 'DESC'){
            results = results.reverse(); 
        }

        this.state.data = results;
    }

    handleOrder = (filterKey) =>{
        const data = this.state.data;

        let tri = 'ASC';
		
		if(this.state.order.champ === filterKey){
			if(this.state.order.tri === "ASC"){
				tri = "DESC";
			}		
        }

      

        let results =  _.sortBy(data, [filterKey]);

        if(tri === 'DESC'){
            results = results.reverse(); 
        }
       
        
        this.setState({           
            order: {champ: filterKey, tri: tri},      
            data: results     
        })

       
    }

    handleChangeFilter = (champ, filter, filterValue) =>{
        const data = this.props.tableData;
        
        let filters = this.state.filters;

        if (filterValue !== ''){
            filters[champ] = filterValue;
        }else{
            delete filters[champ];
        }

             

        const results = _.filter(data, function(obj) {
            let strData = ((obj[champ]).toString()).toLowerCase();

            if(strData.indexOf(filterValue) !== -1){
                return obj;
            }

           
        });

                

        this.setState({
            filters:filters,
            data: results
        });
        
    }

    selectedItem = (id)=>{
       

        if(this.state.selected.includes(id)){
            let selectedElement = this.state.selected;
            let indexElement = selectedElement.indexOf(id);
            		
			selectedElement.splice(indexElement, 1);			
            this.setState({selected: selectedElement });
            
        }else{
            this.setState({selected: [...this.state.selected, id]});
        }
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

    isSelected(key){
        const { classes, color } = this.props;

        if( this.state.selected.includes(key) === true) {
           return color;
        }else{
            return false;
        }
    }

    createLine(prop, key){
        const { classes, color } = this.props;

           

        const rowSelected = classNames({            
            [classes[color + "RowSelected"]]: this.isSelected(key)
        });
        

        return(

            <TableRow key={key} onClick={()=>this.selectedItem(key)} className={rowSelected}>
                {
                    this.props.tableHead.map((champ, key) => {
                        
                            return (
                                champ.visible === true &&(
                                    <TableCell  key={key}>
                                        {prop[champ.row]}
                                    </TableCell>
                                )
                            )                                           
                        
                    })
                }                  
                
            </TableRow>
        )
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
                        {this.state.data.map((prop, key) => {
                            return this.createLine(prop, key)
                        })}
                    </TableBody>
                </Table>

            </div>
        )
    }
}

export default withStyles(tableCustomStyle)(TableFilter);