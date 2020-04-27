import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import WeeklyChart from '../WeeklyChart';
import Zone from '../Zone';
import styles from './index.module.scss';

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
    const { state } = useContext(Context);
    const [currentZone, setCurrentZone] = useState(1);
    const [currentProperty, setCurrentProperty] = useState('temperature');
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            history.push('/login');
        }
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
                        <div className={`${styles.textHouse}`}>
                            HOUSE{' '}
                            {state.user && state.user.hno ? state.user.hno : ''}
                        </div>
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
                                    isIrregular={
                                        state.zones &&
                                        state.zones[zone - 1]?.irregularEnv
                                            .length > 0
                                    }
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
                        zone={currentZone}
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
