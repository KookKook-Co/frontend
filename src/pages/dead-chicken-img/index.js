import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../Store';
import Container from 'react-bootstrap/Container';
import './index.scss';
import chickenImg from './31.png';
import refresh from './refresh.svg';
import { useHistory } from 'react-router-dom';

// state.deadChickenLocation.key

const DeadChickenImg = () => {
    const history = useHistory();
    const [zone, setZone] = useState();
    const [id, setId] = useState();
    const [camera, setCamera] = useState([]);
    const [imgUrl, setImgUrl] = useState();
    const refreshImg = () => {
        console.log('++++++++ DEAD LOCATION ++++++++');
        console.log(state.deadChickenLocation);
        console.log(imgUrl);
    };
    const { state, dispatch } = useContext(Context);

    useEffect(() => {
        const setVars = async () => {
            // await setImgUrl(
            //     (state.deadChickenMap.filter = (data) =>
            //         data.xPosCam == xPos && data.yPosCam == yPos),
            // );
            setCamera(state.deadChickenMap);
            setZone(state.deadChickenLocation.Zone);
            setId(state.deadChickenLocation.cid);
            console.log('cam id');
            // console.log(camera[id]);
            // await setImgUrl(camera[id].url);
        };
        setVars();
    });

    return (
        <Container>
            <div>
                <img
                    src={chickenImg}
                    alt="DeadChicken"
                    className="chickenImg"
                />
                <p>{'Zone ' + zone}</p>
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
