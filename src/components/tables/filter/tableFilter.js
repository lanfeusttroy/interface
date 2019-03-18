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
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


//components
import HeadFilter from "components/tables/filter/headFilter";

//styles
import tableCustomStyle from "assets/components/tableCustomStyle";


//parametre
import proxy_photo from "config/parametres";


class TableFilter extends React.Component{
    constructor(props) {
        super(props);   

        this.state ={
            order: {},
            filters:{},
            selected:"", //selection d'une ligne
            isLoading: false, //chargement du composant  
            infinite: false, //mode infinite   
            enabledPicture: false, //mode miniature              
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

    paneDidMount = (node) => {
		if (node) {

            node.addEventListener("scroll", () => {			
				if (
					node.scrollHeight - node.scrollTop === node.clientHeight && 
					node.scrollTop !==0 
					
				) {
                    console.log('update');

                    this.setState({                        
                        isLoading: false,
                        page: this.state.page + 1,                        
                        completed: 0			
                        
                        }, ()=>{
                            this.loadData();
                        }
                    );

                   
				}
			});
        }
    }

    

    handleChange = (evt, name) =>{        
        this.setState({ ...this.state, [name]: evt.target.checked });
    }

    /* gestion des filtres */
    handleUpdateFilter = (row, type, value) =>{
       
        let filter = {};
        let filters = this.state.filters;
        

        if(value !== ""){

            filter["type"] = type;
            filter["value"] = value; 
            
            filters[row] = filter;           
        }else{ 
            delete filters[row];
        }

        this.setState({
            filters:filters, 
            isLoading: false,
            selected:"",
            page:0,
            data:[],
            completed: 0			
            
            }, ()=>{
                this.loadData();
            }
        );
    }

    /* gestion du tri */
    handleOrder = (filterKey) =>{

        
        
        let tri = 'ASC';
        
		
		if(this.state.order.row === filterKey){
			if(this.state.order.tri === "ASC"){
				tri = "DESC";
			}		
        }

        

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

    selectedItem = (id)=>{       
        this.setState({selected: id});  
        let fiche = _.find(this.state.data,{"_id":id});

        this.props.handleSelect(fiche);         
    }

    isSelected(key){
        const { classes, color } = this.props;

        if( this.state.selected === key) {
           return color;
        }else{
            return false;
        }
    }

    loadData(){
        this.timer = setInterval(this.progress, 20);

        
        axios.post('/navire/filter',{
            params:{
                order:this.state.order, 
                filters: JSON.stringify(this.state.filters),                   
                page:this.state.page                    
            }
        }).then(response => {
            if (response.data) {                             
                
                const nextData = response.data;
                clearInterval(this.timer);	           

                this.setState({						
                    isLoading: true,
                    data: [
                        ...this.state.data,
                        ...nextData,
                      ]
                },()=>{
                    console.log('chargement terminé');	                  
                });
            }
        }).catch(error => {
            console.log(error);
            clearInterval(this.timer);
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

        const rowSelected = classNames({            
            [classes[color + "RowSelected"]]: this.isSelected(enreg["_id"])
        });

        
        //selection de la premiere photo
        let navirePhoto;
        if (this.state.enabledPicture === true){
            navirePhoto = proxy_photo + 'photos/boatDefault.jpg';

            
            if(enreg["photos"][0] !== undefined){
                navirePhoto = proxy_photo + enreg["photos"][0].uri_file;
            }            
           
        } 

        
        return(
            <TableRow key={key} onClick={()=>this.selectedItem(enreg["_id"])} className={rowSelected} >
                {this.state.enabledPicture === true &&(
                    <TableCell  key={key}>
                        <Avatar  src={ navirePhoto } />
                    </TableCell>
                )}
                
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
        const {classes, tableHeaderColor} = this.props;

        const {data} = this.state;

        console.log('render');
        
        return( 
            <div>         
                                
                <FormControlLabel
                    control={
                    <Switch
                        checked={this.state.checkedA}
                        onChange={(evt) => this.handleChange(evt, 'enabledPicture')}                            
                        value="enabledPicture"
                        color="primary"
                    />
                    }
                    label="Miniatures"
                />
                
                

                <div className={classes.tableResponsive} style={{ height: this.props.height }} ref={this.paneDidMount}>
                    <Table className={classes.table} >
                        <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                            
                            <TableRow>
                            {this.state.enabledPicture === true &&(
                                <TableCell
                                    style={{width: '10em'}}                                                        
                                    className={classes.tableCell + " " + classes.tableHeadCell}                                
                                >
                                </TableCell>
                                    
                            )}

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

                            {
                                (this.state.isLoading === false)&&(
                                    <TableRow >
                                        <TableCell colSpan={(this.props.tableHead).length}>  
                                                                            
                                            <div className={classes.cssDivMiddle}>				
                                                <CircularProgress					
                                                    variant="determinate"
                                                    value={this.state.completed}
                                                />				
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            }                    
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }

}

export default withStyles(tableCustomStyle)(TableFilter);