import React, { Component } from "react";
import axios from "axios";
//import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';


class ProfilePage extends Component {



    constructor(props) {
        super(props);
        this.state = {

            email: "",
            username: "",
            name: "",
            surname: "",
            title: "",
            city: "",
            country: "",
            areas: [],
            idmag: 1






        };

        this.goToPayment = this.goToPayment.bind(this);


    }




    componentDidMount() {

        this.getUser();
    }



    goToPayment() {



        //this.props.history.push("/payment");
        var atoken = localStorage.getItem("jwt");

        console.log(this.state.idmag);


        axios.get("http://localhost:8083/paymentobj/create", {

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


        const buttonstyle = {

            float: "left",
            margin: "0 0 0 300px",
            paddingBottom: "4px",


        }



        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card">

                            <div className="card-body">
                                <div className="card-title mb-4">
                                    <div className="d-flex justify-content-start">
                                        {/*
                                        <div className="image-container">

                                             <img src="http://placehold.it/150x150" id="imgProfile" style={{ width: '150px', height: '150px' }} class="img-thumbnail" />
                                                <div class="middle">
                                                    <input type="button" class="btn btn-secondary" id="btnChangePicture" value="Change" />
                                                    <input type="file" style={{ display: 'none' }} id="profilePicture" name="file" />
                                                </div>
                                        </div>
                                    */}
                                        <div className="ml-auto">
                                            <input type="button" className="btn btn-primary d-none" id="btnDiscard" value="Discard Changes" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" id="basicInfo-tab" data-toggle="tab" href="#basicInfo" role="tab" aria-controls="basicInfo" aria-selected="true">Basic Info</a>
                                            </li>

                                        </ul>
                                        <div className="tab-content ml-1" id="myTabContent">
                                            <div className="tab-pane fade show active" id="basicInfo" role="tabpanel" aria-labelledby="basicInfo-tab">


                                                <div className="row">
                                                    <div className="col-sm-3 col-md-2 col-5">
                                                        <label style={{ fontWeight: 'bold' }}>Full Name</label>
                                                    </div>
                                                    <div className="col-md-8 col-6">
                                                        {this.state.name + " " + this.state.surname}
                                                    </div>
                                                </div>
                                                <hr />




                                                <div className="row">
                                                    <div className="col-sm-3 col-md-2 col-5">
                                                        <label style={{ fontWeight: 'bold' }}>Username</label>
                                                    </div>
                                                    <div className="col-md-8 col-6">
                                                        {this.state.username}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3 col-md-2 col-5">
                                                        <label style={{ fontWeight: 'bold' }} > Email</label>
                                                    </div>
                                                    <div className="col-md-8 col-6">
                                                        {this.state.email}
                                                    </div>
                                                </div>
                                                <hr />

                                                <div className="row">
                                                    <div className="col-sm-3 col-md-2 col-5">
                                                        <label style={{ fontWeight: 'bold' }} > Title</label>
                                                    </div>
                                                    <div className="col-md-8 col-6">
                                                        {this.state.title}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3 col-md-2 col-5">
                                                        <label style={{ fontWeight: 'bold' }}>Areas</label>
                                                    </div>
                                                    <ul>
                                                        {this.state.areas.map(area => (
                                                            <li key={area}>{area}</li>))}
                                                    </ul>
                                                </div>
                                                <hr />



                                                <div className="row">
                                                    <div className="col-sm-3 col-md-2 col-5">
                                                        <label style={{ fontWeight: 'bold' }} > Membership</label>
                                                    </div>
                                                    <div className="col-md-8 col-6">
                                                        {"Not active"}
                                                    </div>
                                                    <div>
                                                        <button style={buttonstyle} onClick={this.goToPayment}>Click to pay membership</button>
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div >
                </div >
            </div >

        );
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

            this.setState({ username: res.data.username });
            this.setState({ email: res.data.email });
            this.setState({ areas: res.data.areas });
            this.setState({ name: res.data.name });
            this.setState({ surname: res.data.surname });
            this.setState({ title: res.data.title });
            this.setState({ city: res.data.city });
            this.setState({ country: res.data.country });

        });
    }











}
export default ProfilePage;
