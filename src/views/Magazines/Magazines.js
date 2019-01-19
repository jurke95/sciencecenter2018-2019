import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from "axios";




class Magazines extends Component {



  constructor(props) {
    super(props);
    this.state = {

      magazines: []




    };



  }

  componentDidMount() {
    this.getMagazines();
  }


  getMagazines() {

    // var atoken = localStorage.getItem("jwt");

    //console.log(atoken);

    console.log("stigaoo");
    axios.get("http://localhost:8083/magazine/getAllMagazines", {


    }

    ).then(res => {


      this.setState({ magazines: res.data });
    });
  }






  render() {



    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={3}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Magazines
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">issn</th>

                    </tr>
                  </thead>
                  <tbody>

                    {this.state.magazines.map(magazine => (


                      <tr>
                        <td> {magazine.id}</td>
                        <td> {magazine.name}</td>
                        <td>{magazine.issn}</td>
                      </tr>



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
