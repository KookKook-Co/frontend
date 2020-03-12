import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import KookKookLogo from "../../static/logo/kookkook_logo.svg";
import Container from "react-bootstrap/Container";
import "./index.scss";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("temp");
  const history = useHistory();

  const login = async () => {
    setToken("hihi");
    console.log("hi1");
    const res = axios.post(
      "http://kookkook-backend-dev-ingress.default.202.28.193.100.xip.io/auth/login",
      { username, password }
    );
    // .then(res => {
    //   // res.redirect("/main");
    //   console.log("in callback");
    //   console.log(res);
    //   setToken(res);
    // });
    history.push("/main");
    console.log("hi");
    // setToken(res);
  };

  const tokenRequest = () => {
    axios
      .post("/users/all", {}, { headers: { Authorization: `Bearer ${token}` } })
      .catch(err => {
        console.log(`profile error: ${JSON.stringify(err.response.data)}`);
      });
  };

  return (
    <div>
      <img
        src={KookKookLogo}
        alt="kookkook_logo"
        className="d-flex mx-auto mt-5"
      />
      <Container>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label className="text-label">USERNAME</Form.Label>
            <Form.Control
              type="text"
              onChange={e => setUsername(e.target.value)}
              value={username}
              placeholder="Enter Username"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="text-label">PASSWORD</Form.Label>
            <Form.Control
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              placeholder="Enter Password"
            />
          </Form.Group>
          <Button
            className="btn-login d-flex mx-auto mt-5 px-4 mb-2"
            type="button"
            onClick={() => login()}
          >
            <div className="text-btn">Log In</div>
          </Button>
          {token}
          <a href="/" className="text-forget text-center d-block">
            Forget Password
          </a>
          <div></div>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
