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

//style
import defaultStyle from "assets/components/views/defaultStyle";


import navire from "assets/img/test.jpg";
import pavillon from "assets/img/pavillon_fr.png";

//test 
//import d'un fichier json
import communes from "ressources/communes.js";




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
        console.log(fiche);
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
        console.log('ok');
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
                                        height={250}
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

export default connect(mapStateToProps)(withStyles(defaultStyle)(Home));

