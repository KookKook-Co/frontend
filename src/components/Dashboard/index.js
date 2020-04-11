import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import WeeklyChart from '../WeeklyChart';
import Zone from '../Zone';
import io from 'socket.io-client';
import styles from './index.module.scss';

const socket = io('128.199.211.41:4000');

const ZonePicker = ({ isSelect, zone, onSelectZone, isIrregular }) => {
    return (
        <div
            className={`mr-2 mb-2 d-flex justify-content-center ${
                styles.bgBlock
            } ${
                isSelect
                    ? `${styles.bgSelect}`
                    : isIrregular
                    ? `${styles.bgIrregular}`
                    : ``
            }`}
            onClick={() => onSelectZone(zone)}
        >
            <p
                className={`m-0 align-items-center d-flex ${styles.textZoneNum}`}
            >
                {zone}
            </p>
        </div>
    );
};

const Dashboard = () => {
    const { state, dispatch } = useContext(Context);
    const [currentZone, setCurrentZone] = useState(1);
    const [currentProperty, setCurrentProperty] = useState('temperature');
    const history = useHistory();

    useEffect(() => {
        socket.on('pipeRealTimeData', (result) => {
            // console.log('+++result++++');
            // console.log(result);
            const realtimeData = result;
            dispatch({
                type: 'update-zones',
                payload: realtimeData,
            });
        });
        return () => socket.off('pipeRealTimeData');
    }, [dispatch]);

    useEffect(() => {
        // console.log('++++state+++');
        // console.log(state);
        // console.log(state.zones);
        socket.emit('getRealTimeData');
    }, []);

    return (
        <Container>
            <div className="mt-3 d-flex">
                <div>
                    <p className={`${styles.textZone} mb-1 m-0`}>
                        Zone {currentZone}
                    </p>
                    <div
                        className={`${styles.bgHouse} d-flex p-1 justify-content-center`}
                    >
                        <div className={`${styles.textHouse}`}>HOUSE A</div>
                    </div>
                </div>

                <div className="ml-auto d-flex">
                    <div className={`${styles.divDoor}`}>
                        <p className={`${styles.textDoor} m-0`}>DOOR</p>
                    </div>
                    <div className="d-flex flex-column">
                        <p className={`m-0 ${styles.textSelectZone}`}>
                            Select the zone
                        </p>
                        <div className={`${styles.rowZone}`}>
                            {[1, 2, 3, 4, 5, 6].map((zone) => (
                                <ZonePicker
                                    key={zone}
                                    zone={zone}
                                    onSelectZone={setCurrentZone}
                                    isSelect={zone === currentZone}
                                    // isIrregular={
                                    //     state.zones.find(
                                    //         (item) => item.sid === zone,
                                    //     ).irregularEnv.length > 0
                                    // }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Switch>
                <Route path="/dashboard/weekly">
                    <WeeklyChart
                        property={currentProperty}
                        onChangeView={() => history.push('/dashboard/hourly')}
                    />
                </Route>
                <Route path="/dashboard/hourly">
                    <WeeklyChart
                        property={currentProperty}
                        onChangeView={() => history.push('/dashboard/hourly')}
                    />
                </Route>
                <Route>
                    <Zone
                        currentZone={currentZone}
                        onPropertySelected={(property) => {
                            history.push('/dashboard/weekly');
                            setCurrentProperty(property);
                        }}
                    />
                </Route>
            </Switch>
        </Container>
    );
};

export default Dashboard;
