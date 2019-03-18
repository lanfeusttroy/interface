import React from "react";
import { connect } from 'react-redux';

import _ from 'lodash';

import axios from 'axios';

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';


//components
import Card from "components/card/card";
import CardHeader from "components/card/cardHeader";
import CardBody from "components/card/cardBody";
import CardFooter from "components/card/cardFooter";
import CardIcon from "components/card/cardIcon";
import CardAvatar from "components/card/cardAvatar";
import FicheNavire from "components/metiers/ficheNavire/ficheNavire";

import TableFilter from "components/tables/filter/tableFilter";

//style
import defaultStyle from "assets/components/views/defaultStyle";


class ListeNavire extends React.Component {
    constructor(props){
        super(props);       
        
    }

    handleSelectFicheNavire = (fiche)=>{
       console.log(fiche);
        const action = { type: "CHANGE_NAVIRE", ficheNavire: fiche };
		this.props.dispatch(action);
    }	

    render(){
        const {classes, color} = this.props;
        
        console.log(Object.entries( this.props.ficheNavire).length);

        return(
            <Grid container  spacing={16}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader color={color}>
                            <h4 className={classes.cardTitleWhite}>Navires</h4>
                            <p className={classes.cardCategoryWhite}>Liste des navires civils</p>                        
                        </CardHeader>

                        <CardBody>
                            <TableFilter
                                tableHeaderColor="danger"
                                defaultOrder ={{"row":"imo", "tri":"ASC"}}
                                color={color}
                                height={350}
                                handleSelect ={this.handleSelectFicheNavire}
                                tableHead = {[
                                    {
                                        row: 'imo',
                                        libelle:'IMO',
                                        visible:true,
                                        filter:true
                                    }, 
                                    {
                                        row: 'nom',
                                        libelle:'Nom',
                                        visible:true,
                                        filter:true
                                    }, 
                                    {
                                        row: 'pavillon',
                                        libelle:'Pavillon',
                                        visible:true,
                                        filter:true
                                    },    
                                    {
                                        row: 'type_otan',
                                        libelle:'Type Otan',
                                        visible:true,
                                        filter:true
                                    },
                                    {
                                        row: 'mmsi',
                                        libelle:'MMSI',
                                        visible:true,
                                        filter:true                                               
                                    }
                                ]} 
                            />
                            
                                                            
                        </CardBody>
                    </Card>
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
                                { Object.entries( this.props.ficheNavire).length > 0  &&(
                                    <FicheNavire 
                                        xs={12} 
                                        data={this.props.ficheNavire}
                                    />
                                )}
                             </CardBody>
                        </Card> 
                    </Grid>                    
                </Grid>
            </Grid>
        )
    }
}



const mapStateToProps = (state) => {
    return {
            color: state.storeProfile.color,
            token: state.storeLogin.token,
            ficheNavire : state.storeNavire.ficheNavire,
    }
}

export default connect(mapStateToProps)(withStyles(defaultStyle)(ListeNavire));