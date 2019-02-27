import React, { Component } from 'react';

import _ from 'lodash';

import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect  } from "react-router-dom";

import "assets/css/default.css";

//routes 
import defaultRoute from "routes/default";

//layouts
import DefaultLayout from "layouts/default";

//pages
import NotFound from 'pages/notFound';



const hist = createBrowserHistory();

class App extends Component {
  constructor(props) {
      super(props);          
      
      this.state = {
          openSidebar: true, //dashboard
          isLogged: false, // login
      }
  }   

 /*animate sidebar*/
  handleOpenSidebar=()=>{      
      let openSidebar = false;

      if(this.state.openSidebar === true){
          openSidebar = false;
      }else{
          openSidebar = true;
      }

      this.setState({openSidebar: openSidebar});
      
  }

/*validate login*/
handleValidateLogin=()=>{
    this.setState({isLogged:true});

    
    const location = {
        pathname: '/home'
    } 

    //redirection vers la page principale
    hist.push(location);
    hist.replace(location);

}
  render() {
    return (
      <Router history={hist}>
        <Switch>
          { _.map(defaultRoute, (route, key) => {
              const { component, path } = route;
                  return (
                      <Route
                          exact
                          path={path}
                          key={key}
                          render={ (route) => <DefaultLayout 
                                                  component={component} 
                                                  route={route} 
                                                  routes={defaultRoute}
                                                  handleOpenSidebar = {this.handleOpenSidebar}
                                                  openSidebar = {this.state.openSidebar}  
                                                  hist = {hist}                                                                                                                                                                  
                                              />
                          }
                      />
                  )
              }) 
          }
          <Route component={ NotFound } />
        </Switch>
      </Router>
    );
  }
}

export default App;
