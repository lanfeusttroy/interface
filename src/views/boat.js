import React from "react";
import { connect } from 'react-redux';


// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

//components
import Card from "components/card/card";
import CardHeader from "components/card/cardHeader";
import CardBody from "components/card/cardBody";
import CardIcon from "components/card/cardIcon";

import FicheNavire from "components/metiers/ficheNavire/ficheNavire";
import Slide from "components/media/slide";
import OlMap from "components/maps/olMap";

class Boat extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const {color} = this.props;
        return(
            <Grid container  spacing={16}>
                <Grid item xs={7}>
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
                <Grid item xs={5}>
                    <Grid container  spacing={16}>
                        <Grid item xs={12}>
                            <Card>
                                <CardHeader  stats icon>
                                    <CardIcon color={color}>
                                        <Icon>photo</Icon>
                                    </CardIcon>                                                
                                </CardHeader>
                                <CardBody>
                                    <Slide />
                                </CardBody>
                            </Card> 
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                <CardHeader  stats icon>
                                    <CardIcon color={color}>
                                        <Icon>place</Icon>
                                    </CardIcon>                                                
                                </CardHeader>
                                <CardBody>
                                    <OlMap />
                                </CardBody>
                            </Card> 
                           
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

               
            
        )
    }
};

const mapStateToProps = (state) => {
    return {
            color: state.storeProfile.color,
            ficheNavire : state.storeNavire.ficheNavire
    }
}

export default connect(mapStateToProps)(Boat);
