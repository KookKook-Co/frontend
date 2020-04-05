import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Upload from '../../static/icon/upload.svg';
import bsCustomFileInput from 'bs-custom-file-input';
import styles from './index.module.scss';

const PersonalInfo = () => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [lineId, setLineId] = useState();
    const [profilePic, setProfilePic] = useState();
    const [fileUpload, setFileUpload] = useState();
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

                <Form.Group controlId="formLineId">
                    <Form.Label className={styles.textFormLabel}>
                        Upload profile picture
                    </Form.Label>

                    <Form.Control
                        type="file"
                        onChange={(e) => setProfilePic(e.target.value)}
                        value={profilePic}
                        ref={(fileInput) => setFileUpload(fileInput)}
                        hidden
                    />
                    <div
                        className={styles.containerUpload}
                        onClick={() => fileUpload.click()}
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
                </Form.Group>
            </Form>

            <div className="px-4">
                <Button
                    variant="createAcct"
                    type="create"
                    className={`w-100 ${styles.btnCreate}`}
                >
                    Create Account
                </Button>
            </div>
        </Container>
    );
};

export default PersonalInfo;
