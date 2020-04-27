import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import Form from 'react-bootstrap/Form';
import KookKookLogo from '../../static/logo/kookkook_logo.svg';
import axios from 'axios';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [incorrect, setIncorrect] = useState(false);
    const history = useHistory();
    const { dispatch } = useContext(Context);

    const login = async () => {
        await axios
            .post('/auth/login', {
                username,
                password,
            })
            .then((res) => {
                localStorage.setItem('token', res.data.access_token);
                localStorage.setItem('hno', 1);
                const data = {
                    ...res.data,
                    hno: localStorage.getItem('hno'),
                };
                dispatch({
                    type: 'update-user',
                    payload: data,
                });
                history.push('/');
            })
            .catch((err) => {
                // alert('Username or password is invalid.');
                // console.log('Username or password is invalid.');
                setIncorrect(true);
            });
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
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setIncorrect(false);
                            }}
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
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setIncorrect(false);
                            }}
                            value={password}
                            placeholder="Enter Password"
                        />
                    </Form.Group>
                </Form>
                {incorrect && (
                    <p className={`${styles.textError}`}>
                        Incorrect Username or Password
                    </p>
                )}
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
