import React, { useContext, useEffect, useRef, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import Form from 'react-bootstrap/Form';
import Upload from '../../static/icon/upload.svg';
import axios from 'axios';
import bsCustomFileInput from 'bs-custom-file-input';
import styles from './index.module.scss';

const PersonalInfo = () => {
    const { state, dispatch } = useContext(Context);
    const [firstName, setFirstName] = useState(
        (state.registrationData && state.registrationData.firstName) || '',
    );
    const [lastName, setLastName] = useState(
        (state.registrationData && state.registrationData.lastName) || '',
    );
    const [email, setEmail] = useState(
        (state.registrationData && state.registrationData.email) || '',
    );
    const [lineId, setLineId] = useState(
        (state.registrationData && state.registrationData.lineId) || '',
    );
    const [fileUpload, setFileUpload] = useState();
    const fileRef = useRef(null);

    const createAccount = async () => {
        dispatch({
            type: 'update-registrationData',
            payload: { firstName, lastName, email, lineId },
        });
        const data = new FormData();

        data.append('username', state.registrationData.username);
        data.append('password', state.registrationData.password);
        data.append('firstName', firstName);
        data.append('lastName', lastName);
        data.append('role', state.registrationData.role);
        data.append('lineID', lineId);
        if (state.registrationData.role === 'OWNER') {
            data.append('hno', null);
        } else {
            data.append('hno', parseInt(state.registrationData.hno));
        }
        data.append('image', fileUpload, fileUpload.name);

        const res = await axios.post('/users', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    };

    useEffect(() => {
        bsCustomFileInput.init();
    }, []);

    return (
        <Container className={`${styles.bgLightBlue} pt-4 vh-100`}>
            <div className="px-4 mb-3">
                <p className={`${styles.textTitle} m-0 mb-2`}>
                    PERSONAL INFORMATION
                </p>
                <div className={`${styles.borderTitle}`}></div>
            </div>
            <Form className="px-4 pb-4">
                <Form.Group controlId="formFirstname">
                    <Form.Label className={styles.textFormLabel}>
                        Firstname
                    </Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        placeholder="Enter Firstname"
                    />
                </Form.Group>

                <Form.Group controlId="formLastname">
                    <Form.Label className={styles.textFormLabel}>
                        Lastname
                    </Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        placeholder="Enter Lastname"
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label className={styles.textFormLabel}>
                        Email
                    </Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter Email"
                    />
                </Form.Group>

                <Form.Group controlId="formLineId">
                    <Form.Label className={styles.textFormLabel}>
                        Line ID
                    </Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setLineId(e.target.value)}
                        value={lineId}
                        placeholder="johndoeinwza"
                    />
                </Form.Group>

                <Form.Group controlId="formLineId" className="mb-0">
                    <Form.Label className={styles.textFormLabel}>
                        Upload profile picture
                    </Form.Label>

                    <input
                        type="file"
                        onChange={(e) => setFileUpload(e.target.files[0])}
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
                            <p className={`${styles.textUpload} m-0 pt-1`}>
                                Click to upload
                            </p>
                        </div>
                    </div>
                    <p className={`${styles.textUpload} mb-0`}>
                        {fileUpload && fileUpload.name}
                    </p>
                </Form.Group>
            </Form>

            <div className="px-4">
                <Button
                    variant="createAcct"
                    type="create"
                    className={`w-100 ${styles.btnCreate}`}
                    onClick={() => createAccount()}
                >
                    Create Account
                </Button>
            </div>
        </Container>
    );
};

export default PersonalInfo;
