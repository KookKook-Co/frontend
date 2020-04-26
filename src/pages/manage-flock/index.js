import * as yup from 'yup';

import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import GoBackCenteredModal from '../../components/GoBackMsg/index.js';
import axios from 'axios';
import moment from 'moment';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';

const ManageFlock = () => {
    const { state, dispatch } = useContext(Context);
    const history = useHistory();
    const [create, setCreate] = useState();
    const [generation, setGeneration] = useState();
    const [dateIn, setDateIn] = useState(moment());
    const [dateOut, setDateOut] = useState(moment());
    const [amountIn, setAmountIn] = useState();
    const [gender, setGender] = useState('');
    const [type, setType] = useState('');

    const schema = yup.object({
        generation: yup.string().required('This field is required.'),
        dateIn: yup.string().required('This field is required.'),
        dateOut: yup.string().required('This field is required.'),
        amountIn: yup.number().required('This field is required.'),
        gender: yup.string().required('This field is required.'),
        type: yup.string().required('This field is required.'),
    });

    const createNewFlock = async () => {
        dispatch({
            type: 'create-flock',
            payload: { generation, dateIn, dateOut, type, amountIn, gender },
        });

        const chickenFlockInfo = {
            dateIn: dateIn.toISOString(),
            dateOut: dateOut.toISOString(),
            generation,
            type,
            amountIn: parseInt(amountIn),
            gender,
        };

        const data = {
            hno: parseInt(state.user.hno),
            chickenFlockInfo,
        };

        await axios
            .post('/event/chickenflocks', data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));

        setCreate('Create!');
    };

    const toManageHouse = () => {
        history.push('/manage-chicken');
    };

    return (
        <Container className={`${styles.bgLightBlue} pt-4 vh-100`}>
            <GoBackCenteredModal
                show={!!create}
                title="The chicken flock has been created."
                actionText="CLOSE"
                onAction={() => {
                    toManageHouse();
                    setCreate();
                }}
            />
            <Formik
                validationSchema={schema}
                onSubmit={() => {
                    createNewFlock();
                }}
                initialValues={{
                    generation: '',
                    dateIn: '',
                    dateOut: '',
                    amountIn: '',
                    gender: '',
                    type: '',
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="formFlockName">
                            <Form.Label className={styles.textFormLabel}>
                                Flock Generation
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="generation"
                                onChange={(e) => {
                                    handleChange(e);
                                    setGeneration(e.target.value);
                                }}
                                isInvalid={
                                    touched.generation && !!errors.generation
                                }
                                value={values.generation}
                                placeholder="ex: 2020/1"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.generation}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formDate">
                            <Form.Label className={styles.textFormLabel}>
                                Chicken In Date
                            </Form.Label>
                            <Form.Control
                                type="date"
                                name="dateIn"
                                isInvalid={touched.dateIn && !!errors.dateIn}
                                value={values.dateIn}
                                onChange={(e) => {
                                    handleChange(e);
                                    setDateIn(
                                        moment(e.target.value, 'YYYY-MM-DD'),
                                    );
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.dateIn}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formDate">
                            <Form.Label className={styles.textFormLabel}>
                                Chicken Out Date
                            </Form.Label>
                            <Form.Control
                                type="date"
                                name="dateOut"
                                isInvalid={touched.dateOut && !!errors.dateOut}
                                value={values.dateOut}
                                onChange={(e) => {
                                    handleChange(e);
                                    setDateOut(
                                        moment(e.target.value, 'YYYY-MM-DD'),
                                    );
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.dateOut}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* <DropdownButton
                        id="dropdown-basic-button"
                        title="Select House"
                    >
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                            Another action
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                            Something else
                        </Dropdown.Item>
                    </DropdownButton> */}

                        <Form.Group controlId="formAmountOfChickens">
                            <Form.Label className={styles.textFormLabel}>
                                Number of Chickens
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="amountIn"
                                onChange={(e) => {
                                    handleChange(e);
                                    setAmountIn(e.target.value);
                                }}
                                isInvalid={
                                    touched.amountIn && !!errors.amountIn
                                }
                                value={values.amountIn}
                                placeholder="ex:112"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.amountIn}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="form.SelectGender">
                            <Form.Label className={styles.textFormLabel}>
                                Gender
                            </Form.Label>
                            <Form.Control
                                as="select"
                                name="gender"
                                onChange={(e) => {
                                    handleChange(e);
                                    setGender(e.target.value);
                                }}
                                isInvalid={touched.gender && !!errors.gender}
                                value={values.gender}
                                defaultValue=""
                            >
                                <option value="" disabled hidden>
                                    Select Gender
                                </option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.gender}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="form.SelectChickenType">
                            <Form.Label className={styles.textFormLabel}>
                                Chicken Type
                            </Form.Label>
                            <Form.Control
                                as="select"
                                name="type"
                                onChange={(e) => {
                                    handleChange(e);
                                    setType(e.target.value);
                                }}
                                isInvalid={touched.type && !!errors.type}
                                value={values.type}
                                defaultValue=""
                            >
                                <option value="" disabled hidden>
                                    Select Chicken Type
                                </option>
                                <option value="ROSS">ROSS</option>
                                <option value="COBB">COBB</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.type}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button
                            className="d-flex mx-auto mt-5 w-100 mb-2 justify-content-center"
                            type="submit"
                        >
                            <div>Add New Flock</div>
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default ManageFlock;
