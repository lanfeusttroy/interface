import React from "react";
import Fullscreen from "react-full-screen";


// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

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
import pavillon from "assets/img/pavillon_fr.png";

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
    },
    iconButton:{
        float:"right",
        padding:"0px",
        color:"#000"      
    },
    iconPavillon:{
        width:"80px",
        height:"auto"
    }
  };



class Home extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isFullNavire: false
        };
        
    }

    goFull = (name) => {
        this.setState({ [name]: true });
    }

    render(){
        const {classes} = this.props;
        return(
            <div>
               
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={12}>
                        <Fullscreen
                            enabled={this.state.isFullNavire}
                            onChange={isFullNavire => this.setState({["isFullNavire"]:isFullNavire})}
                        >
                            <Card>
                                <CardHeader color="blue">
                                    <Grid container className={classes.root} spacing={16}>
                                        <Grid item xs={11}>
                                            <h4 className={classes.cardTitleWhite}>Navires</h4>
                                        </Grid>
                                        <Grid item xs={1}>
                                        {
                                            this.state.isFullNavire === false &&(
                                                <IconButton  className={classes.iconButton} onClick={()=>this.goFull("isFullNavire")}>
                                                    <Icon>fullscreen</Icon>
                                                </IconButton>
                                                
                                            )
                                        }
                                        </Grid>
                                    </Grid>

                                    
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
                        </Fullscreen>
                    </Grid>
                </Grid>    
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={8}>
                        <Card >
                            <CardAvatar navire>                            
                                <img src={navire} alt="..." />                            
                            </CardAvatar>
                            <CardBody>
                            <Grid container className={classes.root} spacing={16}>
                                <Grid item xs={12}>
                                    <img src={pavillon} className={classes.iconPavillon} alt="..." />      
                                </Grid>
                            </Grid>
                            <Grid container className={classes.root} spacing={16}>
                                <Grid item xs={4}>
                                    <TextField                                                        
                                            label="IMO"
                                            className={classes.textField}                
                                            fullWidth                                            
                                            margin="normal"
                                        />   
                                    <TextField                                                        
                                            label="Nom"
                                            className={classes.textField}                
                                            fullWidth                                            
                                            margin="normal"
                                        /> 
                                    <TextField                                                        
                                            label="MMSI"
                                            className={classes.textField}                
                                            fullWidth                                            
                                            margin="normal"
                                        /> 
                                </Grid>
                                <Grid item xs={4}>
                                </Grid>
                            </Grid>
                                
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
                                    defaultOrder ={{"champ":"Name", "tri":"ASC"}}
                                    tableHead = {[
                                        {
                                            row: 'ID',
                                            filter:true
                                        }, 
                                        {
                                            row: 'Name',
                                            filter:true
                                        }, 
                                        {
                                            row: 'Country',
                                            filter:true
                                        },    
                                        {
                                            row: 'City',
                                            filter:false
                                        },
                                        {
                                            row: 'Salary',
                                            filter:false
                                        } 
                                    ]} 
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
            </div>
        )
    }
}

export default withStyles(styles)(Home);