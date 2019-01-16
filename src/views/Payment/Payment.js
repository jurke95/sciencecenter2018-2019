import React, { Component } from "react";
//import axios from "axios";
import bitcoin from './bitc.png';
import paypal from './ppp.jpg';
import creditcard from './cc.jpg';



class Payment extends Component {




    render() {

        const listyle = {

            display: "inline",
            marginLeft: "70px"

        }

        const imgstyle = {

            height: "200px",
            width: "200px"

        }

        const hstyle = {

            padding: "10px",
            overflow: "auto",
            font: "bold 40px/1.5 Helvetica, Verdana, sans-serif",
            color: "yellow",
            marginLeft: "100px"

        }


        return (
            <div>

                <h1 style={hstyle}> Please choose your payment method</h1>

                <ul >


                    <li style={listyle}>  <img style={imgstyle} src={creditcard} alt="creditcard" /></li>
                    <li style={listyle}>  <img style={imgstyle} src={paypal} alt="paypal" /></li>
                    <li style={listyle}>  <img style={imgstyle} src={bitcoin} alt="bitcoin" /></li>

                </ul>


            </div>
        );





    }





}
export default Payment;