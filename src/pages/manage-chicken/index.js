import React, { useContext, useEffect, useState } from 'react';

import AddBtn from '../../static/icon/addBtn.svg';
import BarnIcon from '../../static/icon/yellowBarnIcon.svg';
import ChickenIcon from '../../static/icon/chickenIcon.svg';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import DeleteBtn from '../../static/icon/deleteBtn.svg';
import DeleteTab from '../../static/icon/delete.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import HourglassIcon from '../../static/icon/hourglassIcon.svg';
import InIcon from '../../static/icon/inIcon.svg';
import MyVerticallyCenteredModal from '../../components/ConfirmationMsg/index.js';
import NextArrow from '../../static/icon/next_manage.svg';
import OutIcon from '../../static/icon/outIcon.svg';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import moment from 'moment-timezone';
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
    const history = useHistory();
    const { state, dispatch } = useContext(Context);
    const chickenInDate = moment(data.dateIn)
        .tz('Asia/Bangkok')
        .format('DD MMM YYYY');
    const chickenOutDate = moment(data.dateOut)
        .tz('Asia/Bangkok')
        .format('DD MMM YYYY');
    const numberOfChickens = data.amountIn;
    const gender = data.gender;
    const chickenType = data.type;
    const generation = data.generation;

    const showHouseData = () => {
        dispatch({
            type: 'update-chickenFlockInfo',
            payload: {
                chickenInDate,
                chickenOutDate,
                numberOfChickens,
                gender,
                chickenType,
                generation,
            },
        });

        history.push('/show-house-data');
    };

    const showDeleteBtn = () => {
        return <img src={DeleteBtn} alt="delete_btn" />;
    };

    return (
        <div className={`${styles.bgCard} p-3 mb-3 mx-auto`}>
            <div className="d-flex">
                <div className="d-flex">
                    <img
                        src={BarnIcon}
                        alt="barn_icon"
                        className={styles.iconBarn}
                    />
                    <p className={styles.textBarn}>{state.user.hno}</p>
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
                                    {moment()
                                        .tz('Asia/Bangkok')
                                        .diff(
                                            moment(data.dateIn).tz(
                                                'Asia/Bangkok',
                                            ),
                                            'days',
                                        )}{' '}
                                    days
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <div className="d-flex align-items-center">
                                <img src={InIcon} alt="in_icon" />
                                <p className={`${styles.textDetail} ml-2`}>
                                    {moment(data.dateIn)
                                        .tz('Asia/Bangkok')
                                        .format('DD MMM YYYY')}
                                </p>
                            </div>
                        </Col>
                        <Col xs={6} className="pl-0">
                            <div className="d-flex align-items-center">
                                <img src={OutIcon} alt="out_icon" />
                                <p className={`${styles.textDetail} ml-2`}>
                                    {moment(data.dateOut)
                                        .tz('Asia/Bangkok')
                                        .format('DD MMM YYYY')}
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

                            <Dropdown.Menu className={`dropdownContent`}>
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

const ManageChicken = () => {
    const [count, setCount] = useState(0);
    const history = useHistory();
    const addNewGen = () => {
        history.push('/manage-flock');
    };
    const { state, dispatch } = useContext(Context);
    useEffect(() => {
        const getChickenFlockInfo = async () => {
            const res = await axios.get(
                `/event/chickenflocks?hno=${state.user.hno}`,
            );
            dispatch({
                type: 'update-chickenFlock',
                payload: res.data,
            });
        };
        if (state.user && state.user.hno) {
            getChickenFlockInfo();
        }
    }, [state.user, count]);

    const [toDelete, setToDelete] = useState();

    const deleteCard = async (generation) => {
        axios
            .delete(
                `/event/chickenflocks?hno=${
                    state.user && state.user.hno
                }&generation=${generation}`,
            )
            .then(setCount(count + 1));
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
                {state.chickenFlock &&
                    state.chickenFlock.map((item) => (
                        <CustomCard
                            key={state.chickenFlock.indexOf(item)}
                            data={item}
                            onDelete={() => setToDelete(item.generation)}
                        />
                    ))}
                <img
                    className="d-block ml-auto mt-5"
                    src={AddBtn}
                    alt="add_btn"
                    onClick={() => addNewGen()}
                />
            </Container>
        </div>
    );
};

export default ManageChicken;
