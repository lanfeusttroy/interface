//components/sidebarBackground.js
import React, { Component } from 'react';
import _ from 'lodash';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";




/*
import sidebar3 from "assets/img/sidebar-3.jpg";
import sidebar4 from "assets/img/sidebar-4.jpg";
import sidebar1 from "assets/img/sidebar-1.jpg";
*/
/*
const background = [
    {name:'sidebar-1', src: require("assets/img/sidebar-1.jpg"), alt:'sidebar-1'},
    {name:'sidebar-3', src: require("assets/img/sidebar-3.jpg"), alt:'sidebar-3'},
    
];
*/

const styles = {
    img: {
      width: "10%",
      height:"auto",
      borderRadius: "10px",
      border: "3px solid #fff",
      cursor: "pointer"
    },
    selected:{
      width: "10%",
      height:"auto",
      borderRadius: "10px",
      border: "3px solid #123456",
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