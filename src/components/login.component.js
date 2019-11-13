import React from 'react';
import { Input,Button  } from '@material-ui/core';
import Appconfig from "../Constant";
import axios from 'axios';
import Cookies from 'universal-cookie';

import {
  Redirect
} from "react-router-dom";
class Login extends React.Component{
  constructor(props){
    super(props);
    //const cook = new Cookies();
   // if(!cook.get("token"))
    this.state ={
      email:'',
      password:'',
      valid:false
    }
  }
change = (event)=> {
  const taget =event.target;
  const name =taget.name;
  const val = taget.type === 'checkbox' ? taget.checked : taget.value;
this.setState({[name]:val},()=>{
  this.setState({valid:!!this.state.password && !!this.state.email});
});

}
login = ()=>{
  const cook = new Cookies();

  axios.post(`${Appconfig.apiUrl}/login`, {email:this.state.email,password:this.state.password})
    .then(res => {
      console.log(res);
      if(res.data.susscess){
        const data = res.data.payload.split(";");
        cook.set('token', data[1]);
        this.props.history.push("/profile",{userId:data[0]});
      }else{
        const el =document.getElementById("error");
        el.style.display="block";
        el.textContent = res.data.message || "Wrong email or password";
      }
    })
}


  render() {
   if(false) return (
      <Redirect
        to={{
          pathname: `/user`,
        }}
      />
    )
    return (
    <div className="login">
        <div className="login-form">
          <h1 className="label-login">Login</h1>
          <br/><br/>
            <Input className="app-input" placeholder="email" onChange={this.change} name="email" />
            <br/>
            <Input className="app-input" placeholder="Password"  onChange={this.change} name="password" type="password"/>
            <br/>
            <Button variant="contained" color="primary" className="login-btn" disabled={!this.state.valid} onClick={this.login}>Login</Button>
            <span id="error"></span>
      </div>
      <div className="container-login"> 
      {/* <Link to={{
        pathname:"/profile",
        state:{
          name:"trieudk"
        }
        }} id="link1"  ></Link> */}
      </div>
    </div>
    )};
  }
  
  export default Login;