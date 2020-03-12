import './index.scss';

import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import KookKookLogo from '../../static/logo/kookkook_logo.svg';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const login = async () => {
        const response = await axios.post(
            'http://kookkook-backend-dev-ingress.default.202.28.193.100.xip.io/auth/login',
            { username, password },
        );
        setToken(response.data.access_token);
    };

    const tokenRequest = () => {
        axios
            .post(
                '/users/all',
                {},
                { headers: { Authorization: `Bearer ${token}` } },
            )
            .catch(err => {
                console.log(
                    `profile error: ${JSON.stringify(err.response.data)}`,
                );
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
                </Form>
                <Button
                    className="btn-login d-flex mx-auto mt-5 px-4 mb-2"
                    type="submit"
                    onClick={login}
                >
                    <div className="text-btn">Log In</div>
                </Button>
                <a href="/" className="text-forget text-center d-block">
                    Forget Password
                </a>
                <text>Token: {token}</text>
            </Container>
        </div>
    );
};

export default Login;
