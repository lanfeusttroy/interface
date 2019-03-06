//components/sidebarBackground.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

//ressources
import ressourcesBackground  from "components/sidebar/ressourcesBackground";

const styles = {
    img: {
      width: "100px",
      height:"auto",
      borderRadius: "10px",
      border: "3px solid #fff",
      cursor: "pointer"
    },
    selected:{
      width: "100px",
      height:"auto",
      borderRadius: "10px",
      border: "3px solid #3399ff",
      cursor: "pointer"
    }
  };

class SidebarBackground extends Component { 
    constructor(props){
        super(props);

        
    }

    handleSelect=(ev)=>{        
        //this.props.handleChange(ev.target.name);

        const action = { type: "CHANGE_BACKGROUND", backgroundSidebar: ev.target.name };
		this.props.dispatch(action);
    }
    

    createImage(image, key) { 
        
        return(
            
                this.props.selected === image.name ? (
                    <img 
                        key={key}
                        src= {image.src}
                        name={image.name}
                        alt={image.alt}
                        className={this.props.classes.selected}
                        onClick={this.handleSelect}
                    />
                ):(
                    <img 
                        key={key}
                        src= {image.src}
                        name={image.name}
                        alt={image.alt}
                        className={this.props.classes.img}
                        onClick={this.handleSelect}
                    />
                )           
            
        )
    }

    render(){
        
        return (
            <div> 
                { _.map(ressourcesBackground, (image, key) => this.createImage(image, key)) }                 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
            selected: state.storeProfile.backgroundSidebar,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(SidebarBackground));
