//components/images/slide.js

import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from "components/card/card";

import CardBody from "components/card/cardBody";


import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';

import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';

import navire from "assets/img/test.jpg";

const pictures = [
    {name:'1000021', src: require("assets/img/1000021.jpg"), alt:'...'},
    {name:'1000021', src: require("assets/img/1000021-1.jpg"), alt:'...'},
    {name:'1000021', src: require("assets/img/1000021-2.jpg"), alt:'...'},
    {name:'1000021', src: require("assets/img/1000021-3.jpg"), alt:'...'},    
];


const styles = {
    img: {
        width: "100%",
        height:"auto",
        borderRadius: "10px",
        border: "3px solid #fff",
        cursor: "pointer"
    },
    icone:{
        fontSize: "20"
    }
};

class Slide extends React.Component {
    constructor(props){
        super(props);

        this.state = {			
            medias: pictures,
            idmedia: 0,
			play: false
        }
        
        this.interval = null;
    }

    componentWillUnmount(){
		clearInterval(this.interval);
	}

    playImage = () =>{
        let idimage = 0;
        
		this.setState({
			play : true
		}, ()=>{			
			this.interval = setInterval(() => {
				
				console.log (idimage);
				if(this.state.idmedia  < (this.state.medias.length - 1)){
					idimage = idimage + 1;
				}else{
					idimage = 0;
				}
				
				this.setState({
					idmedia : idimage
				})
				
			},3000);
		})
	}
	
	stopImage = () =>{
		this.setState({
			play : false
		},()=>{
			clearInterval(this.interval);
		})
	}

    nextImage =()=>{
		if(this.state.play === false){
			if(this.state.idmedia  < (this.state.medias.length - 1)){
				this.setState({
					idmedia : this.state.idmedia + 1
				})
			}
		}
    }
    
    previousImage = () => {
		if(this.state.play === false){
			if(this.state.idmedia > 0){
				this.setState({
					idmedia : this.state.idmedia - 1
				})
			}
		}
	}

    render(){
        const { classes } = this.props;
        return(
            <div>
                <Card>       
                    <CardActions>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography  align="right">
                                    {/* Button before*/}
                                    <IconButton onClick={this.previousImage} >
                                        <SvgIcon className = {classes.icone}  >
                                            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6l-8.5 6zm6.5 2.14L12.97 12 16 9.86v4.28z" />
                                        </SvgIcon>				  
                                    </IconButton>

                                    {
                                        this.state.play === false ?(
                                            <IconButton onClick={this.playImage}>
                                                <SvgIcon className = {classes.icone} >
                                                    <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" />
                                                </SvgIcon>				  
                                            </IconButton>
                                        ):(
                                            <IconButton onClick={this.stopImage}>
                                                <SvgIcon className = {classes.icone}>
                                                    <path d="M16 8v8H8V8h8m2-2H6v12h12V6z" />
                                                </SvgIcon>				  
                                            </IconButton>
                                        )
                                           
                                    }

                                    {/* Button after*/}
                                    <IconButton onClick={this.nextImage} >
                                        <SvgIcon className = {classes.icone} >
                                            <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z" /> 
                                        </SvgIcon>
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardActions>             
                    <CardBody>
                        <img src={this.state.medias[this.state.idmedia].src} className = {classes.img}/>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
export default withStyles(styles)(Slide);