import React, { useContext, useEffect, useState } from 'react';

import AddBtn from '../../static/icon/addBtn.svg';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import DeleteBtn from '../../static/icon/deleteBtn.svg';
import DeleteTab from '../../static/icon/delete.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import MyVerticallyCenteredModal from '../../components/ConfirmationMsg/index.js';
import NextArrow from '../../static/icon/next_manage.svg';
import axios from 'axios';
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
    const { dispatch } = useContext(Context);
    const username = data.username;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const hno = data.hno;
    const role = data.role;
    const lineID = data.lineID;
    const imageUrl = data.imageUrl;
    const history = useHistory();

    const showWorkerData = () => {
        dispatch({
            type: 'update-workerAccountInfo',
            payload: {
                uid: data.uid,
                username,
                firstName,
                lastName,
                hno,
                role,
                lineID,
                imageUrl: data.imageUrl,
            },
        });

        history.push('/show-worker-data');
    };

    const showDeleteBtn = () => {
        return <img src={DeleteBtn} alt="delete_btn" />;
    };

    return (
        <div className={`${styles.bgCard} p-3 mb-3 mx-auto`}>
            <div className="d-flex">
                <img
                    src={imageUrl}
                    alt="profile_pic"
                    className={`mb-2 ${styles.imgProfile}`}
                />

                <div className="pl-4">
                    <div className={styles.textFullName}>
                        {firstName} {lastName}
                    </div>

                    <p className={styles.textUsername}>{username}</p>
                    <div>
                        <div
                            className={`${styles.bgHouse} d-flex p-1 justify-content-center`}
                        >
                            <div className={`${styles.textHouse}`}>
                                HOUSE {hno}
                            </div>
                        </div>
                    </div>
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
                        onClick={() => showWorkerData()}
                    />
                </div>
            </div>
        </div>
    );
};

const ManageAccount = () => {
    const [count, setCount] = useState(0);
    const history = useHistory();
    const addNewWorker = () => {
        history.push('/create-account');
    };
    const { state, dispatch } = useContext(Context);

    useEffect(() => {
        const getWorkerAccountInfo = async () => {
            const res = await axios.get(`/users?hno=${state.user.hno}`);
            console.log(res.data);
            dispatch({
                type: 'update-workerAccount',
                payload: res.data,
            });
        };
        if (state.user && state.user.hno) {
            getWorkerAccountInfo();
        }
        console.log(count);
    }, [state.user, count]);

    const [toDelete, setToDelete] = useState();

    const deleteCard = async (uid) => {
        axios.delete(`/users?uid=${uid}`).then(setCount(count + 1));
    };

    return (
        <div>
            <MyVerticallyCenteredModal
                show={!!toDelete}
                title="This worker account will be deleted from the database forever,
                are you sure?"
                actionText="Delete"
                onHide={() => setToDelete()}
                onAction={() => {
                    deleteCard(toDelete);
                    setToDelete();
                }}
            />
            <Container className={`${styles.bgLightBlue} vh-100 pt-3`}>
                {state.workerAccount &&
                    state.workerAccount.map((item) => (
                        <CustomCard
                            key={item.uid}
                            data={item}
                            onDelete={() => setToDelete(item.uid)}
                        />
                    ))}
                <img
                    className="d-block ml-auto mt-5"
                    src={AddBtn}
                    alt="add_btn"
                    onClick={() => {
                        addNewWorker();
                    }}
                />
            </Container>
        </div>
    );
};

export default ManageAccount;
