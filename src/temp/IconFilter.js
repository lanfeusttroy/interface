import React, { Component } from 'react';

import '@fortawesome/fontawesome-free/css/all.min.css';
import Popup from "reactjs-popup";

class IconFilter extends Component {
	
	constructor(props){
		super(props);
				
				
		this.state = {	
			open:false, //gestion du popup
			actif:""
		}

		
		this.filter = ""; //contient la valeur du filtre
		
		
	}
	
		
	//validation du filtre via la touche "enter"
	// eventKeyDown = (event) =>{		
		// if(event.keyCode === 13){
			// console.log("test");
			// if (this.filter.length >= 2){								
				// this.props.handleFilter(this.props.filterKey, this.filter);
				// this.closeModal();
			// }
		// }
	// }
	
	handleValidate =  () =>{
		let actif = "";
		
		if(this.filter !== ""){
			actif= "actif";
		}
		
		this.setState({actif:actif}, ()=>{
			this.props.handleFilter(this.props.filterKey, this.filter);
			this.closeModal();	
		});				
	}
	
	
	
	handleOrder = (order) => {				
		this.props.handleOrder(this.props.filterKey, order);
		this.closeModal();
	}
	
	handleFilter = (event) => {				
		this.filter = this.refs.filter.value;				
	}
	
	openModal=()=>{
		this.setState({open:true});		
		this.refs.filter.value = this.filter;
	}
	
	closeModal=()=>{			
		this.setState({open:false});
	}
	
	handleClear=()=>{	
		this.filter = "";
		this.setState({actif:""}, ()=>{
			this.props.handleFilter(this.props.filterKey, "");
			this.closeModal();	
		});				
	}
		
	render() {
				
		return (	
			<div>
				
				<Popup	
					trigger={<i className={`fas fa-filter ${this.state.actif}`} style={{cursor:"pointer", marginLeft:"10px", paddingTop:"4px"}}></i>}
					position= {`bottom ${this.props.popup}`}
					on="click"	
					onOpen={this.openModal}
					open={this.state.open}
					closeOnDocumentClick
					onClose={this.closeModal}
					mouseLeaveDelay={300}
					mouseEnterDelay={0}   
					contentStyle={{ padding: "5px", width:"300px" }}
					arrow={true}
				>
				
					<div className="pull-left input-group input-group-sm">
						<div className="input-group-prepend">
							<span className="input-group-text" ><i className="fas fa-search"></i></span>
						</div>
						
						<input type="text"
							ref="filter"
							className="form-control"							
							onChange={this.handleFilter}			
						/>
						<div className="input-group-prepend">
							<span className="input-group-text" onClick={this.handleClear} ><i className="fas fa-times   "></i></span>
						</div>
						<div className="input-group-prepend">
							<span className="input-group-text" onClick={this.handleValidate} ><i className="fas fa-check  "></i></span>
						</div>						
					</div>			
				
				</Popup>
				<span style={{marginLeft:"10px", paddingTop:"4px"}} >{this.props.libelle}</span>
				
				<span  style={{cursor:"pointer", marginLeft:"10px", paddingTop:"4px"}}>						
					{this.props.order.champ === this.props.filterKey ? [
						this.props.order.tri === "ASC" ?(
							<i key={this.props.order.champ} className="fas fa-sort-down" style={{color:"#9999ff"}} onClick={()=>this.handleOrder("DESC")} ></i>	
						):(
							<i key={this.props.order.champ} className="fas fa-sort-up" style={{color:"#9999ff"}} onClick={()=>this.handleOrder("ASC")}></i>	
						)
					]:(
						<i key={this.props.order.champ} className="fas fa-sort-down" style={{color:"white"}} onClick={()=>this.handleOrder("ASC")}></i>
					)}
				</span>
				
				
			</div>
		);
	}
}

export default IconFilter;
