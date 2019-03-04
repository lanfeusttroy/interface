import React from "react";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';

//components
import FicheNavire from "components/metiers/ficheNavire/ficheNavire";
import Slide from "components/media/slide";
import OlMap from "components/maps/olMap";

class Boat extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Grid container  spacing={16}>
                <Grid item xs={7}>
                    <FicheNavire xs={12}/>
                </Grid>
                <Grid item xs={5}>
                    <Grid container  spacing={16}>
                        <Grid item xs={12}>
                            <Slide />
                        </Grid>
                        <Grid item xs={12}>
                            <OlMap />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

               
            
        )
    }
};

export default Boat;