import * as yup from 'yup';

import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import axios from 'axios';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';

const ResetPassword = () => {
    const history = useHistory();
    const { state } = useContext(Context);
    const [password, setPassword] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState();

    const schema = yup.object({
        password: yup.string().required('This field is required.'),
        passwordConfirmation: yup.string().required('This field is required.'),
    });

    const submitNewPassword = async () => {
        const data = {
            uid: state.workerAccountInfo.uid,
            password,
        };
        await axios.put('/users/password', data);
        history.push(`/manage-account`);
    };

    return (
        <Container className={`${styles.bgLightBlue} pt-4 vh-100`}>
            <Formik
                validationSchema={schema}
                onSubmit={() => {
                    submitNewPassword();
                }}
                initialValues={{
                    password: '',
                    passwordConfirmation: '',
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
                                    touched.password &&
                                    !!errors.passwordConfirmation
                                }
                                value={values.password}
                                placeholder="Enter Password"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="form.SelectRole">
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
                                placeholder="Enter Password Confirmation"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.passwordConfirmation}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button
                            variant="confirmPassword"
                            type="submit"
                            className={`w-100 ${styles.btnCreate}`}
                        >
                            Confirm New Password
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};
export default ResetPassword;
