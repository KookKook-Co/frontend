import * as yup from 'yup';

import React, { useContext, useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import { Context } from '../../Store';
import { FillInMedicine } from './FillInMedicine';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import Modal from 'react-bootstrap/Modal';
import MySuccessCenteredModal from '../SuccessMsg/index.js';
import addMedicineBtn from '../../static/icon/addCircleBtn.svg';
import axios from 'axios';
import deleteMedicineBtn from '../../static/icon/trashBtn.svg';
import styles from './index.module.scss';

const vaccineType = ['NDIB', 'IBD'];
const vitaminType = [
    'Cal-D-Phos',
    'Lovit Phos',
    'Super Sin',
    'A V Leaf',
    'Lava San',
    'T Mix',
    'Pro 7 Plus',
    'Far C 12',
    'Tilo San',
];

export const FillInConsumption = ({ date, currentTag }) => {
    const { state, dispatch } = useContext(Context);
    const [send, setSend] = useState();
    const [foodIn1, setFoodIn1] = useState();
    const [foodLeft1, setFoodLeft1] = useState();
    const [foodIn2, setFoodIn2] = useState();
    const [foodLeft2, setFoodLeft2] = useState();
    const [waterV1, setWaterV1] = useState();
    const [waterV2, setWaterV2] = useState();
    const [consumption1, setConsumption1] = useState();
    const [consumption2, setConsumption2] = useState();

    const schema = yup.object({
        foodIn1: yup.number().required('This field is required.'),
        foodIn2: yup.number().required('This field is required.'),
        foodRemain1: yup.number().required('This field is required.'),
        foodRemain2: yup.number().required('This field is required.'),
        waterV1: yup.number().required('This field is required.'),
        waterV2: yup.number().required('This field is required.'),
    });

    useEffect(() => {
        if (currentTag === 1) {
            setShowFormik(false);
            const getDailyData = async () => {
                const res = await axios.get(
                    `/event/dailydata?hno=${
                        state.user && state.user.hno
                    }&date=${date.toLocaleString()}`,
                );

                if (res.data === '') {
                    setFoodIn1();
                    setFoodLeft1();
                    setFoodIn2();
                    setFoodLeft2();
                    setWaterV1();
                    setWaterV2();
                }

                if (
                    res.data !== '' &&
                    res.data !== null &&
                    res.data !== undefined
                ) {
                    const food = res.data.food;
                    const water = res.data.water;
                    const medicine = res.data.medicine;

                    if (
                        food !== undefined &&
                        food !== null &&
                        food.length !== 0
                    ) {
                        const foodSilo1 = food[0];
                        const foodSilo2 = food[1];

                        setFoodIn1(foodSilo1.foodIn);
                        setFoodLeft1(foodSilo1.foodRemain);
                        setConsumption1(
                            foodSilo1.foodIn - foodSilo1.foodRemain,
                        );

                        setFoodIn2(foodSilo2.foodIn);
                        setFoodLeft2(foodSilo2.foodRemain);
                        setConsumption2(
                            foodSilo2.foodIn - foodSilo2.foodRemain,
                        );
                    }

                    if (
                        water !== undefined &&
                        water !== null &&
                        Object.keys(water).length !== 0
                    ) {
                        setWaterV1(water.waterMeter1);
                        setWaterV2(water.waterMeter2);
                    }

                    if (
                        medicine !== undefined &&
                        medicine !== null &&
                        medicine.length !== 0
                    ) {
                        setVaccine(
                            vaccineType.map((each) => {
                                const med = medicine.find(
                                    (item) => item.medicineType === each,
                                );
                                console.log(med);
                                if (med) {
                                    return { ...med, isChosen: true };
                                } else {
                                    return {
                                        medicineType: each,
                                        isChosen: false,
                                        medicineConc: 0,
                                    };
                                }
                            }),
                        );

                        setVitamin(
                            vitaminType.map((each) => {
                                const med = medicine.find(
                                    (item) => item.medicineType === each,
                                );
                                console.log(med);
                                if (med) {
                                    return { ...med, isChosen: true };
                                } else {
                                    return {
                                        medicineType: each,
                                        isChosen: false,
                                        medicineConc: 0,
                                    };
                                }
                            }),
                        );
                    }
                }
                setShowFormik(true);
            };
            getDailyData();
        }
    }, [date, currentTag]);

    const medicineInput = (vac, vit) => {
        return [...vac, ...vit]
            .filter((each) => each.isChosen)
            .map((each) => {
                return {
                    medicineType: each.medicineType,
                    medicineConc: parseFloat(each.medicineConc),
                };
            });
    };

    const sendDailyData = async () => {
        dispatch({
            type: 'update-dailyData',
            payload: {
                foodIn1,
                foodLeft1,
                foodIn2,
                foodLeft2,
                waterV1,
                waterV2,
            },
        });

        const foodInput1 = {
            foodSilo: 1,
            foodIn: parseFloat(foodIn1),
            foodRemain: parseFloat(foodLeft1),
            foodConsumed: parseFloat(foodIn1 - foodLeft1),
        };

        const foodInput2 = {
            foodSilo: 2,
            foodIn: parseFloat(foodIn2),
            foodRemain: parseFloat(foodLeft2),
            foodConsumed: parseFloat(foodIn2 - foodLeft2),
        };

        const waterInput = {
            waterMeter1: parseFloat(waterV1),
            waterMeter2: parseFloat(waterV2),
        };

        const dailyInfo = {
            food: [foodInput1, foodInput2],
            water: waterInput,
            medicine: medicineInput(vaccine, vitamin),
        };

        const data = {
            hno: state.user && state.user.hno,
            date: date.toISOString(),
            dailyInfo,
        };

        console.log(data);

        await axios
            .post('/event/dailydata', data)
            .then((res) => {
                console.log(res);
                setSend('Sent!');
            })
            .catch((err) => console.log(err));
    };

    const [showFormik, setShowFormik] = useState(false);
    const [show, setShow] = useState(false);

    const deleteChosenVaccine = (type) => {
        const index = vaccineType.findIndex((each) => each === type);
        setVaccine((old) => {
            const after = [...old];
            after[index].isChosen = false;
            return after;
        });
    };

    const deleteChosenVitamin = (type) => {
        const index = vitaminType.findIndex((each) => each === type);
        setVitamin((old) => {
            const after = [...old];
            after[index].isChosen = false;
            return after;
        });
    };

    const [vaccine, setVaccine] = useState(
        vaccineType.map((each) => {
            return {
                medicineType: each,
                isChosen: false,
                medicineConc: 0,
            };
        }),
    );
    const [vitamin, setVitamin] = useState(
        vitaminType.map((each) => {
            return {
                medicineType: each,
                isChosen: false,
                medicineConc: 0,
            };
        }),
    );

    const handleVaccineConcentrationChange = (value, type) => {
        const index = vaccineType.findIndex((each) => each === type);
        setVaccine((old) => {
            const after = [...old];
            after[index].medicineConc = value;
            return after;
        });
    };

    const handleVitaminConcentrationChange = (value, type) => {
        const index = vitaminType.findIndex((each) => each === type);
        setVitamin((old) => {
            const after = [...old];
            after[index].medicineConc = value;
            return after;
        });
    };

    return (
        <div>
            <MySuccessCenteredModal
                show={!!send}
                title="Your data has been recorded successfully."
                onHide={() => setSend()}
            />
            {showFormik && (
                <Formik
                    validationSchema={schema}
                    onSubmit={() => {
                        sendDailyData();
                    }}
                    initialValues={{
                        foodIn1: foodIn1,
                        foodIn2: foodIn2,
                        foodRemain1: foodLeft1,
                        foodRemain2: foodLeft2,
                        waterV1: waterV1,
                        waterV2: waterV2,
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        errors,
                    }) => (
                        <Form
                            noValidate
                            onSubmit={handleSubmit}
                            className="form"
                        >
                            <h4 className={styles.textTitle}>
                                FOOD CONSUMPTION
                            </h4>
                            <div className={`mb-2 ${styles.borderLine}`}></div>
                            <Form.Group controlId="formFoodIn1">
                                <Form.Label className={styles.textSubtitle}>
                                    {' '}
                                    Food Input (Silo1){' '}
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="foodIn1"
                                    onChange={(e) => {
                                        handleChange(e);
                                        setFoodIn1(e.target.value);
                                    }}
                                    isInvalid={
                                        touched.foodIn1 && !!errors.foodIn1
                                    }
                                    value={values.foodIn1}
                                    placeholder="Input"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.foodIn1}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formFoodLeft1">
                                <Form.Label className={styles.textSubtitle}>
                                    {' '}
                                    Amount of Food Left (Silo1){' '}
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="foodRemain1"
                                    onChange={(e) => {
                                        handleChange(e);
                                        setFoodLeft1(e.target.value);
                                    }}
                                    isInvalid={
                                        touched.foodRemain1 &&
                                        !!errors.foodRemain1
                                    }
                                    value={values.foodRemain1}
                                    placeholder="Input"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.foodRemain1}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formConsumption1">
                                <Form.Label className={styles.textSubtitle}>
                                    {' '}
                                    Consumption (Silo1){' '}
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    value={consumption1}
                                    placeholder="Input"
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group controlId="formFoodIn2">
                                <Form.Label className={styles.textSubtitle}>
                                    {' '}
                                    Food Input (Silo2){' '}
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="foodIn2"
                                    onChange={(e) => {
                                        handleChange(e);
                                        setFoodIn2(e.target.value);
                                    }}
                                    isInvalid={
                                        touched.foodIn2 && !!errors.foodIn2
                                    }
                                    value={values.foodIn2}
                                    placeholder="Input"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.foodIn2}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formFoodLeft2">
                                <Form.Label className={styles.textSubtitle}>
                                    {' '}
                                    Amount of Food Left (Silo2){' '}
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="foodRemain2"
                                    onChange={(e) => {
                                        handleChange(e);
                                        setFoodLeft2(e.target.value);
                                    }}
                                    isInvalid={
                                        touched.foodRemain2 &&
                                        !!errors.foodRemain2
                                    }
                                    value={values.foodRemain2}
                                    placeholder="Input"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.foodRemain2}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formConsumption2">
                                <Form.Label className={styles.textSubtitle}>
                                    {' '}
                                    Consumption (Silo2){' '}
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    value={consumption2}
                                    placeholder="Input"
                                    disabled
                                />
                            </Form.Group>

                            <h4 className={styles.textTitle}>
                                WATER CONSUMPTION
                            </h4>
                            <div className={`mb-2 ${styles.borderLine}`}></div>
                            <Form.Group controlId="formWaterV1">
                                <Form.Label className={styles.textSubtitle}>
                                    {' '}
                                    Water Valve 1{' '}
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="waterV1"
                                    onChange={(e) => {
                                        handleChange(e);
                                        setWaterV1(e.target.value);
                                    }}
                                    isInvalid={
                                        touched.waterV1 && !!errors.waterV1
                                    }
                                    value={values.waterV1}
                                    placeholder="Input"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.waterV1}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formWaterV2">
                                <Form.Label className={styles.textSubtitle}>
                                    {' '}
                                    Water Valve 2{' '}
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="waterV2"
                                    onChange={(e) => {
                                        handleChange(e);
                                        setWaterV2(e.target.value);
                                    }}
                                    isInvalid={
                                        touched.waterV2 && !!errors.waterV2
                                    }
                                    value={values.waterV2}
                                    placeholder="Input"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.waterV2}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <h4 className={styles.textTitle}>
                                MEDICINE CONSUMPTION
                            </h4>
                            <div className={`mb-2 ${styles.borderLine}`}></div>
                            <Form.Group controlId="formMedicine">
                                <Form.Label className={styles.textSubtitle}>
                                    {' '}
                                    Amount of Medicine Put In{' '}
                                </Form.Label>
                                <div className="d-flex justify-content-between">
                                    Add Medicine
                                    <img
                                        src={addMedicineBtn}
                                        alt="add_btn"
                                        onClick={() => setShow(true)}
                                    />
                                    <Modal
                                        show={show}
                                        onHide={() => setShow(false)}
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title
                                                className={styles.textMedicine}
                                            >
                                                Add Medicine
                                            </Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <FillInMedicine
                                                vaccine={vaccine}
                                                setVaccine={setVaccine}
                                                vitamin={vitamin}
                                                setVitamin={setVitamin}
                                            />
                                        </Modal.Body>

                                        <Modal.Footer>
                                            <Button
                                                variant="addButton"
                                                type="button"
                                                className={styles.btnSubmit}
                                                onClick={() => setShow(false)}
                                            >
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                                <div>
                                    {vaccine
                                        .filter((each) => each.isChosen)
                                        .map((each, index) => {
                                            return (
                                                <div
                                                    className="formPop"
                                                    key={index}
                                                >
                                                    <div>
                                                        <label
                                                            type="text"
                                                            className="form-control-plaintext"
                                                        >
                                                            {each.medicineType}
                                                        </label>
                                                    </div>
                                                    <div className="form-group mx-sm-3 mb-2 d-flex justify-content-between">
                                                        <label className="sr-only">
                                                            Amount in ml
                                                        </label>
                                                        <input
                                                            key={index}
                                                            type="number"
                                                            className="form-control mr-2"
                                                            placeholder="Amount in ml"
                                                            onChange={(e) => {
                                                                handleVaccineConcentrationChange(
                                                                    e.target
                                                                        .value,
                                                                    each.medicineType,
                                                                );
                                                            }}
                                                            value={
                                                                each.medicineConc
                                                            }
                                                        />
                                                        <img
                                                            src={
                                                                deleteMedicineBtn
                                                            }
                                                            onClick={() =>
                                                                deleteChosenVaccine(
                                                                    each.medicineType,
                                                                )
                                                            }
                                                            alt="trash_btn"
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    {vitamin
                                        .filter((each) => each.isChosen)
                                        .map((each, index) => {
                                            return (
                                                <div
                                                    className="formPop"
                                                    key={index}
                                                >
                                                    <div>
                                                        <label
                                                            type="text"
                                                            className="form-control-plaintext"
                                                        >
                                                            {each.medicineType}
                                                        </label>
                                                    </div>
                                                    <div className="form-group mx-sm-3 mb-2 d-flex justify-content-between">
                                                        <label className="sr-only">
                                                            Amount in ml
                                                        </label>
                                                        <input
                                                            key={index}
                                                            type="number"
                                                            className="form-control mr-2"
                                                            placeholder="Amount in ml"
                                                            onChange={(e) => {
                                                                handleVitaminConcentrationChange(
                                                                    e.target
                                                                        .value,
                                                                    each.medicineType,
                                                                );
                                                            }}
                                                            value={
                                                                each.medicineConc
                                                            }
                                                        />
                                                        <img
                                                            src={
                                                                deleteMedicineBtn
                                                            }
                                                            onClick={() =>
                                                                deleteChosenVitamin(
                                                                    each.medicineType,
                                                                )
                                                            }
                                                            alt="trash_btn"
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </Form.Group>
                            <Button
                                className="d-flex mx-auto w-100 justify-content-center mb-3"
                                type="submit"
                            >
                                <div>Send</div>
                            </Button>

                            {/* <div className="d-flex justify-content-around pb-3">
                            <img
                                src={viewHistoryBtn}
                                alt="viewHistory_Btn"
                                onClick={() => getReport()}
                            />
                        </div> */}
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
};
