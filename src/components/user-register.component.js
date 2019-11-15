import React from 'react';
import axios from 'axios';
import {CssBaseline,Typography,Container,Grid,Button,Input,Radio } from '@material-ui/core';
import AppConfig from '../Constant';
class UserRegister extends React.Component {
  constructor(props){
    super(props); 
      this.state={
        user:{
          email:"",
          dob: "",
          emailOtpIn: "",
          gender: "0",
          id: 0,
          mobileNumber: "",
          name: "",
          password: ""
        }, 
    }
  }
    change = (event)=> {
      const taget = event.target;
      const name = taget.name;
      const val = taget.type === 'checkbox' ? taget.checked : taget.value;
    this.setState({
      user:{...this.state.user,[name]:val}
      
    });
    
  }
  register =()=>{
    debugger
    axios.post(`${AppConfig.apiUrl}/user`,{...this.state.user}).then(res=>{
      if(res.data.susscess){
        this.props.history.push("/");
      }
    }).catch(e=>{
      console.log(e)
    });
  };


  render(){
    return (
      <React.Fragment>
        <CssBaseline />
        <Container >
          <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '80vh', paddingTop:'10vh',paddingLeft:'43vh'}} >
          <Grid container item xs={8} spacing={3}>
            <Grid item xs={12}>
            <h1 className="label-login">Register</h1>
            </Grid>
          </Grid>

          <Grid container item xs={8} spacing={3}>
            <Grid item xs={6}>
              <label><strong>Name:</strong></label>
            </Grid>
            <Grid item xs={6}>
            <Input className="app-input1" placeholder="Name" onChange={this.change} name="name"  />
            </Grid>
          </Grid>


          <Grid container item xs={8} spacing={3}>
            <Grid item xs={6}>
              <label><strong>Email:</strong></label>
            </Grid>
            <Grid item xs={6}>
            <Input className="app-input1" placeholder="Email" onChange={this.change} name="email"  />
            </Grid>
          </Grid>


          <Grid container item xs={8} spacing={3}>
            <Grid item xs={6}>
              <label><strong>Password:</strong></label>
            </Grid>
            <Grid item xs={6}>
            <Input className="app-input1" placeholder="Password"  onChange={this.change} name="password" type="password"  />
            </Grid>
          </Grid>


          <Grid container item xs={8} spacing={3}>
            <Grid item xs={6}>
              <label><strong>MobileNumber:</strong></label>
            </Grid>
            <Grid item xs={6}>
            <Input className="app-input1" placeholder="Mobile number" onChange={this.change} name="mobileNumber" pattern="[0-9]*"  />
            </Grid>
          </Grid>


          <Grid container item xs={8} spacing={3}>
            <Grid item xs={6}>
              <label><strong>Gender:</strong></label>
            </Grid>
            <Grid item xs={6}>
              <label>Nam</label>
            <Radio
            // eslint-disable-next-line
              checked={this.state.user.gender == "0"}
              onChange={this.change}
              value="0"
              name="gender"
              inputProps={{ 'aria-label': 'A' }}
              />
              <label>Nữ</label>
            <Radio
            // eslint-disable-next-line
              checked={this.state.user.gender == "1"}
              onChange={this.change}
              value="1"
              name="gender"
              inputProps={{ 'aria-label': 'A' }}
            />
            </Grid>
          </Grid>


          <Grid container item xs={8} spacing={3}>
            <Grid item xs={6}>
              <label><strong>Dob:</strong></label>
            </Grid>
            <Grid item xs={6}>
            <Input className="app-input1" placeholder="Dob" onChange={this.change} name="dob" value={this.state.user.dob}  />
            </Grid>
          </Grid>


          <Grid container item xs={8} spacing={3}>
            <Grid item xs={6}>
              <label><strong>Email Opt-In:</strong></label>
            </Grid>
            <Grid item xs={6}>
            <Input className="app-input1" placeholder="Email Opt-In" onChange={this.change} name="emailOtpIn" value={this.state.user.emailOtpIn}  />
            </Grid>
          </Grid>
          <Grid container item xs={8} spacing={3}>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" className="login-btn"  onClick={this.register}>Register</Button>
            </Grid>
          </Grid>
          </Typography>
        </Container>
      </React.Fragment>
      
      );
    }
  }
   
  
  export default UserRegister;