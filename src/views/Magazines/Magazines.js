import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from "axios";





class Magazines extends Component {



  constructor(props) {
    super(props);
    this.state = {

      magazines: []




    };
    this.goToMagazineDetail = this.goToMagazineDetail.bind(this);


  }

  componentDidMount() {
    this.getMagazines();
  }


  goToMagazineDetail(data) {


    this.props.history.push("/magazines/journals/id=" + data);
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

    const TableRow = ({ magazine }) => (
      <tr className="table-light" onClick={() => { this.goToMagazineDetail(magazine.id) }}>

        <td> <img src={require('./mLogos/' + magazine.imgpath)} alt={"img" + magazine.imgpath} />  </td>
        <td> {magazine.name}</td>
        <td>{magazine.issn}</td>
      </tr>
    )

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
