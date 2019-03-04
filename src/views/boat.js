import React from "react";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';

//components
import FicheNavire from "components/metiers/ficheNavire/ficheNavire";
import Slide from "components/media/slide";

class Boat extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Grid container  spacing={16}>
                <Grid item xs={8}>
                    <FicheNavire xs={12}/>
                </Grid>
                <Grid item xs={4}>
                    <Slide />
                </Grid>
            </Grid>

               
            
        )
    }
};

export default Boat;