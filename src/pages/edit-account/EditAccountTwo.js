import * as yup from 'yup';

import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import GoBackCenteredModal from '../../components/GoBackMsg/index.js';
import axios from 'axios';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';

const EditAccountTwo = () => {
    const { state, dispatch } = useContext(Context);
    const [create, setCreate] = useState();
    const history = useHistory();
    const [firstName, setFirstName] = useState(
        (state.workerAccountInfo && state.workerAccountInfo.firstName) || '',
    );
    const [lastName, setLastName] = useState(
        (state.workerAccountInfo && state.workerAccountInfo.lastName) || '',
    );
    const [lineID, setLineID] = useState(
        (state.workerAccountInfo && state.workerAccountInfo.lineID) || '',
    );

    const schema = yup.object({
        firstName: yup.string().required('This field is required.'),
        lastName: yup.string().required('This field is required.'),
        lineID: yup.string().required('This field is required.'),
    });

    const editAccount = async () => {
        dispatch({
            type: 'update-workerAccountInfo',
            payload: { firstName, lastName, lineID },
        });
        console.log('+++++++++regisdata2');
        console.log(state.workerAccountInfo);

        const data = {
            uid: state.workerAccountInfo.uid,
            username: state.workerAccountInfo.username,
            firstName: state.workerAccountInfo.firstName,
            lastName: state.workerAccountInfo.lastName,
            role: state.workerAccountInfo.role,
            lineID: state.workerAccountInfo.lineID,
        };

        console.log(data);

        await axios.put('/users', data);

        setCreate('Create!');
    };

    const toManageAccount = () => {
        history.push('/manage-account');
    };

    return (
        <Container className={`${styles.bgLightBlue} pt-4 vh-100`}>
            <GoBackCenteredModal
                show={!!create}
                title="The account has been edited."
                actionText="CLOSE"
                onAction={() => {
                    toManageAccount();
                    setCreate();
                }}
            />
            <div className="px-4 mb-3">
                <p className={`${styles.textTitle} m-0 mb-2`}>
                    PERSONAL INFORMATION
                </p>
                <div className={`${styles.borderTitle}`}></div>
            </div>
            <Formik
                validationSchema={schema}
                onSubmit={() => {
                    editAccount();
                }}
                initialValues={{
                    firstName:
                        state.workerAccountInfo &&
                        state.workerAccountInfo.firstName,
                    lastName:
                        state.workerAccountInfo &&
                        state.workerAccountInfo.lastName,
                    lineID:
                        state.workerAccountInfo &&
                        state.workerAccountInfo.lineID,
                }}
            >
                {({
                    handleSubmit,
                    handleChange,

                    values,
                    touched,

                    errors,
                }) => (
                    <Form
                        noValidate
                        onSubmit={handleSubmit}
                        className="px-4 pb-4"
                    >
                        <Form.Group controlId="formFirstname">
                            <Form.Label className={styles.textFormLabel}>
                                Firstname
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                onChange={(e) => {
                                    handleChange(e);
                                    setFirstName(e.target.value);
                                }}
                                isInvalid={
                                    touched.firstName && !!errors.firstName
                                }
                                value={values.firstName}
                                placeholder="Enter Firstname"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.firstName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formLastname">
                            <Form.Label className={styles.textFormLabel}>
                                Lastname
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                onChange={(e) => {
                                    handleChange(e);
                                    setLastName(e.target.value);
                                }}
                                isInvalid={
                                    touched.lastName && !!errors.lastName
                                }
                                value={values.lastName}
                                placeholder="Enter Lastname"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.lastName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formLineId">
                            <Form.Label className={styles.textFormLabel}>
                                Line ID
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="lineID"
                                onChange={(e) => {
                                    handleChange(e);
                                    setLineID(e.target.value);
                                }}
                                isInvalid={touched.lineID && !!errors.lineID}
                                value={values.lineID}
                                placeholder="johndoeinwza"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.lineID}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button
                            variant="editAcct"
                            type="submit"
                            className={`w-100 mt-3 ${styles.btnCreate}`}
                        >
                            Save
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default EditAccountTwo;
