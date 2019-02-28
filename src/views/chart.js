import React from "react";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

//components
import Card from "components/card/card";
import CardHeader from "components/card/cardHeader";
import CardBody from "components/card/cardBody";
import CardFooter from "components/card/cardFooter";
import CardIcon from "components/card/cardIcon";

import GraphLine from "components/recharts/graphLine";
import GraphBar from "components/recharts/graphBar";
import GraphArea from "components/recharts/graphArea";
import GraphPie from "components/recharts/graphPie";

const styles = {
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    }
    
  };

class Chart extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const {classes, color} = this.props;

        return(
            <div>
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader color="primary" stats icon>
                                <CardIcon color="primary">
                                    <Icon>equalizer</Icon>
                                </CardIcon>                                                
                            </CardHeader>
                            <CardBody>
                                <GraphLine  
                                    data = {[
                                        {name: 'A', uv: 4000, pv: 2400, amt: 2400},
                                        {name: 'B', uv: 3000, pv: 1398, amt: 2210},
                                        {name: 'C', uv: 2000, pv: 9800, amt: 2290},
                                        {name: 'D', uv: 2780, pv: 3908, amt: 2000},
                                        {name: 'E', uv: 1890, pv: 4800, amt: 2181},
                                        {name: 'F', uv: 2390, pv: 3800, amt: 2500},
                                        {name: 'G', uv: 3490, pv: 4300, amt: 2100},
                                    ]}
                                />
                            </CardBody>                    
                        </Card>
                    </Grid>
                </Grid>

                <Grid container spacing={16}>
                    <Grid item xs={6}>
                        <Card>
                            <CardHeader color="primary" stats icon>
                                <CardIcon color="primary">
                                    <Icon>equalizer</Icon>
                                </CardIcon>                                                
                            </CardHeader>
                            <CardBody>
                                <GraphBar 
                                    data = {[
                                        {name: 'A', uv: 4000, pv: 2400, amt: 2400},
                                        {name: 'B', uv: 3000, pv: 1398, amt: 2210},
                                        {name: 'C', uv: 2000, pv: 9800, amt: 2290},
                                        {name: 'D', uv: 2780, pv: 3908, amt: 2000},
                                        {name: 'E', uv: 1890, pv: 4800, amt: 2181},
                                        {name: 'F', uv: 2390, pv: 3800, amt: 2500},
                                        {name: 'G', uv: 3490, pv: 4300, amt: 2100},
                                    ]}
                                />
                            </CardBody>                    
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardHeader color="primary" stats icon>
                                <CardIcon color="primary">
                                    <Icon>equalizer</Icon>
                                </CardIcon>                                                
                            </CardHeader>
                            <CardBody>
                                <GraphArea 
                                    data = {[
                                        {name: 'A', uv: 4000, pv: 2400, amt: 2400},
                                        {name: 'B', uv: 3000, pv: 1398, amt: 2210},
                                        {name: 'C', uv: 2000, pv: 9800, amt: 2290},
                                        {name: 'D', uv: 2780, pv: 3908, amt: 2000},
                                        {name: 'E', uv: 1890, pv: 4800, amt: 2181},
                                        {name: 'F', uv: 2390, pv: 3800, amt: 2500},
                                        {name: 'G', uv: 3490, pv: 4300, amt: 2100},
                                    ]}
                                />
                            </CardBody>                    
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
};

export default withStyles(styles)(Chart);
