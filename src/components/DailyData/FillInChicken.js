import React, { useContext, useState } from 'react';

import { Context } from '../../Store';
import Form from 'react-bootstrap/Form';
import sendBtn from '../../static/icon/sendBtn.svg';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';
import viewHistoryBtn from '../../static/icon/viewHistoryBtn.svg';

export const FillInChicken = (date) => {
    const { state, dispatch } = useContext(Context);
    const history = useHistory();
    const [deadChicken, setDeadChicken] = useState();
    const [zLegChicken, setZLegChicken] = useState();
    const [dwarfChicken, setDwarfChicken] = useState();
    const [sickChicken, setSickChicken] = useState();
    const [period, setPeriod] = useState();

    return (
        <div>
            <h4>UNQUALIFIED CHICKEN</h4>

            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <div
                            className="page-link"
                            onClick={() => setPeriod('MORNING')}
                        >
                            Morning
                        </div>
                    </li>
                    <li className="page-item">
                        <div
                            className="page-link"
                            onClick={() => setPeriod('EVENING')}
                        >
                            Evening
                        </div>
                    </li>
                </ul>
            </nav>

            <Form.Group controlId="formDeadChicken">
                <Form.Label className={styles.numDeadChicken}>
                    {' '}
                    Number of Dead Chickens{' '}
                </Form.Label>
                <Form.Control
                    type="text"
                    onChange={(e) => setDeadChicken(e.target.value)}
                    value={deadChicken}
                    placeholder="Input"
                />
            </Form.Group>

            <Form.Group controlId="formZLegChicken">
                <Form.Label className={styles.numZLegChicken}>
                    {' '}
                    Number of Z-Leg Chickens{' '}
                </Form.Label>
                <Form.Control
                    type="text"
                    onChange={(e) => setZLegChicken(e.target.value)}
                    value={zLegChicken}
                    placeholder="Input"
                />
            </Form.Group>

            <Form.Group controlId="formDwarfChicken">
                <Form.Label className={styles.numDwarfChicken}>
                    {' '}
                    Number of Dwarf Chickens{' '}
                </Form.Label>
                <Form.Control
                    type="text"
                    onChange={(e) => setDwarfChicken(e.target.value)}
                    value={dwarfChicken}
                    placeholder="Input"
                />
            </Form.Group>

            <Form.Group controlId="formSickChicken">
                <Form.Label className={styles.numSickChicken}>
                    {' '}
                    Number of Sick Chickens{' '}
                </Form.Label>
                <Form.Control
                    type="text"
                    onChange={(e) => setSickChicken(e.target.value)}
                    value={sickChicken}
                    placeholder="Input"
                />
            </Form.Group>
            {/* <div className="d-flex justify-content-around pb-3">
                <img
                    src={viewHistoryBtn}
                    alt="viewHistory_Btn"
                    onClick={() => getReport()}
                />
                <img
                    src={sendBtn}
                    alt="send_Btn"
                    onClick={() => sendDailyData()}
                />
            </div> */}
        </div>
    );
};
