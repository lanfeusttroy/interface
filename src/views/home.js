import React from "react";



// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';

//components
import Card from "components/card/card";
import CardHeader from "components/card/cardHeader";
import CardBody from "components/card/cardBody";
import CardFooter from "components/card/cardFooter";
import CardAvatar from "components/card/cardAvatar";
import TableCustom from "components/tables/tableCustom";
import Slide from "components/media/slide";
import TableInfinite from "components/tables/infinite/tableInfinite";

import navire from "assets/img/test.jpg";

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



class Home extends React.Component {
    constructor(props){
        super(props);

        
    }

    render(){
        const {classes} = this.props;
        return(
            <div>
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader color="blue">
                                <h4 className={classes.cardTitleWhite}>Navires</h4>
                                <p className={classes.cardCategoryWhite}>Liste des navires civils</p>
                            </CardHeader>
                            <CardBody>
                                <TableCustom 
                                    tableHeaderColor="danger"
                                    tableHead={["ID", "Name", "Country", "City", "Salary"]}
                                    tableData={[
                                    ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                                    ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                                    ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                                    [
                                        "4",
                                        "Philip Chaney",
                                        "$38,735",
                                        "Korea, South",
                                        "Overland Park"
                                    ],
                                    [
                                        "5",
                                        "Doris Greene",
                                        "$63,542",
                                        "Malawi",
                                        "Feldkirchen in Kärnten"
                                    ],
                                    ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
                                    ]} 
                                
                                />                                
                            </CardBody>
                        </Card>
                    </Grid>
                </Grid>    
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={8}>
                        <Card navire>
                            <CardAvatar navire>                            
                                <img src={navire} alt="..." />                            
                            </CardAvatar>
                            <CardBody>
                                
                            </CardBody>
                        </Card>     
                    </Grid>
                    <Grid item xs={4}>
                        <Card>                            
                            <CardBody>
                                <Slide />
                            </CardBody>
                        </Card>     
                    </Grid>
                </Grid>
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader color="blue">
                                <h4 className={classes.cardTitleWhite}>Table</h4>
                                <p className={classes.cardCategoryWhite}>Exemple de table infinie</p>
                            </CardHeader>
                            <CardBody>
                                <TableInfinite
                                    tableHeaderColor="danger"                                                                   
                                />                                
                            </CardBody>
                        </Card>
                    </Grid>
                </Grid>         
            </div>
        )
    }
}

export default withStyles(styles)(Home);