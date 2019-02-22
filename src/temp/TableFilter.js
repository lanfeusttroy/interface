import React, { Component } from 'react';
import request from "superagent";

import _ from "lodash";

import IconFilter from './IconFilter';



import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './tableFilter.css';

class TableFilter extends Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			error:false,
			hasMore:true,
			isLoading:false,
			nbrElementTotal:0,
			nbrElementFiltre:0,
			fiches:[],
			page:1,
			nbrelement:50,
			order: {"champ":"Nom", "tri":"ASC"},
			filters:[],
			selected:[]
		}
	}
	
	handleOrder = (filterKey, order) =>{
		
		this.setState({fiches:[], page:1, order: {champ: filterKey, tri: order}},() => {			
			this.loadFiches();			
		});			
		
    }
	
	handleFilter = (filterKey, value) =>{
		
		let filters = this.state.filters;
		let exists = false;
				
		for(let i=0; i<filters.length; i++){
			if(filters[i].champ === filterKey){
				if(value === ""){					
					filters.splice(i, 1);
				}else{
					filters[i].filtre = value;
				}				
				exists = true
			}		
		}	
			
		if(exists === false && value !== ""){
			filters.push({"champ":filterKey, "filtre":value});
		}
		
				
		this.setState({filters:filters, page:1, fiches:[]}, ()=>{
			this.loadFiches();
		});
		
	}
	
	
	componentDidMount() {
		console.log(this.refs.listeUsers.scrollHeight);
		
		this.refs.listeUsers.addEventListener("scroll", () => {			
			if (
				this.refs.listeUsers.scrollHeight - this.refs.listeUsers.scrollTop === this.refs.listeUsers.clientHeight && 
				this.refs.listeUsers.scrollTop !==0 &&
				(this.state.page * this.state.nbrelement) < this.state.nbrElementFiltre
			) {
				
				this.loadFiches();
			}
		});
	}
	
	componentWillMount() {
		//Chargement initial
		this.loadFiches();
	}
	
	selectedItem=(id)=>{
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
	
	loadFiches(){
		if(this.state.isLoading === false){
			this.setState({ isLoading: true }, () => {
				request.get('http://127.0.0.1/photimo/navirecivils/fiches')				
					.query({order: JSON.stringify(this.state.order), page: this.state.page, nbrelement: this.state.nbrelement, filter:JSON.stringify(this.state.filters)})
					.then((results) => {
						const nextFiches = results.body.Fiche.map(fiche => ({
							id_fiche: fiche.id_photimo,
							nom: fiche.Nom,					
							pavillon: fiche.Pavillon,
							imo: fiche.IMO,
							mmsi: fiche.MMSI,
							type_otan:fiche.Type_OTAN
						}));
						
						const nbrElementTotal = results.body.nbrElementTotal;
						const nbrElementFiltre  = results.body.nbrElement;
						
						this.setState({
							nbrElementTotal: nbrElementTotal,	
							nbrElementFiltre: nbrElementFiltre,
							isLoading: false,
							fiches: [
							  ...this.state.fiches,
							  ...nextFiches,
							],
							page: this.state.page + 1
						});
						
														
					}).catch((err) => {
						this.setState({
							error: err.message,
							isLoading: false,
						});
					})			
			})
		}
	}
	
	createLine = (fiche) => {
		return (
			
				(this.state.selected.includes(fiche.id_fiche))?(
					<tr key={"row_" + fiche.id_fiche} onClick={()=>this.selectedItem(fiche.id_fiche)} className = "selected" >
						<td className="col col-lg-2">{fiche.imo}</td>
						<td className="col col-lg-3">{fiche.nom}</td>
						<td className="col col-lg-2">{fiche.pavillon}</td>
						<td className="col col-lg-3">{fiche.mmsi}</td>
						<td className="col col-lg-2">{fiche.type_otan}</td>
					</tr>
				):(
					<tr key={"row_" + fiche.id_fiche} onClick={()=>this.selectedItem(fiche.id_fiche)} >
						<td className="col col-lg-2">{fiche.imo}</td>
						<td className="col col-lg-3">{fiche.nom}</td>
						<td className="col col-lg-2">{fiche.pavillon}</td>
						<td className="col col-lg-3">{fiche.mmsi}</td>
						<td className="col col-lg-2">{fiche.type_otan}</td>
					</tr>
				)
			
		)
	}
	
	
	render() {
		return (
			<div  style={{ width:"100%",height: this.props.height + "px", overflow: "auto" }}	>
				<span className="badge badge-light">
					<span style={{"color":"#123456"}} >{this.state.nbrElementFiltre}</span> / <span style={{"color":"#000"}} >{this.state.nbrElementTotal} Eléments</span>
				</span>
				
				<table className="table table-fixed table-striped">
					<thead>
						<tr>							
							<th className="col col-lg-2"><IconFilter popup="left" libelle="IMO" filterKey = "IMO" order={this.state.order} handleOrder = {this.handleOrder} handleFilter = {this.handleFilter} /> </th>
							<th className="col col-lg-3"><IconFilter popup="center"libelle="Nom" filterKey = "Nom" order={this.state.order} handleOrder = {this.handleOrder} handleFilter = {this.handleFilter} /> </th>
							<th className="col col-lg-2"><IconFilter popup="center" libelle="Pavillon" filterKey = "Pavillon" order={this.state.order} handleOrder = {this.handleOrder} handleFilter = {this.handleFilter} /> </th>
							<th className="col col-lg-3"><IconFilter popup="center" libelle="MMSI" filterKey = "MMSI" order={this.state.order} handleOrder = {this.handleOrder} handleFilter = {this.handleFilter} /> </th>
							<th className="col col-lg-2"><IconFilter popup="center" libelle="Type OTAN" filterKey = "Type_OTAN" order={this.state.order} handleOrder = {this.handleOrder} handleFilter = {this.handleFilter} /> </th>
						</tr>
					</thead>
					<tbody style={{ height: (this.props.height -100) + "px" }} ref="listeUsers">
					{
						this.state.fiches.map((fiche) =>(
							
							this.createLine(fiche) 
						))										
					}
					
					{this.state.isLoading &&
						<tr>
							<td colSpan="5"><div>Loading...</div></td>
						</tr>
					}
					
					</tbody>
				</table>
				
				
			</div>
		);
	}
}

export default TableFilter;
