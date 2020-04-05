import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import KookKookLogo from '../../static/logo/kookkook_logo.svg';
import axios from 'axios';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const login = async () => {
        const response = await axios.post(
            'http://kookkook-backend-dev-ingress.default.202.28.193.100.xip.io/auth/login',
            { username, password },
        );
        localStorage.setItem('token', response.data.access_token);
        history.push('/dashbaord');
    };

    return (
        <div className={`${styles.bgLightBlue} vh-100`}>
            <img
                src={KookKookLogo}
                alt="kookkook_logo"
                className="d-flex mx-auto pt-5"
            />
            <Container>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label className={styles.textLabel}>
                            USERNAME
                        </Form.Label>
                        <Form.Control
                            type="text"
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                            placeholder="Enter Username"
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className={styles.textLabel}>
                            PASSWORD
                        </Form.Label>
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
                    type="button"
                    onClick={() => login()}
                >
                    <div className={styles.textBtn}>Log In</div>
                </Button>
            </Container>
        </div>
    );
};

export default Login;
