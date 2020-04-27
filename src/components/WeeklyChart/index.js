import * as moment from 'moment-timezone';

import React, { useEffect, useState } from 'react';

import { Bar } from 'react-chartjs-2';
import Container from 'react-bootstrap/Container';
import LeftArr from '../../static/icon/left_arr.svg';
import RightArr from '../../static/icon/right_arr.svg';
import axios from 'axios';
import styles from './index.module.scss';

const WeeklyChart = ({ property, zone }) => {
    const [day, setDay] = useState(moment().tz('Asia/Bangkok'));
    const [maxValue, setMaxValue] = useState();
    const [minValue, setMinValue] = useState();
    const [maxLabel, setMaxLabel] = useState('SUNDAY');
    const [selectedDate, setSelectedDate] = useState();

    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const getWeeklyChart = async () => {
            console.log(day.startOf('week').toISOString());
            console.log(day.endOf('week').toISOString());

            const res = await axios.get(
                `/event/env/weekly?sid=${`${zone}`}&type=${property}&dateStart=${day
                    .startOf('week')
                    .toISOString()}&dateEnd=${day
                    .endOf('week')
                    .clone()
                    .add(1, 'days')
                    .toISOString()}`,
            );

            const maxData = res.data.map((each) => each.max);
            const minData = res.data.map((each) => each.min);

            const realChartData = {
                labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
                datasets: [
                    {
                        label: 'MAX',
                        data: maxData,
                        backgroundColor: 'rgba(254, 206, 71, 1)',
                        barThickness: 19,
                    },
                    {
                        label: 'MIN',
                        data: minData,
                        backgroundColor: 'rgba(58, 175, 174, 1)',
                        barThickness: 19,
                    },
                ],
            };

            if (moreThanToday()) {
                setMaxValue(null);
                setMinValue(null);
            }
            setMaxValue(maxData[0]);
            setMinValue(minData[0]);
            setChartData(realChartData);
        };

        getWeeklyChart();
    }, [day, zone]);

    const canAddWeek = (day) => {
        return !(
            day.clone().add(7, 'days').diff(moment().endOf('week'), 'days') > 0
        );
    };

    const moreThanToday = () => {
        return day.diff(setSelectedDate, 'days') > 0;
    };

    const getUnit = (property) => {
        if (property === 'temperature') {
            return 'C';
        } else if (property === 'windspeed') {
            return 'M/S';
        } else if (property === 'ammonia') {
            return 'PPM';
        } else if (property === 'humidity') {
            return '%';
        }
    };

    const showDay = (maxLabel) => {
        if (maxLabel === 'SUN') {
            return 'SUNDAY';
        } else if (maxLabel === 'MON') {
            return 'MONDAY';
        } else if (maxLabel === 'TUE') {
            return 'TUESDAY';
        } else if (maxLabel === 'WED') {
            return 'WEDNESDAY';
        } else if (maxLabel === 'THU') {
            return 'THURSDAY';
        } else if (maxLabel === 'FRI') {
            return 'FRIDAY';
        } else if (maxLabel === 'SAT') {
            return 'SATURDAY';
        }
    };

    const setShowDate = (maxLabel) => {
        if (maxLabel === 'SUN') {
            setSelectedDate(day.startOf('week').format('DD MMM YYYY'));
        } else if (maxLabel === 'MON') {
            setSelectedDate(
                day.startOf('week').add(1, 'days').format('DD MMM YYYY'),
            );
        } else if (maxLabel === 'TUE') {
            setSelectedDate(
                day.startOf('week').add(2, 'days').format('DD MMM YYYY'),
            );
        } else if (maxLabel === 'WED') {
            setSelectedDate(
                day.startOf('week').add(3, 'days').format('DD MMM YYYY'),
            );
        } else if (maxLabel === 'THU') {
            setSelectedDate(
                day.startOf('week').add(4, 'days').format('DD MMM YYYY'),
            );
        } else if (maxLabel === 'FRI') {
            setSelectedDate(
                day.startOf('week').add(5, 'days').format('DD MMM YYYY'),
            );
        } else if (maxLabel === 'SAT') {
            setSelectedDate(
                day.startOf('week').add(6, 'days').format('DD MMM YYYY'),
            );
        }
    };

    const showDate = (maxLabel) => {
        if (maxLabel === 'SUN') {
            return day.startOf('week').format('DD MMM YYYY');
        } else if (maxLabel === 'MON') {
            return day.startOf('week').add(1, 'days').format('DD MMM YYYY');
        } else if (maxLabel === 'TUE') {
            return day.startOf('week').add(2, 'days').format('DD MMM YYYY');
        } else if (maxLabel === 'WED') {
            return day.startOf('week').add(3, 'days').format('DD MMM YYYY');
        } else if (maxLabel === 'THU') {
            return day.startOf('week').add(4, 'days').format('DD MMM YYYY');
        } else if (maxLabel === 'FRI') {
            return day.startOf('week').add(5, 'days').format('DD MMM YYYY');
        } else if (maxLabel === 'SAT') {
            return day.startOf('week').add(6, 'days').format('DD MMM YYYY');
        }
    };

    return (
        <Container className="p-0">
            <div className="d-flex mx-3 mb-3">
                <div className="d-flex flex-column">
                    <div className={`${styles.textEnviTitle}`}>
                        {property.toUpperCase()}
                    </div>
                    <p className={`${styles.textFullDate}`}>
                        {showDay(maxLabel) || 'SUNDAY'}{' '}
                        {showDate(maxLabel) ||
                            day.startOf('week').format('DD MMM YYYY')}
                    </p>
                    <div className="d-flex">
                        <div className="d-flex flex-column">
                            <div className={`${styles.textValue}`}>
                                {minValue} {getUnit(property)}
                            </div>
                            <p className={`m-0 ${styles.textTime}`}>
                                MIN at 05.00
                            </p>
                        </div>
                        <div className={`${styles.border} mx-2`}></div>
                        <div className="d-flex flex-column">
                            <div className={`${styles.textValue}`}>
                                {maxValue} {getUnit(property)}
                            </div>
                            <p className={`m-0 ${styles.textTime}`}>
                                MAX at 18.00
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Bar
                data={chartData}
                width={130}
                height={25}
                getElementsAtEvent={(elems) => {
                    console.log(elems);
                    const firstPoint = elems[0];

                    if (firstPoint !== undefined) {
                        const label1 = chartData.labels[firstPoint._index];
                        const value1 =
                            chartData.datasets[firstPoint._datasetIndex].data[
                                firstPoint._index
                            ];

                        setMaxValue(value1);
                        setMaxLabel(label1);

                        const value2 =
                            chartData.datasets[1].data[firstPoint._index];

                        setMinValue(value2);

                        setShowDate(label1);
                    }
                }}
                options={{
                    maintainAspectRatio: false,
                    cornerRadius: 8,
                    label: {
                        display: false,
                    },
                    legend: {
                        display: true,
                        labels: {
                            fontColor: '#2E86AB',
                            fontFamily: 'Airbnb Cereal App',
                        },
                    },
                    scales: {
                        xAxes: [
                            {
                                type: 'category',
                                gridLines: {
                                    display: false,
                                    drawBorder: false,
                                },
                            },
                        ],
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                                gridLines: {
                                    display: false,
                                    drawOnChartArea: false,
                                    color: 'rgba(0, 0, 0, 0)',
                                },
                            },
                        ],
                    },
                    annotation: {
                        annotations: [
                            {
                                type: 'line',
                                mode: 'horizontal',
                                scaleID: 'y-axis-0',
                                borderColor: 'rgb(58, 175, 174)',
                                borderWidth: 2,
                                borderDash: [2, 2],
                                label: {
                                    enabled: true,
                                    backgroundColor: 'rgba(0,0,0,0)',
                                    fontFamily: 'Airbnb Cereal App',
                                    fontSize: 8,
                                    fontColor: '#3AAFAE',
                                    position: 'right',
                                    yAdjust: -8,
                                    content: 'avg',
                                },
                            },
                        ],
                    },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                var label =
                                    data.datasets[tooltipItem.datasetIndex]
                                        .label || '';

                                if (label) {
                                    label += ': ';
                                }
                                label +=
                                    Math.round(tooltipItem.yLabel * 100) / 100;
                                return label;
                            },
                        },
                    },
                }}
            />

            <div className="pagination-week d-flex justify-content-center align-items-center mb-3">
                <img
                    src={LeftArr}
                    alt="left_arr"
                    onClick={() => {
                        setDay((day) => day.clone().subtract(7, 'days'));
                    }}
                />
                <div className={`${styles.textDate} mx-2`}>
                    {day.startOf('week').format('DD MMM YYYY')} {` - `}
                    {day.endOf('week').format('DD MMM YYYY')}
                </div>
                <img
                    src={RightArr}
                    alt="right_arr"
                    onClick={() => {
                        if (canAddWeek(day))
                            setDay((day) => day.clone().add(7, 'days'));
                    }}
                />
            </div>
        </Container>
    );
};

export default WeeklyChart;
