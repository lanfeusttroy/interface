import React from "react";
import classNames from "classnames";

import _ from "lodash";

import axios from 'axios';


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


//components
import HeadFilter from "components/tables/filter/headFilter";

//styles
import tableCustomStyle from "assets/components/tableCustomStyle";




class TableFilter extends React.Component{
    constructor(props) {
        super(props);   

        this.state ={
            order: {},
            filters:[],
            isLoading: false,
            page:0,
            data:[],
            completed: 0
        }  
        
        this.timer = null;
       
    }
    componentWillMount() {
        this.state.order = this.props.defaultOrder;
        this.loadData();
    }

    progress = () => {
		const { completed } = this.state;
		this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    };
    
    componentWillUnmount() {
		clearInterval(this.timer);
    }

    /* gestion des filtres */
    handleUpdateFilter = (row, type, value) =>{
       
        let filter = {};
        let filters =[];

        if(value !== ""){
            switch(type){
				case "Contient":                    
                    filter[row] = new RegExp( value , 'i');
				break;
				
				case "Commence":
                    filter[row] = new RegExp( '^' + value , 'i');
				break;
				
				case "Egal":
                    filter[row] = value;
				break;
            }

            filters[row] = filter;

            this.setState({
				filters:filters, 
				isLoading: false,
                page:0,
                data:[],
                completed: 0			
				
				}, ()=>{
					this.loadData();
				}
			);
        }
    }

    /* gestion du tri */
    handleOrder = (filterKey) =>{
        
        let tri = 'ASC';
		
		if(this.state.order.row === filterKey){
			if(this.state.order.tri === "ASC"){
				tri = "DESC";
			}		
        }

        this.timer = setInterval(this.progress, 20);

        this.setState({
                data:[], 
                page:0, 
                order: {row: filterKey, tri: tri},            
                isLoading: false
            },
            () => {	            
                this.loadData();			
            }
        );

    }

    loadData(){
        this.timer = setInterval(this.progress, 20);

        axios.post('/navire/filter',{
            params:{
                order:this.state.order, 
                filters:this.state.filters,                   
                page:this.state.page                    
            }
        }).then(response => {
            if (response.data) {                             
                
                const nextData = response.data;

                this.setState({						
                    isLoading: true,
                    data: [
                        ...this.state.data,
                        ...nextData,
                      ]
                },()=>{
                    console.log('chargement terminé');	
                    clearInterval(this.timer);	           
                                            
                });
            }
        }).catch(error => {
            console.log(error)
        })       
        
    }


    createHead(champ, key){
        
        if (champ.visible === true){
            return(
                <TableCell  key={key}>
                    {    
                        champ.filter === true ?(
                            <HeadFilter                                 
                                champ={champ} 
                                order={this.state.order}
                                handleOrder = {this.handleOrder} 
                                handleUpdateFilter = {this.handleUpdateFilter}
                            />
                        ):(
                            champ.libelle
                        )
                    }
                </TableCell> 
            )
        }
    }

    createLine(enreg, key){
        const { classes, color } = this.props;    

        
        return(
            <TableRow key={key} >
                {
                    this.props.tableHead.map((champ, key) => {                           
                        return (                                
                            <TableCell  key={key}>
                                {enreg[champ.row]}
                            </TableCell>
                        )   
                    })
                }
            </TableRow>
        )
    }

    render(){
       
		if(this.state.isLoading === false){
			return (
				this.renderLoadingView()
			)
		}else{
			return (
				this.renderLoadedView()
			)
		}
          
    }


    
    renderLoadingView(){
        const {classes} = this.props;
        

		return (
			<div className={classes.cssDivMiddle}>				
				<CircularProgress					
					variant="determinate"
					value={this.state.completed}
				/>				
			</div>			
		)
	}


    renderLoadedView(){
        const {classes, tableHeaderColor} = this.props;

        const {data} = this.state;


        
        return(            
            <div className={classes.tableResponsive}>
                <Table className={classes.table} >
                    <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                        <TableRow>
                        {
                            this.props.tableHead.map((champ, key) => {
                                    return this.createHead(champ, key)
                            })
                        }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((enreg, key) => {
                                return this.createLine(enreg, key)
                        })}  
                    </TableBody>
                </Table>
            </div>
        )
    }

}

export default withStyles(tableCustomStyle)(TableFilter);