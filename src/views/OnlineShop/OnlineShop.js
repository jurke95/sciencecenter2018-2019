import React, { Component } from "react";
import axios from "axios";
//import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import logo from './swork.jpg';


class OnlineShop extends Component {

  state = {
    works: []
  };


  componentDidMount() {
    this.getWorks();
  }



  render() {


    const ulstyle = {

      listStyleType: "none",
      width: "500px"
    }

    const listyle = {

      padding: "10px",
      overflow: "auto",
      font: "bold 20px/1.5 Helvetica, Verdana, sans-serif"

    }

    const imgstyle = {
      float: "left",
      margin: " 0 15px 0 0",
      height: "100px",
      width: "100px"

    }

    return (
      <ul style={ulstyle}>
        {this.state.works.map(work => (

          <li style={listyle} key={work.name}>  <img style={imgstyle} src={logo} />{work.name}</li>
        ))}
      </ul>
    );











  }



  getWorks() {

    var atoken = localStorage.getItem("jwt");

    console.log(atoken);


    axios.get("http://localhost:8084/swork/getSWorks", {

      headers: {
        "Authorization-Token": atoken
      }
    }

    ).then(res => {

      console.log("usao u axios");
      console.log(res.data);

      this.setState({ works: res.data });
    });
  }











}
export default OnlineShop;
