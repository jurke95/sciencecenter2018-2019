import React, { Component } from "react";
//import axios from "axios";
//import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
//import logo from './swork.jpg';


class SearchComponent extends Component {









  render() {

    const s003 = {
      width: "100%",
      maxWidth: "500px",
      marginBottom: 0
    };

    const innerForm = {
      background: "#fff",
      display: "flex",
      width: "70%",
      // msFlexPack: "justify",
      //justifyContent: "space-between",
      msflexlign: "center",
      alignItems: "center",
      boxShadow: "0px 8px 20px 0px rgba(0, 0, 0, 0.15)",
      borderRadius: "3px",
      paddingRight: "0"
    };

    const buttonSearch = {

      height: "100%",
      width: "100px",
      color: "#fff",
      cursor: "pointer",
      background: "#63c76a",
      transition: " all .2s ease-out, color .2s ease-out",
      paddingCenter: "100px"
    }


    const inputFirst = {

      width: "200px",
      borderRight: "1px solid rgba(0, 0, 0, 0.1)"


    }

    const h1style = {

      padding: "40px",
      overflow: "auto",
      font: "bold 32px/1.5 Josefin Sans,cursive",
      color: "yellow"

    }

    const inputStyle = {


      width: "500px",
    }

    const selectStyle = {

      color: "blue"
    }




    return (


      <div className="s003" style={s003}>
        <h1 style={h1style}>Search for scientific works!</h1>
        <form>
          <div className="inner-form" style={innerForm}>

            <div className="input-select">
              <select data-trigger="" name="choices-single-defaul" style={selectStyle}>
                <option placeholder="">Magazine name</option>
                <option>Article title</option>
                <option>Author's name </option>
                <option>Keywords</option>
                <option>Article Content</option>
                <option>Science areas</option>
              </select>

            </div>
            <div className="input-field second-wrap">
              <input style={inputStyle} id="search" type="text" placeholder="Search for articles here.." />
            </div>
            <div className="input-field third-wrap">
              <button className="btn-search" type="button" style={buttonSearch}>
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

    );











  }















}
export default SearchComponent;
