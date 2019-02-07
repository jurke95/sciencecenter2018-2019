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


  }

  componentDidMount() {
    this.getMagazines();
    this.getUser();
  }


  goToMagazineDetail(data) {


    this.props.history.push("/magazines/journals/id=" + data);
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

  goToPayment(id) {

    console.log(id + "ovo je broj magazineaa");

    //this.props.history.push("/payment");
    var atoken = localStorage.getItem("jwt");




    axios.get("http://localhost:8083/paymentobj/create/" + id, {

      headers: {
        "Authorization-Token": atoken
      }
    }

    ).then(res => {

      console.log(res.data);
      window.location.href = res.data;
    });


  }


  render() {




    const TableRow = ({ magazine }) => (
      <tr className="table-light">

        <td> <img src={require('./mLogos/' + magazine.imgpath)} alt={"img" + magazine.imgpath} onClick={() => { this.goToMagazineDetail(magazine.id) }} />  </td>
        <td> {magazine.name}</td>
        <td>{magazine.issn}</td>
        {this.state.role === "USER" &&
          <td><button onClick={() => { this.goToPayment(magazine.id) }}>Buy membership!</button> Just {magazine.membershipfee} euros for 30 days! </td>
        }

        {this.state.role === "AUTHOR" &&
          <td> <button>Publish scientific work!</button> </td>
        }
      </tr>

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
