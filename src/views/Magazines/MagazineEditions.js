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

                    <li style={listyle} key={edition.name} onClick={() => { this.goToArticles(edition.number) }}> {edition.name}</li>
                ))}
            </ul>
        );
    }
}

export default MagazineEditions;
