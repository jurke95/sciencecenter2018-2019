import React, { Component } from 'react';
import { Card, CardBody, Col, Container, Form, Input, InputGroup, FormGroup, Label, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import MultiSelectReact from 'multi-select-react';
import axios from "axios";
/*
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];
*/
class Register extends Component {

  constructor() {
    super();
    this.state = {
      opt: '',
      multiSelect: [],
      choosedAreas: [],
      stringAreas: [],
      username: "",
      email: "",
      password: "",
      password2: "",
      title: "",
      name: "",
      surname: "",
      city: "",
      country: ""


    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);



  }

  handleChange(event) {
    this.setState({
      opt: event.target.value
    });
  }

  handleChangeF = event => {
    this.setState({

      [event.target.id]: event.target.value


    });

  }


  componentDidMount() {

    this.getAreasOptions();
  }

  getAreasOptions() {
    axios.get("http://localhost:8084/sarea/getSAreasNames").then(res => {


      this.setState({ multiSelect: res.data });



    });


  }


  selectedBadgeClicked(optionsList) {

    this.setState({ choosedAreas: optionsList });

  }

  optionClicked(optionsList) {
    this.setState({ choosedAreas: optionsList });
  }

  handleSubmit(event) {

    event.preventDefault();


    var chosenareas = [];
    this.state.choosedAreas.forEach(function (element) {
      if (element.value !== false)
        chosenareas.push(element.label);
    });

    var myJsonArray = JSON.stringify(chosenareas);
    var modif = myJsonArray.replace("[", "{");
    var modi = modif.replace("]", "}");
    console.log(modi);


    let data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      title: this.state.title,
      opt: this.state.opt,
      name: this.state.name,
      surname: this.state.surname,
      city: this.state.city,
      country: this.state.country
      //chosenareas: modi
    };
    this.renderData(data);
    var datas = JSON.stringify(data);

    fetch('http://localhost:8083/user/registration?chosenareas=' + chosenareas, {
      method: 'POST',
      body: datas,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {

        return res.json();

      }
      )

  }


  renderData(x) {

    console.log(x);
  }

  render() {

    const selectedOptionsStyles = {
      color: "#3c763d",
      backgroundColor: "#dff0d8"
    };
    const optionsListStyles = {
      backgroundColor: "#dff0d8",
      color: "#3c763d"
    };



    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form id="submit_reg" onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" onChange={this.handleChangeF} placeholder="Username" autoComplete="username" id="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" onChange={this.handleChangeF} id="email" autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" onChange={this.handleChangeF} id="password" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" onChange={this.handleChangeF} id="password2" autoComplete="new-password" />
                    </InputGroup>

                    <FormGroup check className="radio">
                      <Input className="form-check-input" type="radio" checked={this.state.opt === "A"} onChange={this.handleChange} id="radio1" name="radios" value="A" />
                      <Label check className="form-check-label" htmlFor="radio1">Author</Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      <Input className="form-check-input" type="radio" checked={this.state.opt === "E"} onChange={this.handleChange} id="radio2" name="radios" value="E" />
                      <Label check className="form-check-label" htmlFor="radio2">Editor</Label>
                    </FormGroup>

                    <FormGroup check className="radio">
                      <Input className="form-check-input" type="radio" checked={this.state.opt === "R"} onChange={this.handleChange} id="radio3" name="radios" value="R" />
                      <Label check className="form-check-label" htmlFor="radio3">Recensent</Label>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Name</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" onChange={this.handleChangeF} id="name" name="text-input" placeholder="John" />

                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Surname</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" onChange={this.handleChangeF} id="surname" name="text-input" placeholder="Smith" />

                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Country</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" onChange={this.handleChangeF} id="country" name="text-input" placeholder="California" />

                      </Col>
                    </FormGroup>


                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">City</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" onChange={this.handleChangeF} id="city" name="text-input" placeholder="Los Angeles" />

                      </Col>
                    </FormGroup>


                    {this.state.opt !== "A" && <div>


                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Your title</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" onChange={this.handleChangeF} id="title" name="text-input" placeholder="Engineer" />

                        </Col>
                      </FormGroup>
                      <Col md="10">
                        <Label htmlFor="text-input">Please select Your science areas</Label>
                      </Col>
                      <Col xs="5" md="10">
                        <MultiSelectReact
                          options={this.state.multiSelect}
                          optionClicked={this.optionClicked.bind(this)}
                          selectedBadgeClicked={this.selectedBadgeClicked.bind(this)}
                          selectedOptionsStyles={selectedOptionsStyles}
                          optionsListStyles={optionsListStyles}
                          isTextWrap={false}
                          isSingleSelect={false} />

                      </Col>

                    </div>
                    }

                    <input color="success" value="Create account" type="submit" />




                  </Form>
                </CardBody>

              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
