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


    checkMembership(magid, st, aid, aname) {




        var atoken = localStorage.getItem("jwt");

        if (st === false) {


            axios.get("http://localhost:8083/user/checkMembershipStatus/" + magid, {

                headers: {
                    "Authorization-Token": atoken
                }
            }

            ).then(res => {

                if (res.data.status === "active") {
                    this.downloadPdf(aname + ".pdf");
                } else {



                    axios.get("http://localhost:8083/user/checkObjectPayment/" + aname, {

                        headers: {
                            "Authorization-Token": atoken
                        },

                    }
                    ).then(r => {
                        if (r.data.payed === "yes") {
                            this.downloadPdf(aname + ".pdf");
                        }
                        else {

                            this.goToPayment(magid, aid);
                        }


                    });

                }

            });

        } else {
            this.downloadPdf(aname + ".pdf");
        }
    }

    goToPayment(idm, aid) {



        //this.props.history.push("/payment");
        var atoken = localStorage.getItem("jwt");
        let data = {

            magazineid: idm,
            editionid: "0",
            articleid: aid

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


    downloadPdf(name) {
        var atoken = localStorage.getItem("jwt");


        axios.get("http://localhost:8083/download/file/" + name, {

            headers: {
                "Authorization-Token": atoken
            },
            responseType: 'blob'
        }
        ).then(res => {

            const file = new Blob(
                [res.data],
                { type: 'application/pdf' });

            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        });



    }





    render() {

        const TableRow = ({ article }) => (
            <tr className="table-light">


                <td> {article.name}  {"  "}<br></br><button onClick={() => { this.checkMembership(article.magazine.id, article.magazine.openaccess, article.id, article.name) }}>Read this article!</button></td>


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
