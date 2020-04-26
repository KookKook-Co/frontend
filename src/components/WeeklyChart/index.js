import React, { useContext, useEffect, useState } from 'react';

import { Bar } from 'react-chartjs-2';
import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import LeftArr from '../../static/icon/left_arr.svg';
import RightArr from '../../static/icon/right_arr.svg';
import axios from 'axios';
import moment from 'moment';
import styles from './index.module.scss';

// const customTooltips = (tooltip) => {
//     tooltip.backgroundColor = '#FFF';
//     tooltip.mode = 'index';
//     tooltip.intersect = true;
//     tooltip.yPadding = 10;
//     tooltip.xPadding = 10;
//     tooltip.caretSize = 4;
//     tooltip.bodyFontColor = '#5A5A5A';
//     tooltip.borderColor = '#CECED0';
//     tooltip.borderWidth = 0.05;
//     tooltip.cornerRadius = 0;
//     tooltip.displayColors = false;
// };

const WeeklyChart = ({ property, zone }) => {
    const { state } = useContext(Context);
    const [day, setDay] = useState(moment());
    const [maxValue, setMaxValue] = useState();
    const [minValue, setMinValue] = useState();
    const [maxLabel, setMaxLabel] = useState('SUNDAY');
    const [minLabel, setMinLabel] = useState('SUNDAY');
    const [selectedDate, setSelectedDate] = useState();

    const [chartData, setChartData] = useState({
        labels: ['S', 'M', 'T', 'W', 'TH', 'F', 'SA'],
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
    });

    useEffect(() => {
        const getWeeklyChart = async () => {
            const res = await axios.get(
                `/event/env/weekly?sid=${`${zone}`}&type=${property}&dateStart=${day
                    .startOf('week')
                    .toISOString()}&dateEnd=${day.endOf('week').toISOString()}`,
            );
            console.log(res.data);

            const maxData = res.data.map((each) => each.max);
            const minData = res.data.map((each) => each.min);

            const realChartData = {
                labels: ['S', 'M', 'T', 'W', 'TH', 'F', 'SA'],
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
    }, [day]);

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
        if (maxLabel === 'S') {
            return 'SUNDAY';
        } else if (maxLabel === 'M') {
            return 'MONDAY';
        } else if (maxLabel === 'T') {
            return 'TUESDAY';
        } else if (maxLabel === 'W') {
            return 'WEDNESDAY';
        } else if (maxLabel === 'TH') {
            return 'THURSDAY';
        } else if (maxLabel === 'F') {
            return 'FRIDAY';
        } else if (maxLabel === 'SA') {
            return 'SATURDAY';
        }
    };

    const setShowDate = (maxLabel) => {
        if (maxLabel === 'S') {
            setSelectedDate(day.startOf('week').format('DD MMM YYYY'));
        } else if (maxLabel === 'M') {
            setSelectedDate(
                day.startOf('week').add(1, 'days').format('DD MMM YYYY'),
            );
        } else if (maxLabel === 'T') {
            setSelectedDate(
                day.startOf('week').add(2, 'days').format('DD MMM YYYY'),
            );
        } else if (maxLabel === 'W') {
            setSelectedDate(
                day.startOf('week').add(3, 'days').format('DD MMM YYYY'),
            );
        } else if (maxLabel === 'TH') {
            setSelectedDate(
                day.startOf('week').add(4, 'days').format('DD MMM YYYY'),
            );
        } else if (maxLabel === 'F') {
            setSelectedDate(
                day.startOf('week').add(5, 'days').format('DD MMM YYYY'),
            );
        } else if (maxLabel === 'SA') {
            setSelectedDate(
                day.startOf('week').add(6, 'days').format('DD MMM YYYY'),
            );
        }
    };

    const showDate = (maxLabel) => {
        if (maxLabel === 'S') {
            return day.startOf('week').format('DD MMM YYYY');
        } else if (maxLabel === 'M') {
            return day.startOf('week').add(1, 'days').format('DD MMM YYYY');
        } else if (maxLabel === 'T') {
            return day.startOf('week').add(2, 'days').format('DD MMM YYYY');
        } else if (maxLabel === 'W') {
            return day.startOf('week').add(3, 'days').format('DD MMM YYYY');
        } else if (maxLabel === 'TH') {
            return day.startOf('week').add(4, 'days').format('DD MMM YYYY');
        } else if (maxLabel === 'F') {
            return day.startOf('week').add(5, 'days').format('DD MMM YYYY');
        } else if (maxLabel === 'SA') {
            return day.startOf('week').add(6, 'days').format('DD MMM YYYY');
        }
    };

    // const findAvg = () => {
    //     const findSum = chartData.datasets.map((data) => {
    //         return data.data.reduce((accumulator, currentValue) => {
    //             return accumulator + currentValue;
    //         }, 0);
    //     });
    //     const arrLength = chartData.datasets.map((data) => {
    //         return data.data.length;
    //     });
    //     return findSum / arrLength;
    // };

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

                        console.log(label1);
                        console.log(value1);

                        setMaxValue(value1);
                        setMaxLabel(label1);

                        const label2 = chartData.labels[firstPoint._index];
                        const value2 =
                            chartData.datasets[1].data[firstPoint._index];
                        console.log(label2);
                        console.log(value2);

                        setMinValue(value2);
                        setMinLabel(label2);

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
                                // value: findAvg(),
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
