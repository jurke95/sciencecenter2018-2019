import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from "axios";





class Magazines extends Component {



  constructor(props) {
    super(props);
    this.state = {

      magazines: [],
      role: ""




    };
    this.goToMagazineDetail = this.goToMagazineDetail.bind(this);
    this.goToPayment = this.goToPayment.bind(this);
    this.checkMembership = this.checkMembership.bind(this);
    this.publish = this.publish.bind(this);


  }

  componentDidMount() {
    this.getMagazines();
    this.getUser();
  }


  goToMagazineDetail(data) {


    this.props.history.push("/magazines/journals/id=" + data);
  }

  newSWork(data) {
    var atoken = localStorage.getItem("jwt");

    axios.get("http://localhost:8083/magazine/startProcess/" + data, {

      headers: {
        "Authorization-Token": atoken
      }

    }

    ).then(res => {

      console.log(res.data.status);

      if (res.data.status === "Successfully") {
        localStorage.setItem('taskid', res.data.taksid);
        this.props.history.push("/tasks");
      }

    });

  }

  getMagazines() {

    var atoken = localStorage.getItem("jwt");

    //console.log(atoken);

    console.log("stigaoo");
    axios.get("http://localhost:8083/magazine/getAllMagazines", {

      headers: {
        "Authorization-Token": atoken
      }

    }

    ).then(res => {


      this.setState({ magazines: res.data });
    });
  }

  getUser() {

    var atoken = localStorage.getItem("jwt");

    console.log(atoken);


    axios.get("http://localhost:8083/user/getLoggedUser/" + atoken, {

      headers: {
        "Authorization-Token": atoken
      }
    }

    ).then(res => {

      console.log("usao u axios");
      console.log(res.data);

      this.setState({ role: res.data.role });
      /*this.setState({ email: res.data.email });
      this.setState({ areas: res.data.areas });
      this.setState({ name: res.data.name });
      this.setState({ surname: res.data.surname });
      this.setState({ title: res.data.title });
      this.setState({ city: res.data.city });
      this.setState({ country: res.data.country });
*/
    });
  }

  checkMembership(id) {




    var atoken = localStorage.getItem("jwt");




    axios.get("http://localhost:8083/user/checkMembershipStatus/" + id, {

      headers: {
        "Authorization-Token": atoken
      }
    }

    ).then(res => {

      if (res.data.status === "active") {
        alert("You already have active membership!");
      } else {
        this.goToPayment(id);
      }

    });
  }


  publish(id, type) {

    var atoken = localStorage.getItem("jwt");
    console.log()


    if (type === true) {

      axios.get("http://localhost:8083/user/checkMembershipStatus/" + id, {

        headers: {
          "Authorization-Token": atoken
        }
      }

      ).then(res => {

        if (res.data.status === "active") {
          //alert("Successfully published!");
          this.props.history.push("/magazines/createArticle/id=" + id);
        } else {
          alert("This is open-access magazine. In order to publish, you must have valid membership!");
        }

      });

    } else {
      //alert("Successfully published!");
      this.props.history.push("/magazines/createArticle/id=" + id);

    }




  }






  goToPayment(id) {

    console.log(id + "ovo je broj magazineaa");

    //this.props.history.push("/payment");
    var atoken = localStorage.getItem("jwt");
    let data = {

      magazineid: id,
      editionid: "0",
      articleid: "0"

    };

    var datas = JSON.stringify(data);
    console.log(data);
    //console.log(datas);


    fetch('http://localhost:8083/paymentobj/create', {
      method: 'POST',
      body: datas,
      headers: {
        'Content-Type': 'application/json',
        "Authorization-Token": atoken

      }
    })
      .then(res => res.json()).then(dat => {



        window.location.href = dat.coderesponse;





      });
  }

  render() {




    const TableRow = ({ magazine }) => (
      <tr className="table-light">

        <td> <img src={require('./mLogos/' + magazine.imgpath)} alt={"img" + magazine.imgpath} onClick={() => { this.goToMagazineDetail(magazine.id) }} />  </td>
        <td> {magazine.name}</td>
        <td>{magazine.issn}</td>
        {this.state.role === "USER" && magazine.openaccess === false &&
          < td > <button onClick={() => { this.checkMembership(magazine.id) }}>Buy membership!</button> Just {magazine.membershipfee} euros for 30 days! </td>
        }

        {
          this.state.role === "AUTHOR" &&

          <td> <button onClick={() => { this.publish(magazine.id, magazine.openaccess) }}>Publish scientific work!</button> </td>
        }




        {
          this.state.role === "AUTHOR" && magazine.openaccess === true &&
          <td> <button onClick={() => { this.checkMembership(magazine.id) }}>Buy Membership!</button> </td>

        }

        {

          <td> <button onClick={() => { this.newSWork(magazine.id) }}>New scientific work!</button> </td>

        }



        {this.state.role === "USER" && magazine.openaccess === true &&
          < td >This is open access magazine! </td>
        }

      </tr >

    )

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={4}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Magazines
              </CardHeader>
              <CardBody>
                <Table responsive hover >
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">issn</th>
                      <th scope="col" width="150px"></th>

                    </tr>
                  </thead>
                  <tbody>

                    {this.state.magazines.map(magazine => (


                      <TableRow key={magazine.id} magazine={magazine} />



                    ))}

                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Magazines;
