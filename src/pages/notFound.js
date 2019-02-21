import React, { Component } from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//components
import Card from "components/card/card";
import CardHeader from "components/card/cardHeader";
import CardBody from "components/card/cardBody";



import notFoundStyle from "assets/pages/notFoundStyle";


class NotFound extends Component {
    constructor(props){
        super(props);       
    }

    render(){
        const { classes } = this.props;

        return(
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <Card>
                        <CardHeader color="blue">
                            <Typography component="h2" variant="h5" className={classes.cardTitleWhite}>
                                Error 404
                            </Typography>
                        </CardHeader>
                        <CardBody>                            
                            La page que vous souhaitez consulter n'existe pas ou n'existe plus.                            
                        </CardBody>
                    </Card>                    
                </Paper>
            </main>
            
        )
    }
}

export default withStyles(notFoundStyle)(NotFound);