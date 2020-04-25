import React, { useContext } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import EditBtn from '../../static/icon/editBtn.svg';
import GetReportBtn from '../../static/icon/getReportBtn.svg';
import Row from 'react-bootstrap/Row';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';

const ShowHousedata = () => {
    const { state } = useContext(Context);
    const history = useHistory();
    const getReport = () => {
        history.push('/get-report');
    };
    const editFlock = () => {
        history.push('/edit-flock');
    };

    const data = [
        {
            infoToShow: 'Chicken In Date',
            value: state.chickenFlockInfo.chickenInDate,
        },
        {
            infoToShow: 'Chicken Out Date',
            value: state.chickenFlockInfo.chickenOutDate,
        },
        {
            infoToShow: 'Number of Chickens',
            value: state.chickenFlockInfo.numberOfChickens,
        },
        {
            infoToShow: 'Chicken Type',
            value: state.chickenFlockInfo.chickenType,
        },
        {
            infoToShow: 'Gender',
            value: state.chickenFlockInfo.gender,
        },
    ];

    return (
        <Container className={`${styles.bgLightBlue} vh-100 pt-5`}>
            <div className="offset-1 mb-3">
                <div className="d-flex mb-3">
                    <div>
                        <p className={`${styles.textGen} mb-1 m-0`}>
                            {state.chickenFlockInfo.generation}
                        </p>
                        <div
                            className={`${styles.bgHouse} d-flex p-1 justify-content-center`}
                        >
                            <div className={`${styles.textHouse}`}>
                                HOUSE {state.user.hno ? state.user.hno : ''}
                            </div>
                        </div>
                    </div>

                    <img
                        className="ml-auto"
                        src={EditBtn}
                        alt="edit_btn"
                        onClick={() => editFlock()}
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

export default ShowHousedata;
