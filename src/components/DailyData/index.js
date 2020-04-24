import React, { useContext, useState } from 'react';

import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import { FillInChicken } from './FillInChicken';
import { FillInConfirmation } from './FillInConfirmation';
import { FillInConsumption } from './FillInConsumption';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import moment from 'moment';
import styles from './index.module.scss';

const DailyData = () => {
    const { state, dispatch } = useContext(Context);
    const [date, setDate] = useState(moment());

    const [showConfirm, setShowComfirm] = useState(false);

    // const getDailyData = async (event) => {
    //     setDate(moment(event, 'YYYY-MM-DD'));
    //     const urlDate = moment(event, 'YYYY-MM-DD');
    //     const res = await axios.get(
    //         `/event/dailydata?hno=${state.user.hno}&date=${urlDate}`,
    //     );
    //     const food = res.data.food;
    //     const water = res.data.water;
    //     const medicine = res.data.medicine;

    //     const foodSilo1 = food[0];
    //     const foodSilo2 = food[1];

    //     const foodIn1 = foodSilo1.foodIn;
    //     const foodLeft1 = foodSilo1.foodRemain;

    //     const foodIn2 = foodSilo2.foodIn;
    //     const foodLeft2 = foodSilo2.foodRemain;

    //     const waterV1 = water.waterMeter1;
    //     const waterV2 = water.waterMeter2;

    //     dispatch({
    //         type: 'update-dailyData',
    //         payload: {
    //             foodIn1,
    //             foodLeft1,
    //             foodIn2,
    //             foodLeft2,
    //             waterV1,
    //             waterV2,
    //             medicine,
    //         },
    //     });
    // };

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
                                // onChange={(e) => {
                                //     getDailyData(e.target.value);
                                // }}
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
