import * as yup from 'yup';

import React, { useContext, useEffect, useRef, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import GoBackCenteredModal from '../../components/GoBackMsg/index.js';
import Upload from '../../static/icon/upload.svg';
import axios from 'axios';
import bsCustomFileInput from 'bs-custom-file-input';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';

const PersonalInfo = () => {
    const { state, dispatch } = useContext(Context);
    const [create, setCreate] = useState();
    const history = useHistory();
    const [firstName, setFirstName] = useState(
        (state.registrationData && state.registrationData.firstName) || '',
    );
    const [lastName, setLastName] = useState(
        (state.registrationData && state.registrationData.lastName) || '',
    );
    const [lineID, setLineID] = useState(
        (state.registrationData && state.registrationData.lineID) || '',
    );
    const [fileUpload, setFileUpload] = useState(
        (state.registrationData && state.registrationData.fileUpload) || '',
    );
    const fileRef = useRef(null);

    const schema = yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        lineID: yup.string().required(),
        file: yup.mixed().required(),
    });

    const backToFirstPage = () => {
        dispatch({
            type: 'update-registrationData',
            payload: { firstName, lastName, lineID, fileUpload },
        });
        history.push('/create-account');
    };

    const createAccount = async () => {
        dispatch({
            type: 'update-registrationData',
            payload: { firstName, lastName, lineID, fileUpload },
        });
        const data = new FormData();

        data.append('username', state.registrationData.username);
        data.append('password', state.registrationData.password);
        data.append('firstName', firstName);
        data.append('lastName', lastName);
        data.append('role', state.registrationData.role);
        data.append('lineID', lineID);
        if (state.registrationData.role === 'OWNER') {
            data.append('hno', null);
        } else {
            data.append(
                'hno',
                parseInt(state.user && state.user.hno ? state.user.hno : 1),
            );
        }
        data.append('image', fileUpload, fileUpload.name);

        const res = await axios
            .post('/users', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((res) => {
                setCreate('Create!');
            });

        if (res.status === 409) {
            alert('Username is already used.');
        }
    };

    useEffect(() => {
        bsCustomFileInput.init();
    }, []);

    const toManageAccount = () => {
        history.push('/manage-account');
    };

    return (
        <Container className={`${styles.bgLightBlue} pt-4 vh-100`}>
            <GoBackCenteredModal
                show={!!create}
                title="The account has been created."
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
                    createAccount();
                }}
                initialValues={{
                    firstName:
                        (state.registrationData &&
                            state.registrationData.firstName) ||
                        firstName,
                    lastName:
                        (state.registrationData &&
                            state.registrationData.lastName) ||
                        lastName,
                    lineID:
                        (state.registrationData &&
                            state.registrationData.lineID) ||
                        lineID,
                    file:
                        (state.registrationData &&
                            state.registrationData.file) ||
                        fileUpload,
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    setFieldValue,
                    touched,
                    isValid,
                    errors,
                }) => (
                    <Form
                        className="px-4 pb-4"
                        noValidate
                        onSubmit={handleSubmit}
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

                        <Form.Group controlId="formLineId" className="mb-0">
                            <Form.Label className={styles.textFormLabel}>
                                Upload profile picture
                            </Form.Label>

                            <input
                                id="file"
                                type="file"
                                name="file"
                                onChange={(e) => {
                                    console.log(e.target.files[0]);
                                    setFieldValue('file', e.target.files[0]);
                                    setFileUpload(e.target.files[0]);
                                }}
                                isInvalid={touched.file && !!errors.file}
                                ref={fileRef}
                                hidden
                            />

                            <div
                                className={styles.containerUpload}
                                onClick={() => fileRef.current.click()}
                            >
                                <div
                                    className={`d-flex flex-column ${styles.positionUpload}`}
                                >
                                    <img src={Upload} alt="upload" />
                                    <p
                                        className={`${styles.textUpload} m-0 pt-1`}
                                    >
                                        Click to upload
                                    </p>
                                </div>
                            </div>
                            {errors && (
                                <p className={`${styles.textError} m-0 pt-1`}>
                                    {errors.file}
                                </p>
                            )}
                            <p className={`${styles.textUpload} mb-0`}>
                                {fileUpload && fileUpload.name}
                            </p>
                        </Form.Group>
                        <div className="d-flex">
                            <Button
                                variant="back"
                                className={`mt-4 ${styles.btnCreate} mr-1`}
                                onClick={() => backToFirstPage()}
                            >
                                Back
                            </Button>
                            <Button
                                variant="createAcct"
                                type="submit"
                                className={`mt-4 ${styles.btnCreate} ml-1`}
                            >
                                Create
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default PersonalInfo;
