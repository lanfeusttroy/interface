import React from "react";
import { connect } from 'react-redux';

import _ from 'lodash';

import axios from 'axios';

import Fullscreen from "react-full-screen";


// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

//components
import Card from "components/card/card";
import CardHeader from "components/card/cardHeader";
import CardBody from "components/card/cardBody";
import CardFooter from "components/card/cardFooter";
import CardIcon from "components/card/cardIcon";
import CardAvatar from "components/card/cardAvatar";
import TableCustom from "components/tables/tableCustom";
import Slide from "components/media/slide";
import TableFilter from "components/tables/filter/tableFilter";
import FicheNavire from "components/metiers/ficheNavire/ficheNavire";


import navire from "assets/img/test.jpg";
import pavillon from "assets/img/pavillon_fr.png";

//test 
//import d'un fichier json
import communes from "ressources/communes.js";

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



class Home extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isFullNavire: false,
            isLoading: false,
            completed: 0
        };

        this.timer = null;
        this.listeNavire = [];
        this.idFicheNavire= "";
        
    }

    progress = () => {
		const { completed } = this.state;
		this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
	};

    componentWillMount(){
        //si une fiche est déja chargé
        if(this.props.ficheNavire["_id"] !== undefined){
            this.idFicheNavire = this.props.ficheNavire["_id"];
        }

        this.timer = setInterval(this.progress, 20);

       
        //liste de navire
        if( this.listeNavire.length == 0){
            
            axios.defaults.headers.common['Authorization'] = this.props.token;
                       
            
            axios.get('/navire',).then(response => {
                if (response.data) {

                    this.listeNavire = response.data;

                    if(this.props.ficheNavire["_id"] === undefined){
                        this.idFicheNavire = response.data[0]["_id"];

                        const action = { type: "CHANGE_NAVIRE", ficheNavire: response.data[0] };
                        this.props.dispatch(action);
                    }        

                    
                    
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
        }

    }
    
    componentDidUpdate(prevProps, prevState) { 

        
    }

    componentWillUnmount() {
		clearInterval(this.timer);
    }
    
    goFull = (name) => {
        this.setState({ [name]: true });
    }

    handleSelectFicheNavire = (id)=>{
        let fiche = _.find(this.listeNavire,{"_id":id});

        const action = { type: "CHANGE_NAVIRE", ficheNavire: fiche };
		this.props.dispatch(action);
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
        const {classes, color} = this.props;
       
        return(
            <div>
               
                <Grid container  spacing={16}>
                    <Grid item xs={12}>
                        <Fullscreen
                            enabled={this.state.isFullNavire}
                            onChange={isFullNavire => this.setState({["isFullNavire"]:isFullNavire})}
                        >
                            <Card>
                                <CardHeader color={color}>
                                    <Grid container  spacing={16}>
                                        <Grid item xs={11}>
                                            <h4 className={classes.cardTitleWhite}>Navires</h4>
                                        </Grid>
                                        <Grid item xs={1}>
                                        {
                                            this.state.isFullNavire === false &&(
                                                <IconButton  className={classes.iconButton} onClick={()=>this.goFull("isFullNavire")}>
                                                    <Icon>fullscreen</Icon>
                                                </IconButton>
                                                
                                            )
                                        }
                                        </Grid>
                                    </Grid>

                                    
                                    <p className={classes.cardCategoryWhite}>Liste des navires civils</p>
                                    
                                </CardHeader>
                                <CardBody>
                                    <TableCustom 
                                        tableHeaderColor="danger"
                                        tableHead = {[
                                            {
                                                row: 'imo',
                                                libelle:'IMO'
                                            }, 
                                            {
                                                row: 'nom',
                                                libelle:'Nom'
                                            }, 
                                            {
                                                row: 'pavillon',
                                                libelle:'Pavillon'
                                            },    
                                            {
                                                row: 'type_otan',
                                                libelle:'Type Otan'
                                            },
                                            {
                                                row: 'mmsi',
                                                libelle:'MMSI'                                                
                                            }
                                        ]} 
                                        handleSelect ={this.handleSelectFicheNavire}
                                        color={color}
                                        enabledPicture = {true}
                                        boolSelected = {true}
                                        tableData={this.listeNavire}    
                                        rowSelect={this.idFicheNavire}                             
                                    />                                
                                </CardBody>
                            </Card>
                        </Fullscreen>
                    </Grid>
                </Grid>    
                <Grid container  spacing={16}>
                    <Grid item xs={6}>
                        <Card>
                            <CardHeader  stats icon>
                                <CardIcon color={color}>
                                    <Icon>directions_boat</Icon>
                                </CardIcon>                                                
                            </CardHeader>
                            <CardBody>
                                <FicheNavire 
                                    xs={12} 
                                    data={this.props.ficheNavire}
                                />
                             </CardBody>
                        </Card> 
                    </Grid>
                    <Grid item xs={6}>
                                    
                            <Card>  
                                <CardHeader  stats icon>
                                    <CardIcon color={color}>
                                        <Icon>photo</Icon>
                                    </CardIcon>                                                
                                </CardHeader>                                                         
                                <CardBody>                                        
                                    <Slide 
                                        data={this.props.ficheNavire["photos"]}
                                    />
                                </CardBody>
                            </Card> 
                        
                    </Grid>
                </Grid>
                {/*
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader color={color}>
                                <h4 className={classes.cardTitleWhite}>Table</h4>
                                <p className={classes.cardCategoryWhite}>Exemple de table json filter</p>
                            </CardHeader>
                            <CardBody>
                                <TableFilter
                                    tableHeaderColor="danger"
                                    defaultOrder ={{"champ":"Nom_commune", "tri":"DESC"}}
                                    color={color}
                                    tableHead = {[
                                        {
                                            row: 'Code_commune_INSEE',
                                            visible:true,
                                            filter:true
                                        }, 
                                        {
                                            row: 'Nom_commune',
                                            visible:true,
                                            filter:true
                                        }, 
                                        {
                                            row: 'Code_postal',
                                            visible:true,
                                            filter:true
                                        },    
                                        {
                                            row: 'Libelle_acheminement',
                                            visible:true,
                                            filter:true
                                        },
                                        {
                                            row: 'Ligne_5',
                                            visible:false,
                                            filter:false
                                        },                                        
                                        {
                                            row: 'coordonnees_gps',
                                            visible:false,
                                            filter:false
                                        } 
                                    ]} 
                                    tableData={communes}                                                                 
                                />                                
                            </CardBody>
                        </Card>
                    </Grid>
                </Grid>  
                 */}       
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
            color: state.storeProfile.color,
            token: state.storeLogin.token,
            username : state.storeLogin.username,
            ficheNavire : state.storeNavire.ficheNavire,

    }
}

export default connect(mapStateToProps)(withStyles(styles)(Home));

