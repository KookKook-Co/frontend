import React, { useContext } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import EditBtn from '../../static/icon/editBtn.svg';
import Row from 'react-bootstrap/Row';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';

const ShowWorkerdata = () => {
    const { state } = useContext(Context);
    const history = useHistory();

    const manageWorkerAccount = () => {
        history.push('/edit-account-one');
    };

    const data = [
        {
            infoToShow: 'Firstname',
            value: state.workerAccountInfo.firstName,
        },
        {
            infoToShow: 'Lastname',
            value: state.workerAccountInfo.lastName,
        },
        {
            infoToShow: 'House',
            value: state.user.hno,
        },
        {
            infoToShow: 'Role',
            value: state.workerAccountInfo.role,
        },
        {
            infoToShow: 'LineID',
            value: state.workerAccountInfo.lineID,
        },
    ];

    return (
        <Container className={`${styles.bgLightBlue} vh-100 pt-5`}>
            <div className="offset-1 mb-3">
                <div className="d-flex mb-3">
                    <img
                        src={
                            state.workerAccountInfo &&
                            state.workerAccountInfo.imageUrl
                        }
                        alt="profile_pic"
                        className={`mb-2 ${styles.imgProfile}`}
                    />

                    <div className="d-flex flex-column ml-auto">
                        <img
                            className="ml-auto"
                            src={EditBtn}
                            alt="edit_btn"
                            onClick={() => manageWorkerAccount()}
                        />
                        <p
                            className={`${styles.textReset} mr-2`}
                            onClick={() => history.push('/reset-password')}
                        >
                            Reset Password
                        </p>
                    </div>
                </div>

                {data.map((item, index) => (
                    <Row key={index}>
                        <Col xs={6}>
                            <p className={styles.infoToShow}>
                                {item.infoToShow}
                            </p>
                        </Col>
                        <Col xs={6}>
                            <p className={styles.textValue}>{item.value}</p>
                        </Col>
                    </Row>
                ))}
            </div>
        </Container>
    );
};

export default ShowWorkerdata;
