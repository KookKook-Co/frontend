import * as moment from 'moment-timezone';

import React, { useContext, useEffect, useState } from 'react';

import { Bar } from 'react-chartjs-2';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import LeftArr from '../../static/icon/left_arr.svg';
import RightArr from '../../static/icon/right_arr.svg';
import axios from 'axios';
import styles from './index.module.scss';

const WeeklyChart = ({ property, zone }) => {
    const [day, setDay] = useState(moment().tz('Asia/Bangkok'));
    const [selectedDate, setSelectedDate] = useState();
    const [maxLabel, setMaxLabel] = useState();
    const [currentIndex, setCurrentIndex] = useState();
    const [resData, setResData] = useState();

    const [chartData, setChartData] = useState({});

    const { state } = useContext(Context);

    useEffect(() => {
        const getWeeklyChart = async () => {
            const res = await axios.get(
                `/event/env/weekly?sid=${`${zone}`}&type=${property}&dateStart=${day
                    .startOf('week')
                    .format('DD-MM-YYYY')}&dateEnd=${day
                    .endOf('week')
                    .format('DD-MM-YYYY')}`,
            );

            setResData(res.data);
            setCurrentIndex(res.data.length - 1);

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
            setChartData(realChartData);
        };

        getWeeklyChart();
    }, [day, zone, state.user.hno]);

    const canAddWeek = (day) => {
        return !(
            day.clone().add(7, 'days').diff(moment().endOf('week'), 'days') > 0
        );
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

    const weekDay = [
        'SUNDAY',
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
    ];

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
                        {weekDay[currentIndex] || 'SUNDAY'}{' '}
                        {resData && resData[currentIndex]
                            ? moment(resData[currentIndex].date)
                                  .tz('Asia/Bangkok')
                                  .format('DD MMM YYYY')
                            : day.startOf('week').format('DD MMM YYYY')}
                    </p>
                    <div className="d-flex">
                        <div className="d-flex flex-column">
                            <div className={`${styles.textValue}`}>
                                {resData && resData[currentIndex]
                                    ? resData[currentIndex].min
                                    : ''}{' '}
                                {getUnit(property)}
                            </div>
                            <p className={`m-0 ${styles.textTime}`}>
                                {resData && resData[currentIndex]
                                    ? `MIN at ${moment(
                                          resData &&
                                              resData[currentIndex].minTS,
                                      )
                                          .tz('Asia/Bangkok')
                                          .format('hh:mm a')}`
                                    : ''}{' '}
                            </p>
                        </div>
                        <div className={`${styles.border} mx-2`}></div>
                        <div className="d-flex flex-column">
                            <div className={`${styles.textValue}`}>
                                {resData && resData[currentIndex]
                                    ? resData[currentIndex].max
                                    : ''}{' '}
                                {getUnit(property)}
                            </div>
                            <p className={`m-0 ${styles.textTime}`}>
                                {resData && resData[currentIndex]
                                    ? `MAX at ${moment(
                                          resData &&
                                              resData[currentIndex].maxTS,
                                      )
                                          .tz('Asia/Bangkok')
                                          .format('hh:mm a')}`
                                    : ''}{' '}
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
                    const firstPoint = elems[0];

                    if (firstPoint !== undefined) {
                        const label1 = chartData.labels[firstPoint._index];

                        setCurrentIndex(firstPoint._index);
                        setMaxLabel(label1);

                        const value2 =
                            chartData.datasets[1].data[firstPoint._index];

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

            <div className="pagination-week d-flex justify-content-center align-items-center pb-3">
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
