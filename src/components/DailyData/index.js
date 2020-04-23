import React, { useContext, useState } from 'react';

import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import { FillInChicken } from './FillInChicken';
import { FillInConfirmation } from './FillInConfirmation';
import { FillInConsumption } from './FillInConsumption';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import moment from 'moment';
import styles from './index.module.scss';

const DailyData = () => {
    const { state } = useContext(Context);
    const [date, setDate] = useState(moment());

    const [showConfirm, setShowComfirm] = useState(false);

    return (
        <Container className={`mt-3 ${styles.containerHeight}`}>
            {showConfirm ? (
                <FillInConfirmation />
            ) : (
                <div>
                    <div>
                        <Form.Group controlId="formDate">
                            <Form.Label className={styles.selectDate}>
                                HOUSE {state.user.hno ? state.user.hno : ''}
                            </Form.Label>
                            <Form.Control
                                type="date"
                                defaultValue={date.format('YYYY-MM-DD')}
                                onChange={(e) => {
                                    console.log(typeof e.target.value);
                                    setDate(
                                        moment(e.target.value, 'YYYY-MM-DD'),
                                    );
                                }}
                            />
                        </Form.Group>
                    </div>

                    <div>
                        <Tabs
                            defaultActiveKey="dailyData"
                            id="uncontrolled-tab-example"
                        >
                            <Tab eventKey="dailyData" title="Daily Data">
                                <FillInConsumption date={date} />
                            </Tab>
                            <Tab eventKey="chickenData" title="Chicken Data">
                                <FillInChicken date={date} />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default DailyData;
