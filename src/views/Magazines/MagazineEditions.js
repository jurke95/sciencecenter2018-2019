import React, { Component } from 'react';
import axios from "axios";






class MagazineEditions extends Component {


    constructor(props) {
        super(props);
        this.state = {

            editions: [],
            idm: 0





        };



    }

    componentDidMount() {
        const id = window.location.href.split('=')[1];
        this.setState({ idm: id });
        this.getEditions(id);
        /*
        const naziv = "5.Nalaz leventskog sivog dugousana ja podrucju poseda manastira Hilandara.pdf";
        var atoken = localStorage.getItem("jwt");


        axios.get("http://localhost:8083/download/file/" + naziv, {

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
        */
    }





    goToArticles(data) {

        this.props.history.push("/magazines/articles/id=" + this.state.idm + "/&edition=" + data);

    }




    getEditions(x) {

        var atoken = localStorage.getItem("jwt");




        axios.get("http://localhost:8083/magazine/getEditionsForMagazine/" + x, {

            headers: {
                "Authorization-Token": atoken
            }
        }

        ).then(res => {

            console.log("usao u axios");
            //console.log(res.data);

            this.setState({ editions: res.data });
        });
    }


    checkMembership(id, st, eid, ename, pdfname) {




        var atoken = localStorage.getItem("jwt");

        if (st === false) {


            axios.get("http://localhost:8083/user/checkMembershipStatus/" + id, {

                headers: {
                    "Authorization-Token": atoken
                }
            }

            ).then(res => {

                if (res.data.status === "active") {
                    this.downloadPdf(pdfname);
                } else {



                    axios.get("http://localhost:8083/user/checkObjectPayment/" + ename, {

                        headers: {
                            "Authorization-Token": atoken
                        },

                    }
                    ).then(r => {
                        if (r.data.payed === "yes") {
                            this.downloadPdf(pdfname);
                        }
                        else {

                            this.goToPayment(id, eid);
                        }


                    });

                }
            })



        } else {
            this.downloadPdf(pdfname);
        }
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

    goToPayment(idm, eid) {



        //this.props.history.push("/payment");
        var atoken = localStorage.getItem("jwt");
        let data = {

            magazineid: idm,
            editionid: eid,
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

        const ulstyle = {

            listStyleType: "none",
            width: "500px"
        }

        const listyle = {

            padding: "10px",
            overflow: "auto",
            font: "bold 20px/1.5 Helvetica, Verdana, sans-serif",
            color: "yellow"

        }






        return (
            <ul style={ulstyle}>
                {this.state.editions.map(edition => (

                    <li style={listyle} key={edition.name} onClick={() => { this.goToArticles(edition.number) }}> {edition.name} {"  "}<button onClick={() => { this.checkMembership(edition.magazine.id, edition.magazine.openaccess, edition.id, edition.name, edition.pdf) }}>Read this number!</button></li>
                ))}
            </ul>
        );
    }
}

export default MagazineEditions;
