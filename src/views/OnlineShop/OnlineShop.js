import React, { Component } from "react";
import axios from "axios";
//import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';


class OnlineShop extends Component {

  state = {
    works: []
  };


  componentDidMount() {

    this.getWorks();
  }

  render() {





    return (
      <ul>
        {this.state.works.map(work => (
          <li key={work.id}>{work.name}</li>
        ))}
      </ul>
    );
  }



  getWorks() {
    axios.get("http://localhost:8084/swork/getSWorks").then(res => {

      console.log("usao u axios");
      console.log(res.data);

      this.setState({ works: res.data });
    });
  }











}
export default OnlineShop;
