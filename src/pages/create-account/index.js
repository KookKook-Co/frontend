import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import Form from 'react-bootstrap/Form';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';

const CreateAccount = () => {
    const { state, dispatch } = useContext(Context);
    const history = useHistory();
    const [username, setUsername] = useState(
        (state.registrationData && state.registrationData.username) || '',
    );
    const [password, setPassword] = useState(
        (state.registrationData && state.registrationData.password) || '',
    );
    const [passwordConfirm, setPasswordConfirm] = useState(
        (state.registrationData && state.registrationData.passwordConfirm) ||
            '',
    );
    const [hno, setHno] = useState(
        (state.registrationData && state.registrationData.hno) || '',
    );
    const [role, setRole] = useState(
        (state.registrationData && state.registrationData.role) || '',
    );

    const showHouseDropdown = () => {
        if (role === 'OWNER') {
            return (
                <Form.Control
                    as="select"
                    onChange={(e) => setHno(e.target.value)}
                    value={hno}
                    custom
                    required
                    disabled
                >
                    <option disabled hidden>
                        Select House
                    </option>
                    {[1, 2, 3, 4, 5].map((item) => (
                        <option key={`selection- ${item}`} value={item}>
                            House {item}
                        </option>
                    ))}
                </Form.Control>
            );
        } else {
            return (
                <Form.Control
                    as="select"
                    onChange={(e) => setHno(e.target.value)}
                    value={hno}
                    custom
                    required
                >
                    <option disabled hidden>
                        Select House
                    </option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                        <option key={`selection- ${item}`} value={item}>
                            House {item}
                        </option>
                    ))}
                </Form.Control>
            );
        }
    };
    const proceed = () => {
        dispatch({
            type: 'update-registrationData',
            payload: {
                username,
                password,
                passwordConfirm,
                hno,
                role,
            },
        });
        console.log('+++++++++regisdata1');
        console.log(state.registrationData);
        history.push(`/personal-info`);
    };

    return (
        <Container className={`${styles.bgLightBlue} pt-4 vh-100`}>
            <Form className="px-4 pb-4">
                <Form.Group controlId="formUsername">
                    <Form.Label className={styles.textFormLabel}>
                        Username
                    </Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        placeholder="Enter Username"
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label className={styles.textFormLabel}>
                        Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Enter Password"
                    />
                </Form.Group>

                <Form.Group controlId="formPasswordConfirmation">
                    <Form.Label className={styles.textFormLabel}>
                        Password Confirmation
                    </Form.Label>
                    <Form.Control
                        type="password"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        value={passwordConfirm}
                        placeholder="Enter Password"
                    />
                </Form.Group>

                <Form.Group controlId="form.SelectRole">
                    <Form.Label className={styles.textFormLabel}>
                        Role
                    </Form.Label>
                    <Form.Control
                        as="select"
                        onChange={(e) => setRole(e.target.value)}
                        value={role}
                        custom
                        required
                    >
                        <option disabled hidden>
                            Select Role
                        </option>
                        <option>WORKER</option>
                        <option>OWNER</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="form.SelectHouse">
                    <Form.Label className={styles.textFormLabel}>
                        House
                    </Form.Label>
                    <div>{showHouseDropdown()}</div>
                </Form.Group>
            </Form>

            <div className="px-4">
                <Button
                    variant="createAcct"
                    type="create"
                    className={`w-100 ${styles.btnCreate}`}
                    onClick={() => {
                        proceed();
                    }}
                >
                    Next >
                </Button>
            </div>
        </Container>
    );
};
export default CreateAccount;
