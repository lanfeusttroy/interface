//components/sidebarBackground.js
import React, { Component } from 'react';
import _ from 'lodash';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";



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
        this.props.handleChange(ev.target.name);
    }
    

    createImage(image) { 
        
        return(
            
                this.props.selected === image.name ? (
                    <img 
                        src= {image.src}
                        name={image.name}
                        alt={image.alt}
                        className={this.props.classes.selected}
                        onClick={this.handleSelect}
                    />
                ):(
                    <img 
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
                { _.map(this.props.images, image => this.createImage(image)) }                 
            </div>
        )
    }
}

export default withStyles(styles)(SidebarBackground);