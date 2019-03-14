import React from "react";
import { connect } from 'react-redux';

import _ from 'lodash';

import axios from 'axios';

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';


//components
import Card from "components/card/card";
import CardHeader from "components/card/cardHeader";
import CardBody from "components/card/cardBody";
import CardFooter from "components/card/cardFooter";
import CardIcon from "components/card/cardIcon";
import CardAvatar from "components/card/cardAvatar";

import TableFilter from "components/tables/filter/tableFilter";

//style
import defaultStyle from "assets/components/views/defaultStyle";


class ListeNavire extends React.Component {
    constructor(props){
        super(props);       
        
    }

    render(){
        const {classes, color} = this.props;
        
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
            </Grid>
        )
    }
}



const mapStateToProps = (state) => {
    return {
            color: state.storeProfile.color,
            token: state.storeLogin.token,
    }
}

export default connect(mapStateToProps)(withStyles(defaultStyle)(ListeNavire));