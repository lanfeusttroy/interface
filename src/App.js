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
import routeAdministration from "routes/administration";

//layouts
import DefaultLayout from "layouts/default";
import AdministrationLayout from "layouts/administration";

//pages
import NotFound from 'pages/notFound';
import Login from "pages/login";



const hist = createBrowserHistory();

class App extends Component {
  constructor(props) {
      super(props);          
      
  }  
  
  componentWillMount(){
    //isLogged ?
    console.log(this.props.isLogged);
  }

 /*animate sidebar*/
  handleOpenSidebar=()=>{      
      let openSidebar = false;

      if(this.props.openSidebar === true){
          openSidebar = false;
      }else{
          openSidebar = true;
      }

      const action = { type: "CHANGE_SIDEBAR", openSidebar:openSidebar };
		  this.props.dispatch(action);
      //this.setState({openSidebar: openSidebar});
      
  }

  /*validate login*/
  handleValidateLogin=(user)=>{
    
      
      axios.post('/user/register', user).then(response => {
        if (response.data) {
          
        
          //let action = { type: "CHANGE_TOKEN", token: 'Bearer ' + response.data.token };
          //this.props.dispatch(action);

          
          
          const action = { type: "CHANGE_LOGIN",  isLogged:true, iduser:response.data.user.iduser, token: 'Bearer ' + response.data.token, username:response.data.user.username, email: response.data.user.email };
          this.props.dispatch(action);

          //redirection vers la page principale
          const location = {
              pathname: '/map'
          } 


          hist.push(location);
          hist.replace(location); 

        }
      }).catch(error => {
          console.log(error)                
      })

      

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
                                this.props.isLogged === true ?(
                                              <DefaultLayout 
                                                  component={component} 
                                                  route={route} 
                                                  routes={defaultRoute}
                                                  handleOpenSidebar = {this.handleOpenSidebar}
                                                  openSidebar = {this.props.openSidebar}  
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

          { _.map(routeAdministration, (route, key) => {
              const { component, path } = route;
                  return (
                      <Route
                          exact
                          path={path}
                          key={key}
                          render={ 
                              
                              (route) => 
                                this.props.isLogged === true ?(
                                    <AdministrationLayout 
                                        component={component} 
                                        route={route} 
                                        routes={routeAdministration}
                                        handleOpenSidebar = {this.handleOpenSidebar}
                                        openSidebar = {this.props.openSidebar}  
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
    openSidebar: state.storeProfile.openSidebar,  
    token: state.storeLogin.token,  
    isLogged: state.storeLogin.isLogged        
  }
}
export default connect(mapStateToProps)(App);


