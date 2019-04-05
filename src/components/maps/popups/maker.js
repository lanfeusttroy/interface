import React from "react";
import { connect } from 'react-redux';


import axios from 'axios';

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';


//components
import Card from "components/card/card";
import CardHeader from "components/card/cardHeader";
import CardBody from "components/card/cardBody";
import CardFooter from "components/card/cardFooter";
import CardAvatar from "components/card/cardAvatar";


//parametre
import proxy_photo from "config/parametres";

import pavillon from "assets/img/pavillon_fr.png";
import navire from "assets/img/test.jpg";

const styles = {
    cssDivMiddle:{   
        width:"100%",    
        lineHeight:"150px",
        marginLeft:"40%",
        marginRight:"auto"
    },
    buttonAlignRight: {
        textAlign: "right"
    },
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    },
    iconButton:{
        float:"right",
        padding:"0px",
        color:"#000"      
    },
    iconPavillon:{
        width:"30px",
        height:"auto"
    }, 
    content:{
        margin:"5px",
        //padding: "2px",   
        
        minHeight:"150px",        
        backgroundColor:"#fff",
        color:"#fff",
    },
    
  };

class Maker extends React.Component{
    constructor(props){
        super(props);

        this.state = {           
            isLoading: false,
            completed: 0,
            data: null
        };

        this.timer = null;
    }

    progress = () => {
		const { completed } = this.state;
		this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    };

    
    componentWillMount(){
        const {olPopup} = this.props;

        if(olPopup["id_bdd"] !== undefined){

            console.log(olPopup["id_bdd"]);
            this.loadFicheNavire(olPopup["id_bdd"]);
        }       
        
    }

    handleClick = e => {          
        this.props.onClose();
    }

    loadFicheNavire(id_bdd){
        this.timer = setInterval(this.progress, 20);

        axios.get('/navire/bdd/' + id_bdd ).then(response => {
            if (response.data) {  
                
                
                const action = { type: "CHANGE_NAVIRE", ficheNavire: response.data };
		        this.props.dispatch(action);
                                
                this.setState({						
                    isLoading: true,
                    data:response.data
                },()=>{
                    console.log('chargement terminé');	
                    clearInterval(this.timer);	           
                    this.timer= null;         
                });
            }
        }).catch(error => {
            console.log(error)                
        })

    }

    
    componentWillUnmount() {
		clearInterval(this.timer);
    }


    render(){
        
		if(this.state.isLoading === false){
            return ( this.renderLoadingView() )           
		}else{
            if(this.props.small === true){
                return ( this.renderSmallView() )                
            }else{
                return ( this.renderBigView() )  
            }			
		}
          
    }



    
    renderLoadingView(){
        const {classes} = this.props;
        
		return (
            <div>
                <IconButton style={{float:"right"}} onClick={this.handleClick} ><Icon fontSize="small">close</Icon>  </IconButton>
                <div className={classes.content}>
                    <div className={classes.cssDivMiddle}>				
                        <CircularProgress					
                            variant="determinate"
                            value={this.state.completed}
                        />				
                    </div>	
                </div>		
            </div>
		)
    }
    
    renderSmallView(){
        const {classes, olPopup} = this.props;
        const {data} = this.state;

        
        return(
            <div>
                
            
                <div className={classes.content}>
                    <Card navire>                      
                        <CardBody>                        
                            <Grid container  spacing={16}>
                                <Grid item xs={3} >
                                    <img src={pavillon} className={classes.iconPavillon} alt="..." /> 
                                </Grid>
                                <Grid item xs={7} >
                                    <Typography variant="body2" gutterBottom>{data["nom"]}</Typography>                                    
                                </Grid>
                                <Grid item xs={2} >
                                    <IconButton  onClick={this.handleClick} ><Icon fontSize="small">close</Icon>  </IconButton>
                                </Grid>
                            </Grid>                            
                            <Grid container  spacing={0}>
                                <Grid item xs={6} >
                                    <List dense={true}>
                                        <ListItem>
                                            <ListItemText
                                                primary={olPopup["lon"]}
                                                secondary="LON"
                                            />
                                        </ListItem>
                                    </List>

                                </Grid>
                                <Grid item xs={6} >
                                    <List dense={true}>
                                        <ListItem>
                                            <ListItemText
                                                primary={olPopup["lat"]}
                                                secondary="LAT"
                                            />
                                        </ListItem>  
                                    </List>
                                </Grid>
                            </Grid>
                            <Grid container  spacing={0}>
                                <Grid item xs={12} >
                                    <List dense={true}>
                                        <ListItem>
                                            <ListItemText
                                                primary={olPopup["date"]}
                                                secondary="DATE"
                                            />
                                        </ListItem>
                                    </List>                               
                                </Grid>
                            </Grid>
                            
                        </CardBody>
                    </Card>
                </div>
            </div>
        )
    }

    renderBigView(){
        const {classes, olPopup} = this.props;
        const {data} = this.state;

        
        //selection de la premiere photo
        let navirePhoto = proxy_photo + 'photos/boatDefault.jpg';

       

        if( data["photos"] !== undefined){

            if(data["photos"][0] !== undefined){
                navirePhoto = proxy_photo + data["photos"][0].uri_file;
            }
        }

        return(
            <div>
                <IconButton style={{float:"right"}} onClick={this.handleClick} ><Icon fontSize="small">close</Icon>  </IconButton>
            
                <div className={classes.content}>
                    <Card navire>
                        {(this.props.picture === true)&&(
                        <CardAvatar navire>                            
                            <img src={navirePhoto} alt="..." /> 
                                                    
                        </CardAvatar>
                        )}
                        <CardBody>                        
                            <Grid container  spacing={16}>
                                <Grid item xs={3} >
                                    <img src={pavillon} className={classes.iconPavillon} alt="..." /> 
                                </Grid>
                                <Grid item xs={9} >
                                    <Typography variant="body2" gutterBottom>{data["nom"]}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container  spacing={0}>
                                <Grid item xs={6} >
                                    <List dense={true}>
                                        <ListItem>
                                            <ListItemText
                                                primary={data["imo"]}
                                                secondary="IMO"
                                            />
                                        </ListItem>
                                        
                                        <ListItem>
                                            <ListItemText
                                                primary={data["mmsi"]}
                                                secondary="MMSI"
                                            />
                                        </ListItem>                                    
                                    </List>         
                                
                                </Grid>
                                <Grid item xs={6} >
                                    <List dense={true}>
                                        <ListItem>
                                            <ListItemText
                                                primary={data["type_otan"]}
                                                secondary="Type OTAN"
                                            />
                                        </ListItem>                                    
                                                            
                                    </List>   
                                
                                </Grid>                         
                                
                            </Grid>
                            <Grid container  spacing={0}>
                                <Grid item xs={6} >
                                    <List dense={true}>
                                        <ListItem>
                                            <ListItemText
                                                primary={olPopup["lon"]}
                                                secondary="LON"
                                            />
                                        </ListItem>
                                    </List>

                                </Grid>
                                <Grid item xs={6} >
                                    <List dense={true}>
                                        <ListItem>
                                            <ListItemText
                                                primary={olPopup["lat"]}
                                                secondary="LAT"
                                            />
                                        </ListItem>  
                                    </List>
                                </Grid>
                            </Grid>
                            <Grid container  spacing={0}>
                                <Grid item xs={12} >
                                    <List dense={true}>
                                        <ListItem>
                                            <ListItemText
                                                primary={olPopup["date"]}
                                                secondary="DATE"
                                            />
                                        </ListItem>
                                    </List>                               
                                </Grid>
                            </Grid>
                            <Grid container  spacing={0}>
                                <Grid item xs={12} >
                                    <div className={classes.buttonAlignRight}>
                                        
                                    </div>
                                </Grid>
                            </Grid>
                        </CardBody>
                    </Card>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
            ficheNavire : state.storeNavire.ficheNavire
    }
}
export default connect(mapStateToProps)(withStyles(styles)(Maker));