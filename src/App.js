import React from 'react';
import './App.css';
import  Login  from "./components/login.component.js";
import  User  from "./components/user.component.js";
import UserUpdate from './components/user-update.component';
import UserRegister from './components/user-register.component';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


class App extends React.Component {
  render(){
  return (
      <Router>
      <Switch>
          <Route path="/"  exact render={props=><Login {...props} />} />
          <Route path="/profile" render={props=><User {...props} />} />
          <Route path="/update" render={props=><UserUpdate {...props} update={true}/>} />
          <Route path="/register" render={props=><UserRegister {...props} update={false} />} />
        </Switch>
      </Router>
  )};
}

export default App;
