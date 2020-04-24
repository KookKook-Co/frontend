import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import { Context } from '../../Store';
import { FillInMedicine } from './FillInMedicine';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import addMedicineBtn from '../../static/icon/addCircleBtn.svg';
import axios from 'axios';
import deleteMedicineBtn from '../../static/icon/trashBtn.svg';
import sendBtn from '../../static/icon/sendBtn.svg';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';
import viewHistoryBtn from '../../static/icon/viewHistoryBtn.svg';

const vaccineType = ['NDIB', 'IBD'];
const vitaminType = [
    'Cal-D-Phos',
    'Lovit Phos',
    'Super San',
    'A V Leaf',
    'Lava San',
    'T Mix',
    'Pro 7 Plus',
    'Far C 12',
    'Tilo San',
];

export const FillInConsumption = ({ date }) => {
    const { state, dispatch } = useContext(Context);
    const history = useHistory();
    const [foodIn1, setFoodIn1] = useState(
        (state.dailyData && state.dailyData.foodIn1) || 0,
    );
    const [foodLeft1, setFoodLeft1] = useState(
        (state.dailyData && state.dailyData.foodLeft1) || 0,
    );
    const [foodIn2, setFoodIn2] = useState(
        (state.dailyData && state.dailyData.foodIn2) || 0,
    );
    const [foodLeft2, setFoodLeft2] = useState(
        (state.dailyData && state.dailyData.foodLeft2) || 0,
    );
    const [waterV1, setWaterV1] = useState(
        (state.dailyData && state.dailyData.waterV1) || 0,
    );
    const [waterV2, setWaterV2] = useState(
        (state.dailyData && state.dailyData.waterV2) || 0,
    );

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

    const getReport = () => {
        history.push('/get-report');
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
            hno: state.user.hno,
            date: date.toISOString(),
            dailyInfo,
        };

        await axios.post('/event/dailydata', data);

        // history.push('/FillInConfirmation');
        history.push('/');
    };

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
            <Form className="form">
                <div>
                    <h4>FOOD CONSUMPTION</h4>
                    <Form.Group controlId="formFoodIn1">
                        <Form.Label className={styles.foodIn}>
                            {' '}
                            Amount of Food Put In (Silo1){' '}
                        </Form.Label>
                        <Form.Control
                            type="number"
                            onChange={(e) => setFoodIn1(e.target.value)}
                            value={foodIn1}
                            placeholder="Input"
                        />
                    </Form.Group>

                    <Form.Group controlId="formFoodLeft1">
                        <Form.Label className={styles.foodLeft}>
                            {' '}
                            Amount of Food Left (Silo1){' '}
                        </Form.Label>
                        <Form.Control
                            type="number"
                            onChange={(e) => setFoodLeft1(e.target.value)}
                            value={foodLeft1}
                            placeholder="Input"
                        />
                    </Form.Group>
                    <Form.Group controlId="formFoodIn2">
                        <Form.Label className={styles.foodIn}>
                            {' '}
                            Amount of Food Put In (Silo2){' '}
                        </Form.Label>
                        <Form.Control
                            type="number"
                            onChange={(e) => setFoodIn2(e.target.value)}
                            value={foodIn2}
                            placeholder="Input"
                        />
                    </Form.Group>

                    <Form.Group controlId="formFoodLeft2">
                        <Form.Label className={styles.foodLeft}>
                            {' '}
                            Amount of Food Left (Silo2){' '}
                        </Form.Label>
                        <Form.Control
                            type="number"
                            onChange={(e) => setFoodLeft2(e.target.value)}
                            value={foodLeft2}
                            placeholder="Input"
                        />
                    </Form.Group>
                </div>

                <div>
                    <h4>WATER CONSUMPTION</h4>
                    <Form.Group controlId="formWaterV1">
                        <Form.Label className={styles.waterV1}>
                            {' '}
                            Water Valve 1{' '}
                        </Form.Label>
                        <Form.Control
                            type="number"
                            onChange={(e) => setWaterV1(e.target.value)}
                            value={waterV1}
                            placeholder="Input"
                        />
                    </Form.Group>

                    <Form.Group controlId="formWaterV2">
                        <Form.Label className={styles.waterV2}>
                            {' '}
                            Water Valve 2{' '}
                        </Form.Label>
                        <Form.Control
                            type="number"
                            onChange={(e) => setWaterV2(e.target.value)}
                            value={waterV2}
                            placeholder="Input"
                        />
                    </Form.Group>
                </div>

                <div>
                    <h4>MEDICINE</h4>
                    <Form.Group controlId="formMedicine">
                        <Form.Label className={styles.medicineIn}>
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
                            <Modal show={show} onHide={() => setShow(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Medicine</Modal.Title>
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
                                        Add
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <div>
                            {vaccine
                                .filter((each) => each.isChosen)
                                .map((each, index) => {
                                    return (
                                        <div className="formPop" key={index}>
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
                                                            e.target.value,
                                                            each.medicineType,
                                                        );
                                                    }}
                                                />
                                                <img
                                                    src={deleteMedicineBtn}
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
                                        <div className="formPop" key={index}>
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
                                                            e.target.value,
                                                            each.medicineType,
                                                        );
                                                    }}
                                                />
                                                <img
                                                    src={deleteMedicineBtn}
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
                </div>
            </Form>
            <div className="d-flex justify-content-around pb-3">
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
            </div>
        </div>
    );
};
