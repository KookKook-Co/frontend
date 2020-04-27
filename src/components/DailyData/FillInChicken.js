import * as yup from 'yup';

import React, { useContext, useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import { Context } from '../../Store';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import MySuccessCenteredModal from '../SuccessMsg/index.js';
import axios from 'axios';
import styles from './index.module.scss';

export const FillInChicken = ({ date, currentTag }) => {
    const { state, dispatch } = useContext(Context);
    const [send, setSend] = useState();
    const [deadChicken, setDeadChicken] = useState();
    const [zLegChicken, setZLegChicken] = useState();
    const [dwarfChicken, setDwarfChicken] = useState();
    const [sickChicken, setSickChicken] = useState();
    const [period, setPeriod] = useState('MORNING');
    const [showFormik, setShowFormik] = useState(false);

    const schema = yup.object({
        deadChicken: yup
            .number()
            .positive('This field must be positive.')
            .required('This field is required.'),
        zLegChicken: yup
            .number()
            .positive('This field must be positive.')
            .required('This field is required.'),
        dwarfChicken: yup
            .number()
            .positive('This field must be positive.')
            .required('This field is required.'),
        sickChicken: yup
            .number()
            .positive('This field must be positive.')
            .required('This field is required.'),
        period: yup.string().required('This field is required.'),
    });

    useEffect(() => {
        if (currentTag === 2) {
            setShowFormik(false);
            const getChickenFlock = async () => {
                const res = await axios.get(
                    `/event/unqualifiedchicken?hno=${
                        state.user && state.user.hno ? state.user.hno : 1
                    }&date=${date.format('DD-MM-YYYY')}&period=${period}`,
                );

                if (res.data === '') {
                    setDeadChicken();
                    setZLegChicken();
                    setDwarfChicken();
                    setSickChicken();
                }

                if (res.data !== '' && res.data !== null) {
                    setDeadChicken(res.data.amountDead);
                    setZLegChicken(res.data.amountZleg);
                    setDwarfChicken(res.data.amountDwaft);
                    setSickChicken(res.data.amountSick);
                }
                setShowFormik(true);
            };
            getChickenFlock();
        }
    }, [date, period, currentTag]);

    const sendUnqChicken = async () => {
        dispatch({
            type: 'update-unqChicken',
            payload: {
                deadChicken,
                zLegChicken,
                dwarfChicken,
                sickChicken,
            },
        });

        const unqualifiedChickenInfo = {
            amountDead: parseFloat(deadChicken),
            amountZleg: parseFloat(zLegChicken),
            amountDwaft: parseFloat(dwarfChicken),
            amountSick: parseFloat(sickChicken),
        };

        const data = {
            hno: state.user && state.user.hno ? state.user.hno : 1,
            date: date.format('DD-MM-YYYY'),
            period,
            unqualifiedChickenInfo,
        };

        console.log(data);

        axios
            .post('/event/unqualifiedchicken', data)
            .then((res) => {
                console.log(res);
                setSend('Sent!');
            })
            .catch((err) => console.log(err.response));
    };

    const PeriodTab = ({ period, isSelect }) => {
        return (
            <div>
                <li className="page-item hover">
                    <div
                        className={`page-link ${styles.textTime} ${
                            isSelect ? `${styles.bgSelect}` : ''
                        }`}
                        onClick={(e) => {
                            setPeriod(period);
                        }}
                    >
                        {period}
                    </div>
                </li>
            </div>
        );
    };

    return (
        <div>
            <MySuccessCenteredModal
                show={!!send}
                title="Your data has been recorded successfully."
                onHide={() => setSend()}
            />
            <h4 className={styles.textTitle}>UNQUALIFIED CHICKEN</h4>
            <div className={`mb-2 ${styles.borderLine}`}></div>
            {showFormik && (
                <Formik
                    validationSchema={schema}
                    onSubmit={() => {
                        sendUnqChicken();
                    }}
                    initialValues={{
                        deadChicken: deadChicken,
                        zLegChicken: zLegChicken,
                        dwarfChicken: dwarfChicken,
                        sickChicken: sickChicken,
                        period: period,
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        errors,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <div className={`${styles.textSubtitle}`}>
                                Select Time
                            </div>

                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    {['MORNING', 'EVENING'].map(
                                        (item, index) => (
                                            <PeriodTab
                                                key={index}
                                                period={item}
                                                isSelect={item === period}
                                            />
                                        ),
                                    )}
                                </ul>
                            </nav>

                            <Form.Group controlId="formDeadChicken">
                                <Form.Label className={styles.textSubtitle}>
                                    {' '}
                                    Number of Dead Chickens{' '}
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="deadChicken"
                                    onChange={(e) => {
                                        handleChange(e);
                                        setDeadChicken(e.target.value);
                                    }}
                                    isInvalid={
                                        touched.deadChicken &&
                                        !!errors.deadChicken
                                    }
                                    value={values.deadChicken}
                                    placeholder="Input"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.deadChicken}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formZLegChicken">
                                <Form.Label className={styles.textSubtitle}>
                                    {' '}
                                    Number of Z-Leg Chickens{' '}
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="zLegChicken"
                                    onChange={(e) => {
                                        handleChange(e);
                                        setZLegChicken(e.target.value);
                                    }}
                                    isInvalid={
                                        touched.zLegChicken &&
                                        !!errors.zLegChicken
                                    }
                                    value={values.zLegChicken}
                                    placeholder="Input"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.zLegChicken}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formDwarfChicken">
                                <Form.Label className={styles.textSubtitle}>
                                    {' '}
                                    Number of Dwarf Chickens{' '}
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="dwarfChicken"
                                    onChange={(e) => {
                                        handleChange(e);
                                        setDwarfChicken(e.target.value);
                                    }}
                                    isInvalid={
                                        touched.dwarfChicken &&
                                        !!errors.dwarfChicken
                                    }
                                    value={values.dwarfChicken}
                                    placeholder="Input"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.dwarfChicken}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formSickChicken">
                                <Form.Label className={styles.textSubtitle}>
                                    {' '}
                                    Number of Sick Chickens{' '}
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="sickChicken"
                                    onChange={(e) => {
                                        handleChange(e);
                                        setSickChicken(e.target.value);
                                    }}
                                    isInvalid={
                                        touched.sickChicken &&
                                        !!errors.sickChicken
                                    }
                                    value={values.sickChicken}
                                    placeholder="Input"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.sickChicken}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button
                                className="d-flex mx-auto w-100 mb-3 justify-content-center"
                                type="submit"
                            >
                                <div>Send</div>
                            </Button>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
};
