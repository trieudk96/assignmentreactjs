import React from 'react';
import axios from 'axios';
import {CssBaseline,Typography,Container,Grid,Button,Input,Radio } from '@material-ui/core';
import {
  Redirect
} from "react-router-dom";
import Cookies from 'universal-cookie';
import AppConfig from '../Constant';
class UserUpdate extends React.Component {
  isUpdate;
  constructor(props){
    super(props); 
    const token = new Cookies().get("token");
    if(!token || !this.props.location.state || !this.props.location.state.userId){
      this.props.history.push("/");
    }else{
      this.isUpdate = this.props.location.state.update;
      this.state={
        token,
        user:{}, 
      }
      axios.get(`${AppConfig.apiUrl}/user/${this.props.location.state.userId}`,{headers:{"Authorization":`Bearer ${token}`}})
      .then(response => {
        console.log(response);
        this.setState({
          user: response.data 
        });
      }).catch(e=>{
        this.props.history.push("/");
      });
    }
  }
    change = (event)=> {
      const taget = event.target;
      const name = taget.name;
      const val = taget.type === 'checkbox' ? taget.checked : taget.value;
    this.setState({
      token:this.state.token,
      user:{...this.state.user,[name]:val}
      
    });
    
  }
  update =()=>{
    debugger
    axios.put(`${AppConfig.apiUrl}/user/${this.state.user.id}`,{...this.state.user},{headers:{"Authorization":`Bearer ${new Cookies().get("token")}`}}).then(res=>{
      if(res.data.susscess){
        debugger
        this.props.history.push("/profile",{userId:this.state.user.id});
      }
    }).catch(e=>{
      console.log(e)
    });
  };


  render(){
    console.log(this.state)
    if(!this.state || !this.state.token){
      return (<Redirect to={{ pathname: `/`, }} />);
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <Container >
          <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '80vh', paddingTop:'10vh',paddingLeft:'43vh'}} >
          <Grid container item xs={8} spacing={3}>
            <Grid item xs={12}>
            <h1 className="label-login">Profile</h1>
            </Grid>
          </Grid>

          <Grid container item xs={8} spacing={3}>
            <Grid item xs={6}>
              <label><strong>Name:</strong></label>
            </Grid>
            <Grid item xs={6}>
            <Input className="app-input1" placeholder="Name" onChange={this.change} name="name"  value={this.state.user.name} />
            </Grid>
          </Grid>


          <Grid container item xs={8} spacing={3}>
            <Grid item xs={6}>
              <label><strong>Email:</strong></label>
            </Grid>
            <Grid item xs={6}>
            <Input className="app-input1" placeholder="Email" onChange={this.change} name="email" value={this.state.user.email} dissable={true} />
            </Grid>
          </Grid>


          <Grid container item xs={8} spacing={3}>
            <Grid item xs={6}>
              <label><strong>MobileNumber:</strong></label>
            </Grid>
            <Grid item xs={6}>
            <Input className="app-input1" placeholder="Mobile number" onChange={this.change} name="mobileNumber" value={this.state.user.mobileNumber} pattern="[0-9]*"  />
            </Grid>
          </Grid>


          <Grid container item xs={8} spacing={3}>
            <Grid item xs={6}>
              <label><strong>Gender:</strong></label>
            </Grid>
            <Grid item xs={6}>
              <label>Nam</label>
            <Radio
              checked={this.state.user.gender === "0"}
              onChange={this.change}
              value="0"
              name="gender"
              inputProps={{ 'aria-label': 'A' }}
              />
              <label>Nữ</label>
            <Radio
              checked={this.state.user.gender === "1"}
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
              <Button variant="contained" color="primary" className="login-btn"  onClick={this.update}>Update</Button>
            </Grid>
          </Grid>
          </Typography>
        </Container>
      </React.Fragment>
      
      );
    }
  }
   
  
  export default UserUpdate;