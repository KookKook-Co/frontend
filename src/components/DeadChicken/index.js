import Container from 'react-bootstrap/Container';
import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const DeadChicken = () => {
    const [cameraData, setCameraData] = useState([]);
    let history = useHistory();

    useEffect(() => {
        axios
            .get(`/event/deadchickenmap?hno=1`)
            .then((res) => {
                // console.log(res);
                setCameraData(res.data);
                console.log(cameraData);
            })
            .catch((error) => {
                console.log(error);
            }, cameraData);
    }, []);

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
        const selData = data.filter(
            (data) => data.xPosCam === x && data.yPosCam === y,
        );
        console.log('Zone : ' + selData.yPosCam + chars[selData.xPosCam]);

        history.push({
            pathname: '/dead-chicken-img',
            state: {
                imgUrl: selData.url,
                zone: selData.yPosCam + chars[selData.xPosCam],
            },
        });
    };

    const eachrow = (row, num) => {
        return (
            <div className={styles.rowDeadChickenMap}>
                <p
                    className={styles.mapLabel}
                    style={{ marginRight: '0.9rem', width: '0.3rem' }}
                >
                    {num}
                </p>
                {square(row[0], 1, num)}
                <div className={`${styles.square} ${styles.waterLine}`}></div>
                {square(row[1], 2, num)}
                <div className={`${styles.square} ${styles.foodLine}`}></div>
                {square(row[2], 3, num)}
                <div className={`${styles.square} ${styles.waterLine}`}></div>
                {square(row[3], 4, num)}
                <div className={`${styles.square} ${styles.foodLine}`}></div>
                {square(row[4], 5, num)}
                <div className={`${styles.square} ${styles.waterLine}`}></div>
                {square(row[5], 6, num)}
                <div className={`${styles.square} ${styles.foodLine}`}></div>
                {square(row[6], 7, num)}
                <div className={`${styles.square} ${styles.waterLine}`}></div>
                {square(row[7], 8, num)}
                <div className={`${styles.square} ${styles.foodLine}`}></div>
                {square(row[8], 9, num)}
                <div className={`${styles.square} ${styles.waterLine}`}></div>
                {square(row[9], 10, num)}
                <div className={`${styles.square} ${styles.foodLine}`}></div>
                {square(row[10], 11, num)}
                <div className={`${styles.square} ${styles.waterLine}`}></div>
                {square(row[11], 12, num)}
                <div className={`${styles.square} ${styles.foodLine}`}></div>
                {square(row[12], 13, num)}
                <div className={`${styles.square} ${styles.waterLine}`}></div>
                {square(row[13], 14, num)}
            </div>
        );
    };

    const colLabel = (char) => {
        return (
            <div
                className={styles.mapLabel}
                style={{
                    marginBottom: '0.4rem',
                    marginLeft: '0.35rem',
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

    const data = [
        {
            cid: '001',
            xPosCam: 2,
            yPosCam: 1,
            url:
                'https://drive.google.com/file/d/1l6j_WN4BG9hxFgyPkdhWI322W1o6Ei07/view?usp=sharing',
            amountDead: 1,
        },
        {
            cid: '002',
            xPosCam: 4,
            yPosCam: 3,
            url:
                'https://drive.google.com/file/d/1l6j_WN4BG9hxFgyPkdhWI322W1o6Ei07/view?usp=sharing',
            amountDead: 0,
        },
        {
            cid: '003',
            xPosCam: 1,
            yPosCam: 4,
            url:
                'https://drive.google.com/file/d/1l6j_WN4BG9hxFgyPkdhWI322W1o6Ei07/view?usp=sharing',
            amountDead: 1,
        },
        {
            cid: '004',
            xPosCam: 4,
            yPosCam: 5,
            url:
                'https://drive.google.com/file/d/1l6j_WN4BG9hxFgyPkdhWI322W1o6Ei07/view?usp=sharing',
            amountDead: 3,
        },
        {
            cid: '005',
            xPosCam: 4,
            yPosCam: 6,
            url:
                'https://drive.google.com/file/d/1l6j_WN4BG9hxFgyPkdhWI322W1o6Ei07/view?usp=sharing',
            amountDead: 6,
        },
    ];

    // useEffect (() => {
    //     fetch('http://kookkook-backend-dev-ingress.default.202.28.193.100.xip.io/event/deadchickenmap', {
    //         method: 'GET',
    //         body: JSON.stringify(Camera),
    //         headers: { 'Content-Type': 'application/json' }
    //     })
    // })

    // const [zoneStatus, setZoneStatus] = useState(Array(24).fill(Array(14).fill(False)));
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
            <div className={styles.textLabelCh} style={{ marginTop: '2.5rem' }}>
                <p>Please select on dead chicken location</p>
            </div>
            <div className={styles.map}>
                {chars.map((char) => colLabel(char))}
                {zoneStatus().map((row, index) => eachrow(row, index))}
            </div>
        </Container>
    );
};

export default DeadChicken;
