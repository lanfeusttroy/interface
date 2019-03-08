import React from "react";

import { connect } from 'react-redux';
import classNames from "classnames";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//components
import Card from "components/card/card";
import CardHeader from "components/card/cardHeader";
import CardBody from "components/card/cardBody";
import CardFooter from "components/card/cardFooter";
import CardAvatar from "components/card/cardAvatar";
import TableCustom from "components/tables/tableCustom";

//parametre
import proxy_photo from "config/parametres";

const styles = {
    
    iconPavillon:{
        width:"80px",
        height:"auto"
    },
    paper:{
        padding:"10px"
    }
    
  };


class NavireHistorique extends React.Component{   


    render(){
        const { classes, data } = this.props;

        const  historiques = data["historiques"];

        //selection de la premiere photo
        let navirePhoto = proxy_photo + 'photos/boatDefault.jpg';
        if(data["photos"][0] !== undefined){
            navirePhoto = proxy_photo + data["photos"][0].uri_file;
        }

        return (
            <Card navire>
                <CardAvatar navire>                            
                    <img src={navirePhoto} alt="..." />                            
                </CardAvatar>
                <CardBody>
                    <Grid container  spacing={16}>
                        <Grid item xs={12} >
                            <Paper className={classes.paper}>
                                <Typography component="subtitle1" gutterBottom>
                                    Noms
                                </Typography>
                                <TableCustom 
                                    tableHeaderColor="danger"
                                    tableHead = {[
                                        {
                                            row: 'date',
                                            libelle:'Date',
                                            width:'15em'
                                        }, 
                                        {
                                            row: 'nom',
                                            libelle:'Nom'
                                        }
                                    ]}                         
                                    enabledPicture = {false}
                                    boolSelected = {false}
                                    tableData={historiques["noms"]}                                                     
                                />
                            </Paper>  
                        </Grid>
                    </Grid>

                    <Grid container  spacing={16}>
                        <Grid item xs={12} >
                            <Paper className={classes.paper}>
                                <Typography component="subtitle1" gutterBottom>
                                    Pavillons
                                </Typography>
                                <TableCustom 
                                    tableHeaderColor="danger"
                                    tableHead = {[
                                        {
                                            row: 'date',
                                            libelle:'Date',
                                            width:'15em'
                                        }, 
                                        {
                                            row: 'pavillon',
                                            libelle:'Pavillon'
                                        }
                                    ]}                         
                                    enabledPicture = {false}
                                    boolSelected = {false}
                                    tableData={historiques["pavillons"]}                                                     
                                />
                            </Paper>  
                        </Grid>
                    </Grid>
                    <Grid container  spacing={16}>
                        <Grid item xs={12} >
                            <Paper className={classes.paper}>
                                <Typography component="subtitle1" gutterBottom>
                                    Modifications
                                </Typography>
                                <TableCustom 
                                    tableHeaderColor="danger"
                                    tableHead = {[
                                        {
                                            row: 'date',
                                            libelle:'Date',
                                            width:'15em'
                                        }, 
                                        {
                                            row: 'nom',
                                            libelle:'Nom'
                                        }
                                    ]}                         
                                    enabledPicture = {false}
                                    boolSelected = {false}
                                    tableData={historiques["modifications"]}                                                     
                                />
                            </Paper>  
                        </Grid>
                    </Grid>
                    <Grid container  spacing={16}>
                        <Grid item xs={12} >
                            <Paper className={classes.paper}>
                                <Typography component="subtitle1" gutterBottom>
                                    Port d'attache
                                </Typography>
                                <TableCustom 
                                    tableHeaderColor="danger"
                                    tableHead = {[
                                        {
                                            row: 'date',
                                            libelle:'Date',
                                            width:'15em'
                                        }, 
                                        {
                                            row: 'nom',
                                            libelle:'Nom'
                                        }
                                    ]}                         
                                    enabledPicture = {false}
                                    boolSelected = {false}
                                    tableData={historiques["port_attache"]}                                                     
                                />
                            </Paper>  
                        </Grid>
                    </Grid>
                </CardBody>
            </Card>
        )
    }

}

export default withStyles(styles)(NavireHistorique);