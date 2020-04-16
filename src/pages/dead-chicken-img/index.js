import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './index.scss';
import chickenImg from './31.png';
import refresh from './refresh.svg';
import { useHistory } from 'react-router-dom';

const DeadChickenImg = () => {
    const history = useHistory();
    const refreshImg = () => {
        console.log('Refresh leaw ja');
    };
    const zoneLabel = zone => {
        return 'Zone ' + zone;
    };
    return (
        <Container>
            <div>
                <img src={chickenImg} alt="Chicken" className="chickenImg" />
                <p>{zoneLabel('3A')}</p>
                <p>Updated 1 hr ago</p>
                <img
                    src={refresh}
                    alt="Refresh"
                    className="img"
                    onClick={refreshImg}
                />
            </div>
        </Container>
    );
};

export default DeadChickenImg;
