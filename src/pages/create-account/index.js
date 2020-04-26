import * as yup from 'yup';

import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
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
    const [passwordConfirmation, setPasswordConfirmation] = useState(
        (state.registrationData &&
            state.registrationData.passwordConfirmation) ||
            '',
    );
    const [role, setRole] = useState(
        (state.registrationData && state.registrationData.role) || '',
    );

    const schema = yup.object({
        username: yup.string().required('This field is required.'),
        password: yup.string().required('This field is required.'),
        passwordConfirmation: yup.string().required('This field is required.'),
        role: yup.string().required('This field is required.'),
    });

    const proceed = () => {
        dispatch({
            type: 'update-registrationData',
            payload: {
                username,
                password,
                passwordConfirmation,
                role,
            },
        });
        console.log('+++++++++regisdata1');
        console.log(state.registrationData);

        history.push(`/personal-info`);
    };

    return (
        <Container className={`${styles.bgLightBlue} pt-4 vh-100`}>
            <Formik
                validationSchema={schema}
                onSubmit={() => {
                    proceed();
                }}
                initialValues={{
                    username:
                        (state.registrationData &&
                            state.registrationData.username) ||
                        '',
                    password:
                        (state.registrationData &&
                            state.registrationData.password) ||
                        '',
                    passwordConfirmation:
                        (state.registrationData &&
                            state.registrationData.passwordConfirmation) ||
                        '',
                    role:
                        (state.registrationData &&
                            state.registrationData.role) ||
                        '',
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                }) => (
                    <Form
                        noValidate
                        onSubmit={handleSubmit}
                        className="px-4 pb-4"
                    >
                        <Form.Group controlId="formUsername">
                            <Form.Label className={styles.textFormLabel}>
                                Username
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                onChange={(e) => {
                                    handleChange(e);
                                    setUsername(e.target.value);
                                }}
                                isInvalid={
                                    touched.username && !!errors.username
                                }
                                value={values.username}
                                placeholder="Enter Username"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label className={styles.textFormLabel}>
                                Password
                            </Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={(e) => {
                                    handleChange(e);
                                    setPassword(e.target.value);
                                }}
                                isInvalid={
                                    touched.password && !!errors.password
                                }
                                value={values.password}
                                placeholder="Enter Password"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formPasswordConfirmation">
                            <Form.Label className={styles.textFormLabel}>
                                Password Confirmation
                            </Form.Label>
                            <Form.Control
                                type="password"
                                name="passwordConfirmation"
                                onChange={(e) => {
                                    handleChange(e);
                                    setPasswordConfirmation(e.target.value);
                                }}
                                isInvalid={
                                    touched.passwordConfirmation &&
                                    !!errors.passwordConfirmation
                                }
                                value={values.passwordConfirmation}
                                placeholder="Enter Password"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.passwordConfirmation}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="form.SelectRole">
                            <Form.Label className={styles.textFormLabel}>
                                Role
                            </Form.Label>
                            <Form.Control
                                as="select"
                                name="role"
                                onChange={(e) => {
                                    handleChange(e);
                                    setRole(e.target.value);
                                }}
                                value={values.role}
                                isInvalid={touched.role && !!errors.role}
                                defaultValue=""
                            >
                                <option value="" disabled hidden>
                                    Select Role
                                </option>
                                <option value="WORKER">WORKER</option>
                                <option value="OWNER">OWNER</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.role}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button
                            variant="createAcct"
                            type="submit"
                            className={`w-100 ${styles.btnCreate}`}
                        >
                            Next >
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};
export default CreateAccount;
