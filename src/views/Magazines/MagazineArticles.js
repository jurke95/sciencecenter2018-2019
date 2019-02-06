import React, { Component } from 'react';
import axios from "axios";
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';






class MagazineArticles extends Component {


    constructor(props) {
        super(props);
        this.state = {

            articles: [],
            idm: 0,
            ide: 0




        };



    }


    componentDidMount() {

        const y = window.location.href.split('=')[1];






        const mid = y.split('/')[0];
        const eid = window.location.href.split('=')[2];
        this.setState({ idm: mid });
        this.setState({ ide: eid });
        this.getArticles(mid, eid);


    }

    getArticles(m, e) {

        var atoken = localStorage.getItem("jwt");

        let data = {

            magazineid: m,
            editionid: e

        };

        var datas = JSON.stringify(data);
        console.log(datas);



        axios.get('http://localhost:8083/swork/getWorksByIds?magazineid=' + data.magazineid + '&editionid=' + data.editionid, {

            headers: {
                'Authorization-Token': atoken
            }
        }

        ).then(res => {


            console.log(res.data);
            console.log(res);

            this.setState({ articles: res.data });
        });
    }



    render() {

        const TableRow = ({ article }) => (
            <tr className="table-light">


                <td> {article.name}</td>

            </tr>
        )








        return (

            <div className="animated fadeIn">
                <Row>
                    <Col xl={3}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Articles
              </CardHeader>
                            <CardBody>
                                <Table responsive hover>
                                    <thead>
                                        <tr>

                                            <th scope="col">name</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.articles.map(article => (


                                            <TableRow key={article.id} article={article} />



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

export default MagazineArticles;
