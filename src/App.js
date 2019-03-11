import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';


import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect  } from "react-router-dom";


import "assets/css/default.css";

//axios
import axios from 'config/axios';

//routes 
import defaultRoute from "routes/default";

//layouts
import DefaultLayout from "layouts/default";

//pages
import NotFound from 'pages/notFound';
import Login from "pages/login";



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
handleValidateLogin=(user)=>{
    console.log(user);
    
    axios.post('/user/register', user).then(response => {
      if (response.data) {
        
        console.log(response.data);

        const action = { type: "CHANGE_TOKEN", token: 'Bearer ' + response.data.token };
		    this.props.dispatch(action);

        //redirection vers la page principale
        
        this.setState({
          isLogged:true
        },()=>{
            console.log('login');	
            const location = {
                pathname: '/home'
            } 
      
            
            hist.push(location);
            hist.replace(location);
                                    
        });

        


       
        
      }
    }).catch(error => {
        console.log(error)                
    })

    /*
    this.setState({isLogged:true});

    
    const location = {
        pathname: '/home'
    } 

    //redirection vers la page principale
    hist.push(location);
    hist.replace(location);
    */

}
  render() {
    return (
      <Router history={hist}>
        <Switch>
          <Route
              exact
              path={'/login'}
              
              render={ (route) => <Login 
                                      component={Login}                                        
                                      handleValidateLogin={this.handleValidateLogin}                                                       
                                  />
              }
          />
          { _.map(defaultRoute, (route, key) => {
              const { component, path } = route;
                  return (
                      <Route
                          exact
                          path={path}
                          key={key}
                          render={ 
                              
                              (route) => 
                                this.state.isLogged === true ?(
                                              <DefaultLayout 
                                                  component={component} 
                                                  route={route} 
                                                  routes={defaultRoute}
                                                  handleOpenSidebar = {this.handleOpenSidebar}
                                                  openSidebar = {this.state.openSidebar}  
                                                  hist = {hist}                                                                                                                                                                  
                                              />
                                ):(
                                  <Redirect to="/login"/>
                                )
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

const mapStateToProps = (state) => {
  return {
    token: state.storeProfile.token,          
  }
}
export default connect(mapStateToProps)(App);


