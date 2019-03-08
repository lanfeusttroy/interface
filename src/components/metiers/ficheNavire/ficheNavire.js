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
import NavireCaracteristique from "components/metiers/ficheNavire/ficheNavireCaracteristique";
import NavireIdentification from "components/metiers/ficheNavire/ficheNavireIdentification";
import NavireHistorique from "components/metiers/ficheNavire/ficheNavireHistorique";


class FicheNavire extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tab:0
        }
    }

    componentDidUpdate(prevProps, prevState) {
       
    }


    handleChange = (event, newValue) =>{
        this.setState({tab:newValue});
    }

    render(){
        const { classes,  xs} = this.props;
        const color = "white";

        
        const tabClasses = classNames({
            [classes[color + "Tabs"]]: color,
        });
        
        return(
            <div>
                <Grid container  spacing={16}>
                    <Grid item xs={xs}>
                        <AppBar position="static">
                            <Tabs value={this.state.tab} className={tabClasses} onChange={this.handleChange}>
                            <Tab className={classes.tab} label="Identification" />
                            <Tab className={classes.tab} label="Caractéristiques" />
                            <Tab className={classes.tab} label="Historiques" />
                            <Tab className={classes.tab} label="Photos" />
                            </Tabs>
                        </AppBar>

                        {
                            this.state.tab === 0 && (
                                <TabContainer>
                                    <NavireIdentification 
                                        data={this.props.data}
                                    /> 
                                </TabContainer>
                            )
                        }
                        {
                            this.state.tab === 1 && (
                                <TabContainer> 
                                    <NavireCaracteristique 
                                         data={this.props.data}
                                    /> 
                                </TabContainer>
                            )
                        }
                        {
                            this.state.tab === 2 && (
                                <TabContainer>
                                    <NavireHistorique 
                                        data={this.props.data}
                                    />
                                </TabContainer>
                            )  
                        }
                        {
                            this.state.tab === 3 && (
                                <TabContainer>
                                    <Slide 
                                        data={this.props.data["photos"]}
                                    />
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

