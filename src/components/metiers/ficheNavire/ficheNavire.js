import React from "react";
import { connect } from 'react-redux';
import classNames from "classnames";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import ficheNavireStyle from "assets/components/ficheNavireStyle";

//components
import TabContainer from "components/metiers/ficheNavire/tabContainer";
import Slide from "components/media/slide";

class FicheNavire extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tab:0
        }
    }
    handleChange = (event, newValue) =>{
        this.setState({tab:newValue});
    }

    render(){
        const { classes, color } = this.props;

        const tabClasses = classNames({
            [classes[color + "Tabs"]]: color,
        });

        return(
            <div>
                <Grid container  spacing={16}>
                    <Grid item xs={8}>
                        <AppBar position="static">
                            <Tabs value={this.state.tab} className={[classes.tabs, tabClasses]} onChange={this.handleChange}>
                            <Tab className={classes.tab} label="Item One" />
                            <Tab className={classes.tab} label="Item Two" />
                            <Tab className={classes.tab} label="Photos" />
                            </Tabs>
                        </AppBar>

                        {this.state.tab === 0 && <TabContainer>Item One</TabContainer>}
                        {this.state.tab === 1 && <TabContainer>Item Two</TabContainer>}
                        {
                            this.state.tab === 2 && (
                                <TabContainer>
                                <Slide />
                                </TabContainer>
                            )  
                        }
                    </Grid>
                </Grid>

            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
            color: state.storeProfile.color,
    }
}

export default connect(mapStateToProps)(withStyles(ficheNavireStyle)(FicheNavire));

