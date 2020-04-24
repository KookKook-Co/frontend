import React, { useState } from 'react';

import { Bar } from 'react-chartjs-2';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import LeftArr from '../../static/icon/left_arr.svg';
import { Link } from 'react-router-dom';
import RightArr from '../../static/icon/right_arr.svg';
import moment from 'moment';
import styles from './index.module.scss';

const WeeklyChart = ({ property }) => {
    const [day, setDay] = useState(moment());

    const canAddWeek = (day) => {
        return !(
            day.clone().add(7, 'days').diff(moment().endOf('week'), 'days') > 0
        );
    };

    const chartData = {
        labels: ['S', 'M', 'T', 'W', 'TH', 'F', 'S'],
        datasets: [
            {
                label: 'MAX',
                data: [50, 30, 40, 25, 35, 45, 0].map(
                    (number) => Math.random() * 50,
                ),
                backgroundColor: 'rgba(254, 206, 71, 1)',
                barThickness: 19,
            },
            {
                label: 'MIN',
                data: [50, 30, 40, 25, 35, 45, 0].map(
                    (number) => Math.random() * 50,
                ),
                backgroundColor: 'rgba(58, 175, 174, 1)',
                barThickness: 19,
            },
        ],
    };

    const findAvg = () => {
        const findSum = chartData.datasets.map((data) => {
            return data.data.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);
        });
        const arrLength = chartData.datasets.map((data) => {
            return data.data.length;
        });
        return findSum / arrLength;
    };

    return (
        <Container>
            <div className="d-flex mx-3 mb-3">
                <div className="d-flex flex-column">
                    <div className={`${styles.textEnviTitle}`}>
                        {property.toUpperCase()}
                    </div>
                    <p className={`${styles.textFullDate}`}>
                        {day.format('dddd')} {day.format('DD MMM YYYY')}
                    </p>
                    <Link to="/">
                        <small>Change</small>
                    </Link>
                    <div className="d-flex">
                        <div className="d-flex flex-column">
                            <div className={`${styles.textValue}`}>26 C</div>
                            <p className={`m-0 ${styles.textTime}`}>
                                MIN at 05.00
                            </p>
                        </div>
                        <div className={`${styles.border} mx-2`}></div>
                        <div className="d-flex flex-column">
                            <div className={`${styles.textValue}`}>32 C</div>
                            <p className={`m-0 ${styles.textTime}`}>
                                MAX at 05.00
                            </p>
                        </div>
                    </div>
                </div>
                <DropdownButton
                    id={styles.btnDropdown}
                    title="Today"
                    className="ml-auto"
                >
                    <Dropdown.Item href="#/action-1">Week</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                        Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                        Something else
                    </Dropdown.Item>
                </DropdownButton>
            </div>
            <Bar
                data={chartData}
                width={124}
                height={150}
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
                                    display: false,
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
                                value: findAvg(),
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
                            // labelColor: function (tooltipItem, chart) {
                            //     return {
                            //         borderColor: 'rgb(255, 0, 0)',
                            //         backgroundColor: 'rgb(255, 0, 0)',
                            //     };
                            // },
                            // labelTextColor: function (tooltipItem, chart) {
                            //     return '#3AAFAE';
                            // },
                        },
                    },
                }}
            />

            <div className="pagination-week d-flex justify-content-center align-items-center">
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
