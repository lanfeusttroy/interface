import React from "react";
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';


import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

//components
import Card from "components/card/card";
import CardHeader from "components/card/cardHeader";
import CardBody from "components/card/cardBody";
import CardFooter from "components/card/cardFooter";
import CardAvatar from "components/card/cardAvatar";

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';


import proxy_photo from "config/parametres";
import pavillon from "assets/img/pavillon_fr.png";




function createPopup(overlayPopup, coordinate, objProperties){
    let id_bdd = objProperties["id_bdd"]
    
    axios.get('/navire/bdd/' + id_bdd ).then(response => {
        if (response.data) {  
            
            let elementHTML = ReactDOMServer.renderToStaticMarkup(
                createMaker(objProperties, response.data)
            )

            overlayPopup.show(coordinate, elementHTML);
            
        }
    }).catch(error => {
        console.log(error)                
    })  
}


function createMaker(objProperties, data){
    let navirePhoto = proxy_photo + 'photos/boatDefault.jpg';
    if( data["photos"] !== undefined){
        if(data["photos"][0] !== undefined){
            navirePhoto = proxy_photo + data["photos"][0].uri_file;
        }
    }

    return (
        <Card navire>
            
            <CardAvatar navire>                            
                <img src={navirePhoto} alt="..."  /> 
                                        
            </CardAvatar>
            
            <CardBody>    
                  
                <Grid container  spacing={16}>
                    <Grid item xs={3} >
                        <img src={pavillon} className="iconPavillon" alt="..." /> 
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
                                    primary={objProperties["lon"]}
                                    secondary="LON"
                                />
                            </ListItem>
                        </List>

                    </Grid>
                    <Grid item xs={6} >
                        <List dense={true}>
                            <ListItem>
                                <ListItemText
                                    primary={objProperties["lat"]}
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
                                    primary={objProperties["date"]}
                                    secondary="DATE"
                                />
                            </ListItem>
                        </List>                               
                    </Grid>
                </Grid>
            </CardBody>
        </Card>
    )
}

export default class Utils {
    static createPopup = createPopup;
    
}