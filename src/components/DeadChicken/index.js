import React, { useContext, useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import axios from 'axios';
import styles from './index.module.scss';
import ImgModal from './deadChickenImgModal';

const DeadChicken = () => {
    const [cameraData, setCameraData] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };

    useEffect(() => {
        axios
            .get(`/event/deadchickenmap?hno=1`)
            .then((res) => {
                // console.log(res);
                setCameraData(res.data);
                console.log(cameraData);
                dispatch({
                    type: 'update-deadChicken-map',
                    payload: res.data,
                });
            })
            .catch((error) => {
                console.log(error);
            }, cameraData);
    }, []);

    const { state, dispatch } = useContext(Context);
    const square = (amountChickenDead, x, y) => {
        return (
            <div
                className={`${styles.square} ${
                    amountChickenDead > 0 ? `${styles.red}` : ''
                }`}
                onClick={() =>
                    amountChickenDead > 0 ? handleClickZone(x, y) : undefined
                }
            >
                {amountChickenDead > 0 && amountChickenDead}
            </div>
        );
    };

    const handleClickZone = (x, y) => {
        dispatch({
            type: 'update-deadChicken-location',
            payload: {
                xPos: x,
                yPos: y,
                Zone: y + chars[x - 1],
                cid: 14 * (y - 1) + (x - 1),
            },
        });
        setShow(true);
        // console.log('++++++++ DEAD MAP ++++++++');
        // console.log(state.deadChickenMap);
        // history.push('/dead-chicken-img');
    };

    const eachrow = (row, index) => {
        return (
            <div className={styles.rowDeadChickenMap}>
                <p
                    className={styles.mapLabel}
                    style={{ marginRight: '0.9rem', width: '0.3rem' }}
                >
                    {index}
                </p>
                {square(row[0], 1, index)}
                <div className={`${styles.square} ${styles.waterLine}`}></div>
                {square(row[1], 2, index)}
                <div className={`${styles.square} ${styles.foodLine}`}></div>
                {square(row[2], 3, index)}
                <div className={`${styles.square} ${styles.waterLine}`}></div>
                {square(row[3], 4, index)}
                <div className={`${styles.square} ${styles.foodLine}`}></div>
                {square(row[4], 5, index)}
                <div className={`${styles.square} ${styles.waterLine}`}></div>
                {square(row[5], 6, index)}
                <div className={`${styles.square} ${styles.foodLine}`}></div>
                {square(row[6], 7, index)}
                <div className={`${styles.square} ${styles.waterLine}`}></div>
                {square(row[7], 8, index)}
                <div className={`${styles.square} ${styles.foodLine}`}></div>
                {square(row[8], 9, index)}
                <div className={`${styles.square} ${styles.waterLine}`}></div>
                {square(row[9], 10, index)}
                <div className={`${styles.square} ${styles.foodLine}`}></div>
                {square(row[10], 11, index)}
                <div className={`${styles.square} ${styles.waterLine}`}></div>
                {square(row[11], 12, index)}
                <div className={`${styles.square} ${styles.foodLine}`}></div>
                {square(row[12], 13, index)}
                <div className={`${styles.square} ${styles.waterLine}`}></div>
                {square(row[13], 14, index)}
            </div>
        );
    };

    const colLabel = (char) => {
        return (
            <div
                className={styles.mapLabel}
                style={{
                    marginBottom: '0.4rem',
                    marginLeft: '0.32rem',
                    width: '5%',
                    float: 'left',
                }}
            >
                {char}
            </div>
        );
    };

    const chars = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
    ];

    // const data = [
    //     {
    //         cid: '001',
    //         xPosCam: 2,
    //         yPosCam: 1,
    //         url:
    //             'https://drive.google.com/file/d/1l6j_WN4BG9hxFgyPkdhWI322W1o6Ei07/view?usp=sharing',
    //         amountDead: 1,
    //     },
    //     {
    //         cid: '002',
    //         xPosCam: 4,
    //         yPosCam: 3,
    //         url:
    //             'https://drive.google.com/file/d/1l6j_WN4BG9hxFgyPkdhWI322W1o6Ei07/view?usp=sharing',
    //         amountDead: 0,
    //     },
    //     {
    //         cid: '003',
    //         xPosCam: 1,
    //         yPosCam: 4,
    //         url:
    //             'https://drive.google.com/file/d/1l6j_WN4BG9hxFgyPkdhWI322W1o6Ei07/view?usp=sharing',
    //         amountDead: 1,
    //     },
    //     {
    //         cid: '004',
    //         xPosCam: 4,
    //         yPosCam: 5,
    //         url:
    //             'https://drive.google.com/file/d/1l6j_WN4BG9hxFgyPkdhWI322W1o6Ei07/view?usp=sharing',
    //         amountDead: 3,
    //     },
    //     {
    //         cid: '005',
    //         xPosCam: 4,
    //         yPosCam: 6,
    //         url:
    //             'https://drive.google.com/file/d/1l6j_WN4BG9hxFgyPkdhWI322W1o6Ei07/view?usp=sharing',
    //         amountDead: 6,
    //     },
    // ];

    const zoneStatus = () => {
        var defaultMap = new Array(24);
        for (var i = 0; i < defaultMap.length; ++i) {
            defaultMap[i] = new Array(14).fill(0);
        }
        cameraData.map(
            (data) =>
                (defaultMap[data.yPosCam - 1][data.xPosCam - 1] =
                    data.amountDead),
        );
        return defaultMap;
    };

    return (
        <Container>
            {show && <ImgModal isShow={show} handleClose={handleClose} />}
            <div className={styles.textLabelCh} style={{ marginTop: '2.5rem' }}>
                <p>Please select on dead chicken location</p>
            </div>
            <div className={styles.map}>
                {chars.map((char) => colLabel(char))}
                {zoneStatus().map((row, index) => eachrow(row, index + 1))}
            </div>
        </Container>
    );
};

export default DeadChicken;
