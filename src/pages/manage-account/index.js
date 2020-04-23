import React, { useContext, useEffect, useState } from 'react';

import AddBtn from '../../static/icon/addBtn.svg';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import DeleteBtn from '../../static/icon/deleteBtn.svg';
import DeleteTab from '../../static/icon/delete.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import MyVerticallyCenteredModal from '../../components/ConfirmationMsg/index.js';
import NextArrow from '../../static/icon/next_manage.svg';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import moment from 'moment';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href="/"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        <img src={DeleteTab} alt="delete_tab" />
    </a>
));

const CustomCard = ({ data, onDelete }) => {
    const { state, dispatch } = useContext(Context);
    const chickenInDate = moment(data.dateIn).format('DD MMM YYYY');
    const chickenOutDate = moment(data.dateOut).format('DD MMM YYYY');
    const numberOfChickens = data.amountIn;
    const gender = data.gender;
    const chickenType = data.type;
    const generation = data.generation;
    const history = useHistory();

    const addNewGen = () => {
        history.push('/manage-flock');
    };

    const showHouseData = () => {
        dispatch({
            type: 'update-userAccount',
            payload: {
                chickenInDate,
                chickenOutDate,
                numberOfChickens,
                gender,
                chickenType,
                generation,
            },
        });

        history.push('/show-user-data');
    };

    const showDeleteBtn = () => {
        return <img src={DeleteBtn} alt="delete_btn" />;
    };

    return (
        <div className={`${styles.bgCard} p-3 mb-3 mx-auto`}>
            <div className="d-flex">
                <div class="d-flex">
                    <img
                        src={BarnIcon}
                        alt="barn_icon"
                        className={styles.iconBarn}
                    />
                    <p className={styles.textBarn}>{state.selectedHno}</p>
                </div>

                <div className="pl-4">
                    <div className="d-flex align-items-center">
                        <div className={styles.textFlockGen}>
                            {data.generation}
                        </div>
                        <div
                            className={`${styles.containerGender} px-2 ml-3 d-flex justify-content-center`}
                        >
                            <p
                                className={`align-self-center ${styles.textContainer}`}
                            >
                                {data.gender}
                            </p>
                        </div>
                    </div>
                    <Row className="mb-1">
                        <Col xs={6}>
                            <div className="d-flex align-items-center">
                                <img src={ChickenIcon} alt="chicken_icon" />
                                <p className={`${styles.textNumber} ml-2`}>
                                    {data.amountIn}
                                </p>
                            </div>
                        </Col>
                        <Col xs={6} className="pl-0">
                            <div className="d-flex align-items-center">
                                <img src={HourglassIcon} alt="hourglass_icon" />
                                <p className={`${styles.textNumber} ml-2`}>
                                    4 Days
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <div className="d-flex align-items-center">
                                <img src={InIcon} alt="in_icon" />
                                <p className={`${styles.textDetail} ml-2`}>
                                    {moment(data.dateIn).format('DD MMM YYYY')}
                                </p>
                            </div>
                        </Col>
                        <Col xs={6} className="pl-0">
                            <div className="d-flex align-items-center">
                                <img src={OutIcon} alt="out_icon" />
                                <p className={`${styles.textDetail} ml-2`}>
                                    {moment(data.dateOut).format('DD MMM YYYY')}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="ml-auto d-flex flex-column">
                    <div>
                        <Dropdown alignRight>
                            <Dropdown.Toggle
                                as={CustomToggle}
                                id="dropdown-custom-components"
                            ></Dropdown.Toggle>

                            <Dropdown.Menu className={styles.dropdownMenu}>
                                <Dropdown.Item className={styles.dropdownItem}>
                                    <div onClick={() => onDelete()}>
                                        {showDeleteBtn()}
                                    </div>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <img
                        className="mt-auto"
                        src={NextArrow}
                        alt="next_arrow"
                        onClick={() => showHouseData()}
                    />
                </div>
            </div>
        </div>
    );
};

const ManageAccount = () => {
    const { state, dispatch } = useContext(Context);
    useEffect(() => {
        const params = {
            hno: state.selectedHno,
        };
        const getChickenFlockInfo = async () => {
            const res = await axios.get(`/event/chickenflocks`, {
                params,
            });
            console.log(res.data);
            dispatch({
                type: 'update-chickenFlock',
                payload: res.data,
            });
        };
        getChickenFlockInfo();
    }, []);

    const [toDelete, setToDelete] = useState();
    const [data, setData] = useState(state.chickenFlock);
    console.log(state.chickenFlock);
    console.log(data);
    // const [data, setData] = useState([
    //     {
    //         id: 1,
    //         generation: '2020/1',
    //         date: '15 March 2020',
    //         age: 4,
    //         gender: 'Male',
    //         type: 'chicken type',
    //     },
    //     {
    //         id: 2,
    //         generation: '2020/1',
    //         date: '15 March 2020',
    //         age: 4,
    //         gender: 'Male',
    //         type: 'chicken type',
    //     },
    //
    // ]);

    const createCard = (newItem) => {
        setData([...data, newItem]);
    };

    const deleteCard = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    return (
        <div>
            <MyVerticallyCenteredModal
                show={!!toDelete}
                title="The flock 2020/1 will be deleted from the database forever,
                are you sure?"
                actionText="Delete"
                onHide={() => setToDelete()}
                onAction={() => {
                    deleteCard(toDelete);
                    setToDelete();
                }}
            />
            <Container className={`${styles.bgLightBlue} vh-100 pt-3`}>
                {state.chickenFlock.map((item) => (
                    <CustomCard
                        key={data.indexOf(item)}
                        data={item}
                        onDelete={() => setToDelete(data.indexOf(item))}
                    />
                ))}
                <img
                    className="d-block ml-auto mt-5"
                    src={AddBtn}
                    alt="add_btn"
                    onClick={() => {
                        addNewGen();
                    }}
                />
            </Container>
        </div>
    );
};

export default ManageAccount;
