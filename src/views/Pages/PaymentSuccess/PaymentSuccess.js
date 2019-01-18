import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';






class PaymentSuccess extends Component {


    constructor(props) {
        super(props);
        this.state = {

            paymentId: "",
            token: "",
            PayerID: ""




        };
        this.confirmPayment = this.confirmPayment.bind(this);


    }

    confirmPayment() {

        var path = window.location.href;
        var f = path.split('=');
        var e = f[1].split('&');
        this.setState({ paymentId: e[0] });
        this.setState({ PayerID: f[3] });



        let data = {
            paymentId: e[0],
            payerID: f[3]

        };

        console.log(data.paymentId);
        console.log(data.payerID);

        var datas = JSON.stringify(data);

        fetch('http://localhost:8051/mspaypal/paypal/complete/payment', {
            method: 'PUT',
            body: datas,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {



                alert("Your payment is successfully completed!");

                this.props.history.push("/");


            }
            )


    }



    render() {



        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <span className="clearfix">
                                <h1>Successfully created payment!</h1>

                                <button onClick={this.confirmPayment}>Click here to complete payment!</button>
                            </span>

                        </Col>
                    </Row>
                </Container>
            </div>

        );


    }


}

export default withRouter(PaymentSuccess);
