import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import { FillInMedicine } from './FillInMedicine';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import addMedicineBtn from '../../static/icon/addCircleBtn.svg';
import deleteMedicineBtn from '../../static/icon/trashBtn.svg';
import styles from './index.module.scss';

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

export const FillInConsumption = () => {
    const [foodIn1, setFoodIn1] = useState();
    const [foodLeft1, setFoodLeft1] = useState();
    const [foodIn2, setFoodIn2] = useState();
    const [foodLeft2, setFoodLeft2] = useState();
    const [waterV1, setWaterV1] = useState();
    const [waterV2, setWaterV2] = useState();

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setChosenMedicine(old => {
            const cVac = Object.keys(vaccine)
                .filter(each => vaccine[each])
                .reduce((prev, curr) => {
                    prev[curr] = old[curr] ? old[curr] : 0;
                    return prev;
                }, {});
            const cVit = Object.keys(vitamin)
                .filter(each => vitamin[each])
                .reduce((prev, curr) => {
                    prev[curr] = old[curr] ? old[curr] : 0;
                    return prev;
                }, {});
            return { ...cVac, ...cVit };
        });
    };

    const [vaccine, setVaccine] = useState(
        vaccineType.reduce((prev, curr) => {
            prev[curr] = false;
            return prev;
        }, {}),
    );
    const [vitamin, setVitamin] = useState(
        vitaminType.reduce((prev, curr) => {
            prev[curr] = false;
            return prev;
        }, {}),
    );
    const [chosenMedicine, setChosenMedicine] = useState({});
    const handleConcentrationChange = (value, type) => {
        setChosenMedicine(old => {
            return {
                ...old,
                [type]: value,
            };
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
                            Amount of Food Put In (Silo1) {' '}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            onChange={e => setFoodIn1(e.target.value)}
                            value={foodIn1}
                            placeholder="Input"
                        />
                    </Form.Group>

                    <Form.Group controlId="formFoodLeft1">
                        <Form.Label className={styles.foodLeft}>
                            {' '}
                            Amount of Food Left (Silo1) {' '}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            onChange={e => setFoodLeft1(e.target.value)}
                            value={foodLeft1}
                            placeholder="Input"
                        />
                    </Form.Group>
                    <Form.Group controlId="formFoodIn2">
                        <Form.Label className={styles.foodIn}>
                            {' '}
                            Amount of Food Put In (Silo2) {' '}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            onChange={e => setFoodIn2(e.target.value)}
                            value={foodIn2}
                            placeholder="Input"
                        />
                    </Form.Group>

                    <Form.Group controlId="formFoodLeft2">
                        <Form.Label className={styles.foodLeft}>
                            {' '}
                            Amount of Food Left (Silo2) {' '}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            onChange={e => setFoodLeft2(e.target.value)}
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
                            Water Valve 1 {' '}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            onChange={e => setWaterV1(e.target.value)}
                            value={waterV1}
                            placeholder="Input"
                        />
                    </Form.Group>

                    <Form.Group controlId="formWaterV2">
                        <Form.Label className={styles.waterV2}>
                            {' '}
                            Water Valve 2 {' '}
                        </Form.Label>
                        <Form.Control
                            type="double"
                            onChange={e => setWaterV2(e.target.value)}
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
                            <img src={addMedicineBtn} onClick={handleShow} />
                            <Modal show={show} onHide={handleClose}>
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
                                        onClick={handleClose}
                                    >
                                        Add
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <div>
                            {Object.keys(chosenMedicine).map(eachMedType => {
                                return (
                                    <form
                                        className="formPop"
                                        key={eachMedType}
                                    >
                                        <div>
                                            <label
                                                type="text"
                                                readonly
                                                className="form-control-plaintext" >
                                                {eachMedType}
                                            </label>
                                        </div>
                                        <div className="form-group mx-sm-3 mb-2 d-flex justify-content-between">
                                            <label
                                                for="inputAmountMedicine"
                                                className="sr-only"
                                            >
                                                Amount in ml
                                            </label>
                                            <input
                                                key={eachMedType}
                                                type="number"
                                                className="form-control"
                                                placeholder="Amount in ml"
                                                onChange={e => {
                                                    handleConcentrationChange(
                                                        e.target.value,
                                                        eachMedType,
                                                    );
                                                }}
                                            />
                                            <img
                                                src={deleteMedicineBtn}
                                                onClick={() => true}
                                            />
                                        </div>
                                    </form>
                                );
                            })}
                        </div>
                    </Form.Group>
                </div>
            </Form>
        </div>
    );
};
