import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from "lodash";

//Style
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

//GRID
import Grid from '@material-ui/core/Grid';

import Avatar from '@material-ui/core/Avatar';

//Menu
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import ListItemText from '@material-ui/core/ListItemText';

//Tables
import Table from '@material-ui/core/Table';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//Paper
import Paper from '@material-ui/core/Paper';

//Checkbox
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

//Button
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

//Popper
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//Chip
import Chip from '@material-ui/core/Chip';

//Tooltip
import Tooltip from '@material-ui/core/Tooltip';

//Toolbar
import Toolbar from '@material-ui/core/Toolbar';

//Typographie
import Typography from '@material-ui/core/Typography';

//Progression
import CircularProgress from '@material-ui/core/CircularProgress';

//Icons
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';

import searchOutlined from '@material-ui/icons/SearchOutlined';
import AccountCircle from '@material-ui/icons/AccountCircle';

//BASE DE DONNES
import axios from 'axios';

const styles = theme => ({
	title: {
		fontSize:'0.9rem',
		color: 'rgba(0, 0, 0, 0.54)'
	},
	paper: {
		margin: 10,
		padding:5,
		height:90,
		width:300
	},
	card: {
		backgroundColor: '#123456'
	},
	media: {
		height: 50,
	},
	progress: {
		margin: theme.spacing.unit * 2,
	},
	
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},	
	popper: {
		zIndex: 1,			
	},
	tableHeader:{
		overflow: "auto",
		backgroundColor: '#3f51b5',
		
		boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
	},
	lineHeader:{
		color:'#fff',
		opacity:'0.7',		
	},
	lineHeaderFilterEnabled:{
		color:'#fff',
		opacity:'1',	
	},
	button: {
		margin: theme.spacing.unit,
		
	},
	chip: {
		margin: theme.spacing.unit,
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit,
	},
	iconSmall: {
		fontSize: 20,
	},
	cssTypeFilter:{
		width:130
	},
	cssLineSelected:{
		backgroundColor:'#123456',
		color:'#fff'
	},
	cssLine:{
		color:'#000'
	},
	cssIcon: {		
		padding: '0px',	
		margin:'5px',
		color:'#fff',
		'&:hover': {			
			opacity:'0.3'
		},
	},
	cssIconEnabled: {		
		padding: '0px',
		margin:'5px',
		color:'#123456',
		'&:hover': {
			backgroundColor: "#f2f2f2",
		},
	},
	cssDivMiddle:{
		height:'100%', 
		display: 'flex', 
		justifyContent: 'center', 
		alignItems: 'center'
	},
});




class Referentiel extends Component {
	constructor(props){
		super(props);	
		
		this.state ={
			isLoading: false, //Chargement des données
			isUpdate: false, // maj de la liste
			completed:0,
			fiches:[], //fiche affichées
			selected:[], //fiche sélectionnées
			mode: 'simple', //mode de sélection simple | multi
			page:0, //nombre de page 
			nbrelement:50, //nombre element chargé à chaque requete
			champs: [ //entete
				{champ:"IMO", label: "IMO"}, 
				{champ:"MMSI", label:"MMSI"}, 
				{champ:"Nom", label:"Nom"}, 
				{champ:"Pavillon", label:"Pavillon"}, 
				{champ:"Type_OTAN", label:"Type OTAN"}
			],
			order: {"champ":"IMO", "tri":"asc"},//order by 
			
			filters:{},//les filtres apppliqués
			filtersEnabled:[], // les filtres actifs
			valueFilter:"",
			typeFilter:"Contient",
			
			infinite: false, //chargement en continue des elements
			
			anchorEl:null,				
			open: false, //Popper
			placement: 'bottom', //Popper
			
		}
		
		this.url = "http://127.0.0.1/media/photimo";
		this.classes = this.props.classes;
		this.champFilter = ""; //contient le champ du filtre
	}
	
	componentWillMount() {
		//Chargement initial
		this.loadFiches();
	}
	
	componentDidMount(){
		this.timer = setInterval(this.progress, 20);
		
		
				
		
			// this.refs.listeNavire.addEventListener("scroll", () => {			
				// if (
					// this.refs.listeNavire.scrollHeight - this.refs.listeNavire.scrollTop === this.refs.listeNavire.clientHeight && 
					// this.refs.listeNavire.scrollTop !==0 
					
				// ) {
					// this.setState({				
						// isUpdate: false,					
						// page: this.state.page + 1
					// }, ()=>{
						// this.loadFiches();
					// })				
				// }
			// });
		
							
	}
	
	componentWillUnmount() {
		clearInterval(this.timer);
	}
	
	progress = () => {
		const { completed } = this.state;
		this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
		
	};
	
	handleOrder = (champ) =>{
		
		let tri = 'asc';
		
		if(this.state.order.champ === champ){
			if(this.state.order.tri === "asc"){
				tri = "desc"
			}		
		}
		
		this.timer = setInterval(this.progress, 20);
		
		this.setState({
				fiches:[], 
				page:0, 
				order: {champ: champ, tri: tri},
				completed:0,
				isLoading: false,
				open: false
			},
			() => {		
				
				this.loadFiches("loading");			
			}
		);
		
	}
	
	getValueFiltre(champ){
		let filters = this.state.filters;				
		let value = "";
		
		if(Object.keys(filters).length !== 0){
			
			if(filters[champ]){
				if (Object.keys(filters[champ]).includes("$like")){
					value = (filters[champ]['$like']).replace(/%/g, '');
				}
				
				if (Object.keys(filters[champ]).includes("$eq")){
					value = (filters[champ]['$eq']);
				}
				
			}
		}
		
		
		
		return value;
	}
	
	getTypeFiltre(champ){
		let filters = this.state.filters;
		let type = this.state.typeFilter;
		
		if(Object.keys(filters).length !== 0){
			if(filters[champ]){				
				if (Object.keys(filters[champ]).includes("$like")){
					
					if(filters[champ]['$like'].slice(0,1) === "%" &&  filters[champ]['$like'].slice(-1) === "%"){
						type = "Contient";						
					}
					
					if(filters[champ]['$like'].slice(0,1) !== "%" &&  filters[champ]['$like'].slice(-1) === "%"){
						type = "Commence";						
					}
				}
				
				if (Object.keys(filters[champ]).includes("$eq")){
					type = "Egal";	
				}
			}
			
		}
		
		
		return type;
	}
	
	handleOpenPopper = (champ) => event => {
		
		
		//Recherche de la valeur du filtre 
		let value = this.getValueFiltre(champ);
		
		//Recherche le type de filtre
		let type = this.getTypeFiltre(champ);	
		
		
		const { currentTarget } = event;	
		
		
		this.setState({
			anchorEl: currentTarget,
			valueFilter: value,
			typeFilter: type,
			open: !this.state.open
			
		})
		
		
		this.champFilter = champ;
		
	}
	
		
	handleClosePopper=()=>{				
		this.setState({
			open:false,
			valueFilter:""
		});
	}
	
	handleFilterValue = (event) => {		
		this.setState({
			valueFilter:event.target.value
		});
	}
	
	handleFilterType = (event) => {		
		this.setState({
			typeFilter:event.target.value
		});
	}
	
	
	
	handleFilterValidate = () =>{
		if(this.valueFilter !== ""){
			
			let filters = this.state.filters;
		
			
			let filtersEnabled = this.state.filtersEnabled;
			
			let filterKey = this.champFilter;
			let filterValue = this.state.valueFilter;
			let filterType = this.state.typeFilter;
			
			let newFilters = [];
			let newFiltre = {};
			
			
			let valueFiltre = {};
			
			switch(filterType){
				case "Contient":
					valueFiltre['$like'] = "%" + filterValue + "%";
				break;
				
				case "Commence":
					valueFiltre['$like'] =  filterValue + "%";
				break;
				
				case "Egal":
					valueFiltre['$eq'] =  filterValue;
				break;
			}
			
						
						
			if (filterValue !== ""){
				
				filtersEnabled.push(filterKey);
				filters[filterKey] = valueFiltre;
				
			}else{				
				
				delete filters[filterKey];
								
				if(filtersEnabled.indexOf(filterKey) !== -1){
					filtersEnabled.splice(filtersEnabled.indexOf(filterKey), 1);	
				}
			}
			
			this.timer = setInterval(this.progress, 20);
			

			this.setState({
				filters:filters, 
				filtersEnabled:filtersEnabled, 
				page:0, fiches:[],
				open:false, 
				isLoading: false,
				completed:0,
				typeFilter:"Contient"
				}, ()=>{
					this.loadFiches();
				}
			);
		}
	}
	
	handleSelectedItem=(id)=>{	

		
		
		if ( this.state.mode === 'simple'){
			this.setState({selected: [id]},()=>{
				const action = { type: "FICHE_NAVIRE", idnavire: id };
				this.props.dispatch(action);
			});
		
		}else{
			if(this.state.selected.includes(id)){
				//remove element	
				let selectedElement = this.state.selected;				
				let indexElement = selectedElement.indexOf(id);
				
				selectedElement.splice(indexElement, 1);
				
				
				
				this.setState({selected: selectedElement });
				
			}else{		
				this.setState({selected: [...this.state.selected, id]});
			}				
		}
	}
	
	paneDidMount = (node) => {
		if (node) {
			//node.addEventListener('scroll', () => console.log('scroll!'));
			
			node.addEventListener("scroll", () => {			
				if (
					node.scrollHeight - node.scrollTop === node.clientHeight && 
					node.scrollTop !==0 
					
				) {
					if(this.state.isUpdate === false){
						
						
						this.setState({				
							isUpdate: true,					
							page: this.state.page + 1
						}, ()=>{
							
							this.timer = setInterval(this.progress, 20);
							this.loadFiches();
						})	
					}
				}
			});
			
		}
	};
		
	
	loadFiches(){
		
		axios.post('/navirecivil/filter',{
				params:{
					order:this.state.order,
					nbrelement:this.state.nbrelement,
					page:this.state.page,
					filters:JSON.stringify(this.state.filters)
				}
			}).then(response => {
				
			
				const nextFiches = response.data;
				
				
				this.setState({				
					isLoading: true,
					isUpdate: false,
					fiches: [
					  ...this.state.fiches,
					  ...nextFiches,
					]
				},()=>{
					clearInterval(this.timer);
				});
				
				
			
			
			
		})
		.catch(error => {
			console.log(error)
		})	
	}
	
	createToolBar(){
		return(
			
			<Toolbar>
				<div>
					<Typography variant="h6" id="tableTitle">
						Liste des navires
					</Typography>
				</div>
			</Toolbar>
		)
	}
	
		
		
	createPopup(){
		const { open, placement, anchorEl} = this.state;
		
		const typesFilter = [
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

		return(
			<Popper				
				open={open}
				anchorEl={anchorEl}
				placement={placement}
				
				className={this.classes.popper}				
			>
				
				<Paper className={this.classes.paper} >
					<Grid container spacing={8} alignItems="flex-end">
						<Grid item xs={6}>
							{/*<AccountCircle />*/}							
							
							
							 <TextField
							  select
							  className={this.classes.cssTypeFilter}
							  label="Filtre"
							  value={this.state.typeFilter}
							  onChange={this.handleFilterType}		
							 >
								{typesFilter.map(option => (
									<MenuItem key={option.value} value={option.value}>
									{option.value}
									</MenuItem>
								))}
							 
								
							</TextField>
								
							
						</Grid>
					  <Grid item item xs={6}>
						<TextField 
							label="Valeur"
							value={this.state.valueFilter}
							onChange={this.handleFilterValue}							
						/>
					  </Grid>
					</Grid>
					
					<Grid container direction="row" style={{marginTop:'10px'}}>
						<Grid item xs={12} style={{textAlign:'right'}}>
							<Button  color="primary" onClick={this.handleClosePopper}>
								Annuler
							</Button>
							<Button  color="primary" onClick={this.handleFilterValidate}>
								Valider
							</Button>
						</Grid>
					
					</Grid>
				 </Paper>
				
						
			</Popper>
		)
	}
	
	createLineTable = (el) => {		
		let selected = this.state.selected.includes(el.id_photimo);
		
		let picture = "";
		if(el.photimo_media.length > 0){
			picture = this.url + el.photimo_media[0].uri_file;
		}
		
		
		const elem = el;
		return(
			
			<TableRow key={el.id_photimo}  onClick={()=>this.handleSelectedItem(el.id_photimo)}>							
				<TableCell style={{width:"100px"}}className={(selected)?(this.classes.cssLineSelected):(this.classes.cssLine)} >
					{
						(picture !== "")&&(
							<Avatar  src={ picture } />
						)
					}
				</TableCell>
				
				{
					this.state.champs.map((champ)=>{						
						return(
							<TableCell key={"champ_" + champ.champ} className={(selected)?(this.classes.cssLineSelected):(this.classes.cssLine)} >{elem[champ.champ]}</TableCell>
						)
					})
				}

				
			</TableRow>		
			
		)
	}
	
	createHeadTable(el) {
				
		let actif = this.state.filtersEnabled.includes(el.champ);
		
		return (
			
			
			<TableCell  key={el.champ}  >
				<Tooltip
					title="Filter"									
				>
					<IconButton className={ (actif === false)?(this.classes.cssIcon):(this.classes.cssIconEnabled)}  onClick={this.handleOpenPopper(el.champ)}>
						<SvgIcon style={{ fontSize: 20 }}>
						  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
						</SvgIcon>
					</IconButton>
				</Tooltip>
				
				<Tooltip
					title="Sort"									
				>
				{(el.champ === this.state.order.champ)?(
					<TableSortLabel
						active={true}
						direction={this.state.order.tri}
						onClick = {()=>this.handleOrder(el.champ)}
						className={this.classes.lineHeaderFilterEnabled}
					>
						
						{el.label}
					</TableSortLabel>
				):(
					<TableSortLabel
						active={false}
						direction={"asc"}
						onClick = {()=>this.handleOrder(el.champ)}
						className={this.classes.lineHeader}
					>
						{el.label}
					</TableSortLabel>					
				)}
				</Tooltip>							
			</TableCell>
		)
	}
	
	render(){
		if(this.state.isLoading === false){
			return(
				this.renderLoadingView()
			)
		}else{
			return (
				this.renderLoadedView()
			)
		}
          
    }
	
	renderLoadingView(){
		return (
			<div className={this.classes.cssDivMiddle}>				
				<CircularProgress					
					variant="determinate"
					value={this.state.completed}
				/>				
			</div>			
		)
	}
	renderLoadedView() {
		
		return(
			<div>
				{this.createPopup()}
				<Paper>
					{/*this.createToolBar()*/}
					
					
					<div className={this.classes.tableHeader} >
						<Table className={this.classes.table}>
							<TableHead>
								<TableRow>	
									<TableCell style={{width:'90px'}} />	
									{_.map(this.state.champs, el => this.createHeadTable(el))}										
								</TableRow>						
							</TableHead>						
						</Table>
					</div>
					
					<div style={{ overflow: 'auto', height: (this.props.maxHeight - 140) + 'px' }} className={this.classes.table} ref={this.paneDidMount}>
						<Table className={this.classes.table} style={{tableLayout: 'fixed'}}>
							<TableBody >
								
								{							
									_.map(this.state.fiches, el => this.createLineTable(el))
									
								}
								
								{
									(this.state.isUpdate ===  true)&&(
										<TableRow>
											<TableCell colSpan={6}>
												<div className={this.classes.cssDivMiddle}>				
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
				</Paper>
			</div>
		)
	}	
}

const mapStateToProps = (state) => {
  return {
		idnavire: state.storeNavire.idnavire,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Referentiel));

