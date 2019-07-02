import React from "react";
import { connect } from 'react-redux';

import axios from 'axios';

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';

//components
import Card from "components/card/card";
import CardHeader from "components/card/cardHeader";
import CardBody from "components/card/cardBody";
import CardIcon from "components/card/cardIcon";

import FicheNavire from "components/metiers/ficheNavire/ficheNavire";

import FicheNavireCaracteristique from "components/metiers/ficheNavire/ficheNavireCaracteristique";
import FicheNavireHistorique from "components/metiers/ficheNavire/ficheNavireHistorique";
import FicheNavireIdentification from "components/metiers/ficheNavire/ficheNavireIdentification";

import Slide from "components/media/slide";
import OlMap from "components/maps/olMap";

const styles = {
    cssDivMiddle:{
        height:'100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
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
        width:"80px",
        height:"auto"
    },
    paper:{
        padding:"10px"
    }
    
  };

class BoatDetail extends React.Component {
    constructor(props){
        super(props);

        this.state = {           
            isLoading: false,
            completed: 0
        };

        this.timer = null;
    }

    progress = () => {
		const { completed } = this.state;
		this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
	};

    componentWillMount(){
        if(this.props.ficheNavire["_id"] === undefined){
            //chargement de la premiere fiche navire en base
            this.timer = setInterval(this.progress, 20);
            
            axios.get('/navire/first').then(response => {
                if (response.data) {

                                        
                    const action = { type: "CHANGE_NAVIRE", ficheNavire: response.data };
		            this.props.dispatch(action);
                    
                    this.setState({						
                        isLoading: true
                    },()=>{
                        console.log('chargement terminé');	
                        clearInterval(this.timer);	           
                                                
                    });
                }
            }).catch(error => {
                console.log(error)                
            })
        }else{
            this.setState({	isLoading: true});
        }
    }

    componentWillUnmount() {
		clearInterval(this.timer);
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
        const {color} = this.props;
        return(
        <div>
            <Grid container  spacing={16}>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader  stats icon>
                            <CardIcon color={color}>
                                <Icon>directions_boat</Icon>
                            </CardIcon>                                                
                        </CardHeader>
                        <CardBody>
                            <FicheNavireIdentification                                 
                                data={this.props.ficheNavire}                                
                            />                            
                        </CardBody>
                    </Card> 
                </Grid>
                <Grid item xs={4}>                           
                    <Card>
                        <CardHeader  stats icon>
                            <CardIcon color={color}>
                                <Icon>directions_boat</Icon>
                            </CardIcon>                                                
                        </CardHeader>
                        <CardBody>
                            <FicheNavireCaracteristique   
                                title='Caractéristiques'                              
                                data={this.props.ficheNavire}
                                boolPhoto={false}
                                boolPavillon={false}
                            />
                        </CardBody>
                    </Card>
                </Grid> 
                <Grid item xs={4}>
                    <Card>
                        <CardHeader  stats icon>
                            <CardIcon color={color}>
                                <Icon>directions_boat</Icon>
                            </CardIcon>                                                
                        </CardHeader>
                        <CardBody>
                            <FicheNavireHistorique    
                                title='Historiques'                             
                                data={this.props.ficheNavire} 
                                boolPhoto={false}
                                boolPavillon={false}                               
                            />                            
                        </CardBody>
                    </Card> 
                </Grid>
            </Grid>
            <Grid container  spacing={16}>
                
            </Grid>
             
        </div>
               
            
        )
    }
};

const mapStateToProps = (state) => {
    return {
            color: state.storeProfile.color,
            ficheNavire : state.storeNavire.ficheNavire
    }
}
export default connect(mapStateToProps)(withStyles(styles)(BoatDetail));
