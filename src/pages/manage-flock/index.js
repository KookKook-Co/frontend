import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import styles from './index.module.scss';

const ManageFlock = () => {
    // const createNewFlock = () => {
    //     return {
    //         flockName,
    //         chickenInDate,
    //         chickenOutDate,
    //         house,
    //         amountOfChickens,
    //         gender,
    //         chickenType,
    //     };
    // };
    const [flockName, setFlockName] = useState();
    const [chickenInDate, setChickenInDate] = useState();
    const [chickenOutDate, setChickenOutDate] = useState();
    const [house, setHouse] = useState();
    const [amountOfChickens, setAmountOfChickens] = useState();
    const [gender, setGender] = useState();
    const [chickenType, setChickenType] = useState();
    return (
        <Container className={`${styles.bgLightBlue} pt-4 vh-100`}>
            <Form>
                <Form.Group controlId="formFlockName">
                    <Form.Label className={styles.textFormLabel}>
                        Flock Name
                    </Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setFlockName(e.target.value)}
                        value={flockName}
                        placeholder="ex: 2020/1"
                    />
                </Form.Group>

                <Form.Group controlId="formChickenInDate">
                    <Form.Label className={styles.textFormLabel}>
                        Chicken In Date
                    </Form.Label>
                    <Form.Control
                        type="date"
                        onChange={(e) => setChickenInDate(e.target.value)}
                        value={chickenInDate}
                        placeholder="DD/MM/YY"
                    />
                </Form.Group>

                <Form.Group controlId="formChickenOutDate">
                    <Form.Label className={styles.textFormLabel}>
                        Chicken Out Date
                    </Form.Label>
                    <Form.Control
                        type="date"
                        onChange={(e) => setChickenOutDate(e.target.value)}
                        value={chickenOutDate}
                        placeholder="DD/MM/YY"
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
                        custom
                        required
                    >
                        <option disabled selected hidden>
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
                        onChange={(e) => setAmountOfChickens(e.target.value)}
                        value={amountOfChickens}
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
                        custom
                    >
                        <option disabled selected hidden>
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
                        onSelect={(e) => setChickenType(e.target.value)}
                        value={chickenType}
                        custom
                    >
                        <option disabled selected hidden>
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
                // onClick={() => createNewFlock()}
            >
                <div>Add New Flock</div>
            </Button>
        </Container>
    );
};

export default ManageFlock;
