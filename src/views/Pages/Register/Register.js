import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, FormGroup, Label, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Register extends Component {

  constructor() {
    super();
    this.state = {
      opt: ''

    };
    this.handleChange = this.handleChange.bind(this);


  }

  handleChange(event) {
    this.setState({
      opt: event.target.value
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
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" />
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
                    {this.state.opt !== "A" && <div>
                      < InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Area" autoComplete="areas" />
                      </InputGroup>
                    </div>
                    }

                    <Button color="success" block>Create Account</Button>




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
