import React, { useContext } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import EditBtn from '../../static/icon/editBtn.svg';
import GetReportBtn from '../../static/icon/getReportBtn.svg';
import Row from 'react-bootstrap/Row';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';

const ShowWorkerdata = () => {
    const { state } = useContext(Context);
    const history = useHistory();
    const getReport = () => {
        history.push('/get-report');
    };
    const manageWorkerAccount = () => {
        history.push('/create-account');
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
            value: state.workerAccountInfo.hno,
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

                    <img
                        className="ml-auto"
                        src={EditBtn}
                        alt="edit_btn"
                        onClick={() => manageWorkerAccount()}
                    />
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
            <div className="d-flex justify-content-center">
                <img
                    src={GetReportBtn}
                    alt="export_btn"
                    onClick={() => getReport()}
                />
            </div>
        </Container>
    );
};

export default ShowWorkerdata;
