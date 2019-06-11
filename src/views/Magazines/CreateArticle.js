import React, { Component } from 'react';
import axios from "axios";
import { Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { FilePicker } from 'react-file-picker';
import RemoveLogo from './remove.png';
class CreateArticle extends Component {


    constructor(props) {
        super(props);
        this.state = {


            magid: 0,
            title: "",
            coauthors: [],
            keywords: [],
            abstract: "",
            pdf: null,
            multiSelect: [],
            opt: "",
            author: "",
            keyword: "",
            pdfName: "",
            mname: ""





        };

        this.handleChangeA = this.handleChangeA.bind(this);
        this.handleChangeCO = this.handleChangeCO.bind(this);
        this.addCoauthor = this.addCoauthor.bind(this);
        this.addKeyword = this.addKeyword.bind(this);
        this.setPDF = this.setPDF.bind(this);



    }


    componentDidMount() {

        this.getAreasOptions();




    }

    getAreasOptions() {
        axios.get("http://localhost:8083/sarea/getSAreasNames").then(res => {


            this.setState({ multiSelect: res.data });



        });


    }



    getMagazine(magid) {

        var atoken = localStorage.getItem("jwt");
        axios.get("http://localhost:8083/magazine/getMagazineById/" + magid, {

            headers: {
                "Authorization-Token": atoken
            }
        }


        ).then(res => {


            this.setState({ mname: res.data.name });



        });


    }


    handleChangeA(event) {
        this.setState({
            opt: event.target.value
        });


    }


    handleChangeCO = event => {
        this.setState({

            author: event.target.value


        });

    }

    handleChangeKW = event => {
        this.setState({

            keyword: event.target.value


        });

    }

    setPDF(file) {


        this.setState({

            pdf: file,
            pdfName: file.name



        });
        alert("file uploaded");


    }

    addCoauthor(event) {
        event.preventDefault();
        this.state.coauthors.push(this.state.author);
        this.setState(this.state);
    }

    removeCoauthor(a) {
        //  this.state.coauthors.push(this.state.author);

        this.state.coauthors.splice(this.state.coauthors.indexOf(a), 1);
        this.setState(this.state);
    }

    addKeyword(event) {
        event.preventDefault();
        this.state.keywords.push(this.state.keyword);
        this.setState(this.state);
    }

    removeKeyword(k) {
        //  this.state.coauthors.push(this.state.author);

        this.state.keywords.splice(this.state.keywords.indexOf(k), 1);
        this.setState(this.state);
    }

    handleSubmit = (event) => {

        event.preventDefault();

        //this.props.history.push("/payment");
        var atoken = localStorage.getItem("jwt");
        let data = {
            name: this.state.mname,
            coauthors: this.state.coauthors,
            keywords: this.state.keywords,
            abstractt: this.state.abstract,
            magid: this.state.magid,
            area: this.state.opt,
            pdf: this.state.pdfName,
            taskid: localStorage.getItem("trenutniTaskId")
        };

        var datas = JSON.stringify(data);
        let formData = new FormData();
        formData.append('file', this.state.pdf);


        fetch('http://localhost:8083/swork/create', {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization-Token": atoken


            }
        })
            .then(res => {

                alert("Successfully saved pdf");

                fetch('http://localhost:8083/swork/save', {
                    method: 'POST',
                    body: datas,
                    headers: {
                        "Authorization-Token": atoken,
                        'Content-Type': 'application/json'

                    }
                }).then(res => {
                    alert("Successfully created");
                });





            });
    }


    render() {




        return (

            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form id="submit_reg" onSubmit={this.handleSubmit}>
                                        <h1>Create new article in magazine</h1>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="input-group"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Title" id="title" />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>@</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Coauthors" id="coauthors" onChange={this.handleChangeCO} />
                                            <button disabled={this.state.author === ""} onClick={this.addCoauthor}>Add coauthor</button>

                                        </InputGroup>

                                        <ul >
                                            {this.state.coauthors.map(author => (

                                                <li key={author}>
                                                    {author + "  "}<img src={RemoveLogo} alt="remove" style={{ cursor: 'pointer' }} onClick={() => { this.removeCoauthor(author) }} />
                                                </li>
                                            ))}
                                        </ul>


                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>#</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Keywords" id="keywords" onChange={this.handleChangeKW} />
                                            <button disabled={this.state.keyword === ""} onClick={this.addKeyword}>Add keyword</button>

                                        </InputGroup>

                                        <ul >
                                            {this.state.keywords.map(keyword => (

                                                <li key={keyword}>
                                                    {keyword}<img src={RemoveLogo} alt="remove" style={{ cursor: 'pointer' }} onClick={() => { this.removeKeyword(keyword) }} />
                                                </li>
                                            ))}
                                        </ul>

                                        <div>
                                            <select onChange={this.handleChangeA}>

                                                {this.state.multiSelect.map(area => (



                                                    <option key={area.value}>{area.value}</option>
                                                ))}

                                            </select>

                                        </div>
                                        <br>
                                        </br>

                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i aria-label="With textarea"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="textarea" placeholder="Abstract" id="abstract" />
                                        </InputGroup>


                                        <div>
                                            <FilePicker
                                                extensions={['pdf']}
                                                onChange={FileObject => this.setPDF(FileObject)}

                                            >
                                                <button type="button">
                                                    Click to upload PDF
                                                </button>
                                            </FilePicker>
                                            <p>{this.state.pdfName}</p>


                                        </div>




                                        <input color="success" value="Create" type="submit" />




                                    </Form>
                                </CardBody>

                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

        )
    }
}

export default CreateArticle;
