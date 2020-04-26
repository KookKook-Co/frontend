import React, { useContext, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import { FillInChicken } from './FillInChicken';
import { FillInConsumption } from './FillInConsumption';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import moment from 'moment';
import styles from './index.module.scss';

const DailyData = () => {
    const { state } = useContext(Context);
    const [date, setDate] = useState(moment());
    const [currentTag, setCurrentTag] = useState(1);

    return (
        <Container className={`mt-3 ${styles.containerHeight}`}>
            <div>
                <div>
                    <Form.Group controlId="formDate">
                        <Form.Label className={styles.textHouse}>
                            HOUSE{' '}
                            {state.user && state.user.hno ? state.user.hno : ''}
                        </Form.Label>
                        <Form.Control
                            type="date"
                            defaultValue={date.format('YYYY-MM-DD')}
                            onChange={(e) => {
                                setDate(moment(e.target.value, 'YYYY-MM-DD'));
                            }}
                        />
                    </Form.Group>
                </div>

                <div>
                    <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey="first"
                    >
                        <Row>
                            <Col sm={3}>
                                <Nav variant="pills">
                                    <Nav.Item>
                                        <Nav.Link
                                            eventKey="first"
                                            className={styles.textTabs}
                                            onClick={() => {
                                                setCurrentTag(1);
                                            }}
                                        >
                                            Daily Data
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link
                                            eventKey="second"
                                            className={styles.textTabs}
                                            onClick={() => {
                                                setCurrentTag(2);
                                            }}
                                        >
                                            Chicken
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <FillInConsumption
                                            date={date}
                                            currentTag={currentTag}
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <FillInChicken
                                            date={date}
                                            currentTag={currentTag}
                                        />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </div>
        </Container>
    );
};

export default DailyData;
