import React, { useContext, useState } from 'react';

import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import ExportBtn from '../../static/icon/exportBtn.svg';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import styles from './index.module.scss';

const GetReport = () => {
    const { state } = useContext(Context);

    const sendReportType = {
        ENVIRONMENT: 'Environmental Data Report',
        FOOD: 'Food Consumption Report',
        WATER: 'Water Consumption Report',
        MEDICINE: 'Medicine Consumption Report',
        CHICKEN: 'Dead Chicken Report',
    };

    const [reports, setReports] = useState(
        Object.keys(sendReportType).map((each) => {
            return {
                type: each,
                value: false,
            };
        }),
    );

    const [email, setEmail] = useState();

    const getReport = async () => {
        const data = {
            hno: state.user.hno,
            generation: state.chickenFlockInfo.generation,
            email,
            reports: reports
                .filter((each) => each.value)
                .map((each) => each.type),
        };
        const res = await axios.post('/report', data);
    };

    return (
        <Container className={`${styles.bgLightBlue} pt-4 vh-100`}>
            <div className="mb-3">
                <div className="mb-3">
                    <p className={`${styles.textGen} mb-2 m-0`}>
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
                <h6 className={styles.textReport}>Report</h6>
                {reports.map((each, index) => {
                    return (
                        <div
                            key={index}
                            className="form-check d-flex align-items-center"
                        >
                            <input
                                className="form-check-input-report"
                                type="checkbox"
                                checked={each.value}
                                onChange={() =>
                                    setReports((old) => {
                                        const after = [...old];
                                        after[index].value = !after[index]
                                            .value;
                                        return after;
                                    })
                                }
                            />
                            <label
                                className={`ml-2 mb-0 ${styles.textReportInfo}`}
                            >
                                {sendReportType[each.type]}
                            </label>
                        </div>
                    );
                })}
            </div>

            <Form.Group controlId="formGetReport" className="pb-2">
                <Form.Label className={styles.textSendTo}> Send to </Form.Label>
                <Form.Control
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="youremail@gmail.com"
                />
            </Form.Group>
            <div className="d-flex justify-content-center">
                <img
                    src={ExportBtn}
                    alt="export_btn"
                    onClick={() => getReport()}
                />
            </div>
        </Container>
    );
};
export default GetReport;
