import React, { useContext, useState } from 'react';

import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import { FillInChicken } from './FillInChicken';
import { FillInConfirmation } from './FillInConfirmation';
import { FillInConsumption } from './FillInConsumption';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import sendBtn from '../../static/icon/sendBtn.svg';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';
import viewHistoryBtn from '../../static/icon/viewHistoryBtn.svg';

const DailyData = () => {
    const { state, dispatch } = useContext(Context);
    const localDate = () => {
        const tzoffset = new Date().getTimezoneOffset() * 60000;
        return new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
    };
    const [startDate, setStartDate] = useState(localDate);
    const history = useHistory();
    const getReport = () => {
        history.push('/get-report');
    };
    const fillInConfirmation = () => {
        history.push('/FillInConfirmation');
    };
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <Container className={`mt-3 ${styles.containerHeight}`}>
            {showConfirm ? (
                <FillInConfirmation />
            ) : (
                <div>
                    <div>
                        <Form.Group controlId="formDate">
                            <Form.Label className={styles.selectDate}>
                                {' '}
                                HOUSE {state.user.hno}{' '}
                            </Form.Label>
                            <Form.Control
                                type="date"
                                defaultValue={startDate.substr(0, 10)}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </Form.Group>
                    </div>

                    <div>
                        <Tabs
                            defaultActiveKey="dailyData"
                            id="uncontrolled-tab-example"
                        >
                            <Tab eventKey="dailyData" title="Daily Data">
                                <FillInConsumption />
                            </Tab>
                            <Tab eventKey="chickenData" title="Chicken Data">
                                <FillInChicken />
                            </Tab>
                        </Tabs>
                    </div>

                    <div className="d-flex justify-content-around">
                        <img
                            src={viewHistoryBtn}
                            alt="viewHistory_Btn"
                            onClick={() => getReport()}
                        />
                        <img
                            src={sendBtn}
                            alt="send_Btn"
                            onClick={() => fillInConfirmation()}
                        />
                    </div>
                </div>
            )}
        </Container>
    );
};

export default DailyData;
