import React, { useState } from 'react';

import AddBtn from '../../static/icon/addBtn.svg';
import BarnIcon from '../../static/icon/yellowBarnIcon.svg';
import ChickenIcon from '../../static/icon/chickenIcon.svg';
import Container from 'react-bootstrap/Container';
import DeleteBtn from '../../static/icon/deleteBtn.svg';
import DeleteTab from '../../static/icon/delete.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import HourglassIcon from '../../static/icon/hourglassIcon.svg';
import InIcon from '../../static/icon/inIcon.svg';
import MyVerticallyCenteredModal from '../../components/ConfirmationMsg/index.js';
import NextArrow from '../../static/icon/next_manage.svg';
import OutIcon from '../../static/icon/outIcon.svg';
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
    // const [deleteTab, setDeleteTab] = useState(false);
    const history = useHistory();
    const manageHouse = () => {
        history.push('/manage-flock');
    };
    const showHouseData = () => {
        history.push('/show-house-data');
    };
    const showDeleteBtn = () => {
        return <img src={DeleteBtn} alt="delete_btn" />;
    };
    return (
        <div className={`${styles.bgCard} p-3 mb-3 mx-auto`}>
            <div class="row" >
                <div class="column" className={styles.columnLeft}>
                    <img src={BarnIcon} alt="barn_icon" />
                </div>
                <div class="column" className={styles.columnMiddleLeft}>
                    <div class="row">
                        <div className={styles.textFlockGen}>{data.generation}</div>
                    </div>
                    <div class="row">
                        <img src={ChickenIcon} alt="chicken_icon" />
                        <p className={`${styles.textDetail} ml-2`}> 112 </p>
                    </div>
                    <div class="row">
                        <img src={InIcon} alt="in_icon" />
                        <p className={`${styles.textDetail} ml-2`}> {data.date} </p>
                    </div>
                </div>
                <div class="column" className={styles.columnMiddleRight}>
                    <div className={`${styles.containerGender} px-2 mr-1`}>
                        <p className={styles.textContainer}>{data.gender}</p>
                    </div>
                    <div class="row">
                        <img src={HourglassIcon} alt="hourglass_icon" />
                        <p className={`${styles.textDetail} ml-2`}> 4 Days </p>
                    </div>
                    <div class="row">
                        <img src={OutIcon} alt="out_icon" />
                        <p className={`${styles.textDetail} ml-2`}> 1 May 2020 </p>
                    </div>
                </div>
                <div class="column d-flex" className={styles.columnRight}>
                    <div>                
                        <Dropdown alignLeft>
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
    const [toDelete, setToDelete] = useState();
    const [data, setData] = useState([
        {
            id: 1,
            generation: '2020/1',
            date: '15 March 2020',
            age: 4,
            gender: 'Male',
            type: 'chicken type',
        },
        {
            id: 2,
            generation: '2020/1',
            date: '15 March 2020',
            age: 4,
            gender: 'Male',
            type: 'chicken type',
        },
        {
            id: 3,
            generation: '2020/1',
            date: '15 March 2020',
            age: 4,
            gender: 'Male',
            type: 'chicken type',
        },
        {
            id: 4,
            generation: '2020/1',
            date: '15 March 2020',
            age: 4,
            gender: 'Male',
            type: 'chicken type',
        },
    ]);

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
                {data.map((item) => (
                    <CustomCard
                        key={item.id}
                        data={item}
                        onDelete={() => setToDelete(item.id)}
                    />
                ))}
                <img
                    className="d-block ml-auto mt-5"
                    src={AddBtn}
                    alt="add_btn"
                    onClick={() => {
                        createCard({
                            id: 4,
                            generation: '2020/1',
                            date: '15 March 2020',
                            age: 4,
                            gender: 'male',
                            type: 'chicken type',
                        });
                    }}
                />
            </Container>
        </div>
    );
};

export default ManageChicken;
