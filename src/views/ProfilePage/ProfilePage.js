import React, { Component } from "react";
import axios from "axios";
//import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';


class ProfilePage extends Component {



    constructor(props) {
        super(props);
        this.state = {

            email: "",
            username: ""





        };




    }


    componentDidMount() {

        this.getWorks();
    }



    render() {






        return (
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="card">

                            <div class="card-body">
                                <div class="card-title mb-4">
                                    <div class="d-flex justify-content-start">
                                        <div class="image-container">
                                            <img src="http://placehold.it/150x150" id="imgProfile" style={{ width: '150px', height: '150px' }} class="img-thumbnail" />
                                            <div class="middle">
                                                <input type="button" class="btn btn-secondary" id="btnChangePicture" value="Change" />
                                                <input type="file" style={{ display: 'none' }} id="profilePicture" name="file" />
                                            </div>
                                        </div>
                                        <div class="userData ml-3">
                                            <h2 class="d-block" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}><a href="javascript:void(0);">Some Name</a></h2>
                                            <h6 class="d-block"><a href="javascript:void(0)">1,500</a> Video Uploads</h6>
                                            <h6 class="d-block"><a href="javascript:void(0)">300</a> Blog Posts</h6>
                                        </div>
                                        <div class="ml-auto">
                                            <input type="button" class="btn btn-primary d-none" id="btnDiscard" value="Discard Changes" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12">
                                        <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="basicInfo-tab" data-toggle="tab" href="#basicInfo" role="tab" aria-controls="basicInfo" aria-selected="true">Basic Info</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="connectedServices-tab" data-toggle="tab" href="#connectedServices" role="tab" aria-controls="connectedServices" aria-selected="false">Connected Services</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content ml-1" id="myTabContent">
                                            <div class="tab-pane fade show active" id="basicInfo" role="tabpanel" aria-labelledby="basicInfo-tab">


                                                <div class="row">
                                                    <div class="col-sm-3 col-md-2 col-5">
                                                        <label style={{ fontWeight: 'bold' }}>Full Name</label>
                                                    </div>
                                                    <div class="col-md-8 col-6">
                                                        Jamshaid Kamran
                                                </div>
                                                </div>
                                                <hr />

                                                <div class="row">
                                                    <div class="col-sm-3 col-md-2 col-5">
                                                        <label style={{ fontWeight: 'bold' }}>Birth Date</label>
                                                    </div>
                                                    <div class="col-md-8 col-6">
                                                        March 22, 1994.
                                                </div>
                                                </div>
                                                <hr />


                                                <div class="row">
                                                    <div class="col-sm-3 col-md-2 col-5">
                                                        <label style={{ fontWeight: 'bold' }}>Something</label>
                                                    </div>
                                                    <div class="col-md-8 col-6">
                                                        {this.state.username}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div class="row">
                                                    <div class="col-sm-3 col-md-2 col-5">
                                                        <label style={{ fontWeight: 'bold' }} > Something</label>
                                                    </div>
                                                    <div class="col-md-8 col-6">
                                                        {this.state.email}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div class="row">
                                                    <div class="col-sm-3 col-md-2 col-5">
                                                        <label style={{ fontWeight: 'bold' }}>Something</label>
                                                    </div>
                                                    <div class="col-md-8 col-6">
                                                        Something
                                                </div>
                                                </div>
                                                <hr />

                                            </div>
                                            <div class="tab-pane fade" id="connectedServices" role="tabpanel" aria-labelledby="ConnectedServices-tab">
                                                Facebook, Google, Twitter Account that are connected to this account
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



    getWorks() {

        var atoken = localStorage.getItem("jwt");

        console.log(atoken);


        axios.get("http://localhost:8084/user/getLoggedUser/" + atoken, {

            headers: {
                "Authorization-Token": atoken
            }
        }

        ).then(res => {

            console.log("usao u axios");
            console.log(res.data);

            this.setState({ username: res.data.username });
            this.setState({ email: res.data.email });
        });
    }











}
export default ProfilePage;
