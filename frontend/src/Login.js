import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import CapstoneApi from "./api";

export default function Login({ setToken }) {
  const history = useHistory();
  const [activeView, setActiveView] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
    errors: [],
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((fdata) => ({
      ...fdata,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let data;
    let endpoint;

    if (activeView === "register") {
      if(formData.password !== formData.password2){
        alert("Passwords must match");
        setFormData({username:formData.username, password:"", password2:"", errors: []});
        return
      }
      data = {
        username: formData.username,
        password: formData.password
      };
      endpoint = "register";
    } else {
      data = {
        username: formData.username,
        password: formData.password,
      };
      endpoint = "login";
    }

    let token;

    try {
      const response = await CapstoneApi[endpoint](data);

      if (response?.toString().indexOf("Error") >= 0){
        alert(response);
        setFormData({
          username: "",
          password: "",
          password2: "",
          errors: [],
        });
        return
      }
    
      token=response;
      setToken(token);
      history.push("/households");
      

    } catch (errors) {
      return setFormData((data) => ({ ...data, errors }));
    }

    
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mt-5 pt-3">
        <Col className="mt-5" md={6}>
          <ButtonGroup className="d-flex justify-content-end">
            <Button
              variant="info"
              className={activeView === "login" ? "active" : ""}
              onClick={() => setActiveView("login")}
            >
              Login
            </Button>
            <Button
              variant="info"
              className={activeView === "register" ? "active" : ""}
              onClick={() => setActiveView("register")}
            >
              Register
            </Button>
          </ButtonGroup>
          <Card>
            <Card.Body>
              <Form className="mt-2" onSubmit={submitHandler}>
                <Form.Group className="w-100">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    className="mb-2"
                    onChange={changeHandler}
                    type="text"
                    name="username"
                    value={formData.username}
                    required
                  />
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="mb-2"
                    onChange={changeHandler}
                    type="password"
                    name="password"
                    value={formData.password}
                    required
                  />
                  {activeView === "register" && (
                    <>
                      <Form.Label>Retype Password</Form.Label>
                      <Form.Control
                        className="mb-2"
                        onChange={changeHandler}
                        type="password"
                        name="password2"
                        value={formData.password2}
                        required
                      />
                    </>
                  )}
                </Form.Group>
                {formData.errors.length > 0 && (
                  <Alert type="danger" messages={formData.errors} />
                )}
                <Button
                  className="d-block ml-auto"
                  variant="info"
                  type="submit"
                >
                  {activeView === "login" ? "Login" : "Register"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
