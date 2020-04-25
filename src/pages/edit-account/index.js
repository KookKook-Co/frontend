import * as yup from 'yup';

import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';

const EditAccount = () => {
    const { state, dispatch } = useContext(Context);
    const history = useHistory();
    const [username, setUsername] = useState(
        (state.workerAccountInfo && state.workerAccountInfo.username) || '',
    );
    const [role, setRole] = useState(
        (state.workerAccountInfo && state.workerAccountInfo.role) || '',
    );

    const schema = yup.object({
        username: yup.string().required(),
        role: yup.string().required(),
    });

    const proceed = () => {
        dispatch({
            type: 'update-workerAccountInfo',
            payload: {
                username,
                role,
            },
        });
        console.log('+++++++++editregisdata1');
        console.log(state.registrationData);

        history.push(`/edit-account-two`);
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
                        state.workerAccountInfo &&
                        state.workerAccountInfo.username,
                    role:
                        (state.workerAccountInfo &&
                            state.workerAccountInfo.role) ||
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
                            variant="editAcct"
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
export default EditAccount;
