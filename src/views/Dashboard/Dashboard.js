import React, { Component } from 'react';
import Photo from './lajka.jpg';
import Quote from './quote.png';
import Signup from './bam.jpg';
import Login from './login.png';












// Main Chart

//Random Numbers





class Dashboard extends Component {


  constructor(props) {
    super(props);

    this.goToLogin = this.goToLogin.bind(this);
    this.goToRegistration = this.goToRegistration.bind(this);


  }



  goToLogin() {

    this.props.history.push("/login");
  }



  goToRegistration() {

    this.props.history.push("/register");
  }


  render() {


    const h1style = {

      padding: "40px",
      overflow: "auto",
      font: "bold 32px/1.5 Josefin Sans,cursive",
      color: "yellow"

    }

    const imgstyle = {

      float: "left",
      margin: " 0 50px 0 0",
      height: "500px",
      width: "400px"

    }

    const img2style = {

      float: "left",
      margin: " 0 150px 0 0",
      height: "500px",
      width: "400px"

    }

    const signupstyle = {

      paddingBottom: "40px",
      height: "100px",
      width: "400px"

    }


    const loginstyle = {

      padding: "2px",
      height: "300px",
      width: "400px",


    }

    const h2style = {

      padding: "5px",
      overflow: "auto",
      font: "bold 20px/1.5 Helvetica, Verdana, sans-serif",
      color: "yellow"

    }

    const h2sstyle = {


      overflow: "auto",
      font: "bold 20px/1.5 Helvetica, Verdana, sans-serif",
      color: "yellow"

    }


    return (
      <div  >

        <h1 style={h1style}> Welcome to Science Center Novi Sad! Science is a beautiful gift to humanity; we should not distort it ! </h1>
        <img style={imgstyle} src={Photo} alt="lajka" />
        <img style={img2style} src={Quote} alt="quote" />

        <h2 style={h2style}>Not a member? Click below to signup </h2>
        <img style={signupstyle} onClick={this.goToRegistration} src={Signup} alt="signup" />
        <div className="top-element-formatting">
          <span className="second-word-formatting"></span>
          {' '}

        </div>

        <h2 style={h2sstyle}>Already a member? Click below to login </h2>


        <img style={loginstyle} onClick={this.goToLogin} src={Login} alt="login" />


      </div>
    );
  }
}

export default Dashboard;
