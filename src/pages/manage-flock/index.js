import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import moment from 'moment';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';

const ManageFlock = () => {
    const { state, dispatch } = useContext(Context);
    const history = useHistory();
    const [generation, setGeneration] = useState();
    const [dateIn, setDateIn] = useState(moment());
    const [dateOut, setDateOut] = useState(moment());
    const [house, setHouse] = useState();
    const [amountIn, setAmountIn] = useState();
    const [gender, setGender] = useState();
    const [type, setType] = useState();

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
            hno: parseInt(house),
            chickenFlockInfo,
        };

        await axios.post('/event/dailydata', data);

        history.push('/manage-chicken');
    };
    return (
        <Container className={`${styles.bgLightBlue} pt-4 vh-100`}>
            <Form>
                <Form.Group controlId="formFlockName">
                    <Form.Label className={styles.textFormLabel}>
                        Flock Name
                    </Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setGeneration(e.target.value)}
                        value={generation}
                        placeholder="ex: 2020/1"
                    />
                </Form.Group>

                <Form.Group controlId="formDate">
                    <Form.Label className={styles.textFormLabel}>
                        Chicken In Date
                    </Form.Label>
                    <Form.Control
                        type="date"
                        defaultValue={dateIn.format('YYYY-MM-DD')}
                        onChange={(e) => {
                            setDateIn(moment(e.target.value, 'YYYY-MM-DD'));
                        }}
                    />
                </Form.Group>

                <Form.Group controlId="formDate">
                    <Form.Label className={styles.textFormLabel}>
                        Chicken Out Date
                    </Form.Label>
                    <Form.Control
                        type="date"
                        defaultValue={dateOut.format('YYYY-MM-DD')}
                        onChange={(e) => {
                            setDateOut(moment(e.target.value, 'YYYY-MM-DD'));
                        }}
                    />
                </Form.Group>

                <Form.Group controlId="form.SelectHouse">
                    <Form.Label className={styles.textFormLabel}>
                        House
                    </Form.Label>
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
                    <Form.Control
                        as="select"
                        onSelect={(e) => setHouse(e.target.value)}
                        value={house}
                        required
                    >
                        <option disabled hidden>
                            Select House
                        </option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formAmountOfChickens">
                    <Form.Label className={styles.textFormLabel}>
                        Amount of Chickens
                    </Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setAmountIn(e.target.value)}
                        value={amountIn}
                        placeholder="ex:112"
                    />
                </Form.Group>

                <Form.Group controlId="form.SelectGender">
                    <Form.Label className={styles.textFormLabel}>
                        Gender
                    </Form.Label>
                    <Form.Control
                        as="select"
                        onSelect={(e) => setGender(e.target.value)}
                        value={gender}
                    >
                        <option disabled hidden>
                            Select Gender
                        </option>
                        <option>Male</option>
                        <option>Female</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="form.SelectChickenType">
                    <Form.Label className={styles.textFormLabel}>
                        Chicken Type
                    </Form.Label>
                    <Form.Control
                        as="select"
                        onSelect={(e) => setType(e.target.value)}
                        value={type}
                    >
                        <option disabled hidden>
                            Select Chicken Type
                        </option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                </Form.Group>
            </Form>
            <Button
                className="d-flex mx-auto mt-5 w-100 mb-2 justify-content-center"
                type="button"
                onClick={() => createNewFlock()}
            >
                <div>Add New Flock</div>
            </Button>
        </Container>
    );
};

export default ManageFlock;
