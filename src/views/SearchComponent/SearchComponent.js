import React, { Component } from "react";
import axios from "axios";
import MaterialTable from 'material-table'




class SearchComponent extends Component {


  constructor() {
    super();
    this.state = {
      option: 'Article title',
      value: "",
      articles: [],
      aa: " "



    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeV = this.handleChangeV.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);



  }


  handleChange(event) {
    this.setState({
      option: event.target.value
    });


  }

  handleChangeV(event) {
    this.setState({
      value: event.target.value
    });


  }


  handleSubmit(event) {
    event.preventDefault();

    console.log(this.state.option);
    console.log(this.state.value);

    if (this.state.option === "Article title") {


      axios.get("http://localhost:8083/search/getArticlesByName/" + this.state.value, {


      }

      ).then(res => {

        console.log(res.data);
        this.setState({
          articles: res.data
        });

      });


    } else if (this.state.option === "Magazine name") {

      axios.get("http://localhost:8083/search/getArticlesByMagazine/" + this.state.value, {


      }

      ).then(res => {

        console.log(res.data);
        this.setState({
          articles: res.data
        });

      });





    } else if (this.state.option === "Keyword") {


      axios.get("http://localhost:8083/search/getArticlesByKeyword/" + this.state.value, {


      }

      ).then(res => {

        console.log(res.data);
        this.setState({
          articles: res.data
        });

      });




    } else if (this.state.option === "Science area") {



      axios.get("http://localhost:8083/search/getArticlesByArea/" + this.state.value, {


      }

      ).then(res => {

        console.log(res.data);
        this.setState({
          articles: res.data
        });

      });







    } else if (this.state.option === "Author") {

      var n = "" + this.state.value.split(' ')[0];
      var s = "" + this.state.value.split(' ')[1];

      axios.get("http://localhost:8083/search/getArticlesByAuthor/" + n + "/" + s, {


      }

      ).then(res => {


        console.log(res.data);
        this.setState({
          articles: res.data
        });

      });





    }















  }

  render() {




    const s003 = {
      width: "100%",
      maxWidth: "700px",
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

    /*
        const inputFirst = {
    
          width: "200px",
          borderRight: "1px solid rgba(0, 0, 0, 0.1)"
    
    
        }
    */
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

    var pom = "";

    this.state.articles.map(article => (

      article.authors.map(author => (

        pom = pom + author.name + " " + author.surname + '\n'

      ))
    ))

    var key = "";

    this.state.articles.map(article => (

      article.keywords.map(keyword => (

        key = key + keyword.name + '\n'

      ))
    ))


    var d = this.state.articles.map(article => (


      {
        name: article.name,
        magazine: article.magazine,
        area: article.sciencearea,
        authors: pom,
        keywords: key



      }

    ))



    return (





      <div className="s003" style={s003}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <h1 style={h1style}>Search for scientific works!</h1>
        <form id="submit_srch" onSubmit={this.handleSubmit}>
          <div className="inner-form" style={innerForm}>

            <div className="input-select">
              <select onChange={this.handleChange} name="choices-single-defaul" style={selectStyle}>
                <option placeholder="">Article title</option>
                <option>Magazine name</option>
                <option>Author </option>
                <option>Keyword</option>
                <option>Article Content</option>
                <option>Science area</option>
              </select>

            </div>
            <div className="input-field second-wrap">
              <input style={inputStyle} onChange={this.handleChangeV} id="search" type="text" placeholder="Search for articles here.." />
            </div>
            <div className="input-field third-wrap">
              <button className="btn-search" type="submit" style={buttonSearch}>
                Search
              </button>
            </div>
          </div>
        </form>
        <br>
        </br>

        <div style={{ maxWidth: '200%' }}>
          <MaterialTable
            columns={[
              { title: 'Name', field: 'name' },
              { title: 'Area', field: 'area' },
              { title: 'Magazine', field: 'magazine' },
              { title: 'Authors', field: 'authors' },
              { title: 'Keywords', field: 'keywords' }
            ]}



            /* name: 'Hemijski sastav piva', area: 'Chemistry', magazine: 'Hemijski magazin', authors: 'Marko Juric, Dragan Dulic', keywords: 'Pivo, hemija'*/
            data={d}
            title="Results"
          />
        </div>


      </div>



    );
  }
}
export default SearchComponent;


