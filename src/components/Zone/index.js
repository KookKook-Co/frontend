import React, { useContext, useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import Row from 'react-bootstrap/Row';
import ammoniaIcon from '../../static/icon/fog.svg';
import humidityIcon from '../../static/icon/humidity.svg';
import styles from './index.module.scss';
import tempIcon from '../../static/icon/temperature.svg';
import upArrow from '../../static/icon/up_arrow.svg';
import windIcon from '../../static/icon/wind.svg';

const Zone = ({ currentZone, onPropertySelected }) => {
    const { state } = useContext(Context);
    const zoneData = state.zones[currentZone - 1];
    console.log('+++++++zoneData++++++++');
    console.log(currentZone);
    const enviData = zoneData && zoneData.environmentalData;
    const isIrregular = (property) => {
        return zoneData.irregularEnv.includes(property);
    };

    useEffect(() => {
        console.log(state.zones[currentZone - 1]);
    }, [state.zones]);

    const dataFormat = enviData && [
        {
            result: 3,
            property: 'temperature',
            unit: '°C',
            percentage: '11.5%',
            measure: 'TEMPERATURE',
            enviIcon: tempIcon,
            alt: 'temp_icon',
            sensor: 'X',
            url: 'temp',
        },
        {
            result: 3,
            property: 'windspeed',
            unit: 'M/S',
            percentage: '11.5%',
            measure: 'WIND',
            enviIcon: windIcon,
            alt: 'wind_icon',
            sensor: 'Y',
            url: 'temp',
        },
        {
            result: 3,
            property: 'ammonia',
            unit: 'PPM',
            percentage: '11.5%',
            measure: 'AMMONIA',
            enviIcon: ammoniaIcon,
            alt: 'ammonia_icon',
            sensor: 'Z',
            url: 'temp',
        },
        {
            result: 3,
            property: 'humidity',
            unit: '% RH',
            percentage: '11.5%',
            measure: 'HUMIDITY',
            enviIcon: humidityIcon,
            alt: 'humidity_icon',
            sensor: 'Q',
            url: 'temp',
        },
    ];

    const data = dataFormat
        ? dataFormat.map((d) => {
              return {
                  ...d,
                  result: enviData[d.property],
              };
          })
        : [];

    return (
        <div>
            <Container className={`${styles.bgLightBlue} mt-4`}>
                <Row>
                    {data.map((data, index) => (
                        <Col
                            xs="6"
                            key={index}
                            className="d-flex flex-column p-2"
                            onClick={() => {
                                onPropertySelected(data.property);
                                console.log(data.property);
                            }}
                        >
                            <div
                                className={`${styles.bgCard} d-flex flex-column`}
                            >
                                <div className="d-flex flex-column text-center justify-content-center flex-grow-1">
                                    <p
                                        className={`m-0 ${
                                            isIrregular(data.property)
                                                ? `${styles.textIrregular}`
                                                : `${styles.textRecord}`
                                        }`}
                                    >
                                        {data.result}
                                    </p>
                                    <p className={`${styles.textUnit} m-0`}>
                                        {data.unit}
                                    </p>
                                </div>
                                <div className="d-flex p-2">
                                    <img
                                        src={data.enviIcon}
                                        alt={data.alt}
                                        className={`${styles.textImage} mr-2`}
                                    />
                                    <div className="d-flex flex-column flex-grow-1 w-100">
                                        <p
                                            className={`${styles.textMeasure} m-0`}
                                        >
                                            {data.measure}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Zone;
