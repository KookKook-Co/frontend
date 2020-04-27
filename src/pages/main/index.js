import React, { useContext, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import { Context } from '../../Store';
import DailyData from '../../components/DailyData';
import Dashboard from '../../components/Dashboard';
import DeadChicken from '../../components/DeadChicken';
import io from 'socket.io-client';
import styles from './index.module.scss';

const socket = io('/');

const MainTabs = () => {
    const { dispatch } = useContext(Context);
    const history = useHistory();

    useEffect(() => {
        socket.on('pipeRealTimeData', (result) => {
            const realtimeData = result;
            dispatch({
                type: 'update-zones',
                payload: realtimeData,
            });
        });
        return () => socket.off('pipeRealTimeData');
    }, [dispatch]);

    useEffect(() => {
        socket.emit('getRealTimeData');
    }, []);

    return (
        <Container className={`${styles.bgLightBlue} p-0`}>
            <div className="d-flex justify-content-between">
                <div
                    className={`flex-column w-100`}
                    onClick={() => history.push('/')}
                >
                    <div
                        className={`d-flex flex-column h-100 justify-content-center ${
                            history.location.pathname.split('/')[1] === ''
                                ? `${styles.tabActive}`
                                : `${styles.tab}`
                        }`}
                    >
                        <div
                            className={`d-flex flex-column justify-content-center flex-grow-1 p-1`}
                        >
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`align-self-center mx-auto`}
                            >
                                <path d="M4.15625 13.125C4.81805 13.125 5.41705 12.8595 5.85968 12.4331L8.28793 13.6471C8.27576 13.746 8.25781 13.8432 8.25781 13.9453C8.25781 15.3022 9.36182 16.4062 10.7188 16.4062C12.0757 16.4062 13.1797 15.3022 13.1797 13.9453C13.1797 13.5666 13.0865 13.2119 12.933 12.8911L16.227 9.59702C16.5479 9.75061 16.9025 9.84375 17.2812 9.84375C18.6382 9.84375 19.7422 8.73975 19.7422 7.38281C19.7422 7.12732 19.692 6.88571 19.6194 6.65393L22.4815 4.50787C22.872 4.76871 23.34 4.92188 23.8438 4.92188C25.2007 4.92188 26.3047 3.81787 26.3047 2.46094C26.3047 1.104 25.2007 0 23.8438 0C22.4868 0 21.3828 1.104 21.3828 2.46094C21.3828 2.71643 21.433 2.95804 21.5056 3.18982L18.6435 5.33588C18.253 5.07504 17.785 4.92188 17.2812 4.92188C15.9243 4.92188 14.8203 6.02588 14.8203 7.38281C14.8203 7.76157 14.9135 8.11618 15.067 8.43704L11.773 11.7311C11.4521 11.5775 11.0975 11.4844 10.7188 11.4844C10.0569 11.4844 9.45795 11.7499 9.01532 12.1763L6.58707 10.9623C6.59924 10.8634 6.61719 10.7662 6.61719 10.6641C6.61719 9.30713 5.51318 8.20312 4.15625 8.20312C2.79932 8.20312 1.69531 9.30713 1.69531 10.6641C1.69531 12.021 2.79932 13.125 4.15625 13.125Z" />
                                <path d="M27.1797 26.3594H26.3047V9.02344C26.3047 8.57013 25.9377 8.20312 25.4844 8.20312H22.2031C21.7498 8.20312 21.3828 8.57013 21.3828 9.02344V26.3594H19.7422V13.9453C19.7422 13.492 19.3752 13.125 18.9219 13.125H15.6406C15.1873 13.125 14.8203 13.492 14.8203 13.9453V26.3594H13.1797V20.5078C13.1797 20.0545 12.8127 19.6875 12.3594 19.6875H9.07812C8.62482 19.6875 8.25781 20.0545 8.25781 20.5078V26.3594H6.61719V17.2266C6.61719 16.7733 6.25018 16.4062 5.79688 16.4062H2.51562C2.06232 16.4062 1.69531 16.7733 1.69531 17.2266V26.3594H0.820312C0.367004 26.3594 0 26.7264 0 27.1797C0 27.633 0.367004 28 0.820312 28H27.1797C27.633 28 28 27.633 28 27.1797C28 26.7264 27.633 26.3594 27.1797 26.3594Z" />
                            </svg>
                            <div
                                className={`${
                                    history.location.pathname.split('/')[1] ===
                                    ''
                                        ? `${styles.textTitleHover}`
                                        : `${styles.textTitle}`
                                } mt-1`}
                            >
                                DASHBOARD
                            </div>
                        </div>

                        <div
                            className={`${
                                history.location.pathname.split('/')[1] === ''
                                    ? `${styles.lineHover}`
                                    : `${styles.line}`
                            }`}
                        ></div>
                    </div>
                </div>
                <div
                    className={`flex-column w-100`}
                    onClick={() => history.push('/dead-chicken')}
                >
                    <div
                        className={`d-flex flex-column h-100 justify-content-center ${
                            history.location.pathname.split(
                                '/dead-chicken',
                            )[1] === ''
                                ? `${styles.tabActive}`
                                : `${styles.tab}`
                        }`}
                    >
                        <div
                            className={`d-flex flex-column justify-content-center flex-grow-1 p-1`}
                        >
                            <svg
                                width="28"
                                height="33"
                                viewBox="0 0 28 33"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`align-self-center mx-auto`}
                            >
                                <path d="M27.997 8.09368C27.997 7.00038 26.7258 7.00038 26.7258 7.00038C26.7258 7.00038 27.997 7.00038 27.997 5.63842C27.997 4.27645 26.4681 4.54885 26.4681 4.54885C26.5339 4.08187 26.4415 3.60507 26.2077 3.2047C25.974 2.80433 25.6142 2.50682 25.1934 2.36598C23.682 1.82119 23.682 10.2728 18.0714 11.9109C12.4609 13.549 7.89167 9.18325 8.1459 4.54885C8.1459 4.54885 9.6713 4.27272 9.6713 2.91076C9.6713 2.91076 9.16283 1.5488 7.63743 2.36598C7.63743 2.36598 8.40013 1.00028 7.37972 0.183106C6.3593 -0.634071 5.60009 1.5488 5.60009 1.5488C5.60009 1.5488 4.83739 -0.372873 3.56274 0.455498C3.56274 0.455498 2.80004 1.00028 3.30851 2.09358C3.30851 2.09358 1.52888 1.82119 1.52888 2.91076C1.52888 2.91076 1.01693 4.00033 2.80004 4.54885C2.80004 4.54885 3.56274 5.36602 1.78311 5.63842L0 6.45559L2.78611 8.09368C2.78611 8.09368 1.003 17.6386 5.33193 22.273C5.33193 22.273 8.89467 26.0902 11.4405 25.5454C11.4405 25.5454 11.1862 28.5306 13.4743 28.8179V31.0008C12.5155 30.8722 11.5429 31.0624 10.6882 31.5455C10.6882 31.5455 10.4305 31.8179 10.9425 32.0903C10.9425 32.0903 13.4848 31.8179 13.4848 31.5455H14.5052C14.5052 31.5455 15.7764 32.0903 16.5391 31.8179C16.5391 31.8179 17.051 31.5455 16.0306 31.2732C15.6033 30.8942 15.0593 30.6999 14.5052 30.7284V28.8179C14.5052 28.8179 15.7764 29.0903 16.2848 27.4559C16.4285 26.8297 16.5137 26.1897 16.5391 25.5454C18.1114 25.5313 19.6559 25.0991 21.0339 24.2876C22.4119 23.4762 23.5803 22.3108 24.4342 20.8961C24.4342 20.8961 25.9631 19.5454 26.4681 14.3662C26.4681 14.3662 27.9935 14.3662 27.9935 13.0005C28.0105 12.8465 27.9942 12.6903 27.9458 12.5441C27.8975 12.398 27.8184 12.2656 27.7147 12.1574C27.611 12.0492 27.4855 11.968 27.3478 11.9201C27.2102 11.8722 27.0641 11.8588 26.9208 11.8811C27.2269 11.8488 27.5095 11.691 27.7094 11.4406C27.9093 11.1903 28.0111 10.8667 27.9935 10.5377C27.9935 10.5377 27.9935 9.44818 26.7223 9.44818C26.7258 9.45564 27.997 9.18325 27.997 8.09368Z" />
                            </svg>
                            <div
                                className={`${
                                    history.location.pathname.split(
                                        '/dead-chicken',
                                    )[1] === ''
                                        ? `${styles.textTitleHover}`
                                        : `${styles.textTitle}`
                                } mt-1`}
                            >
                                DEAD CHICKEN
                            </div>
                        </div>

                        <div
                            className={`${
                                history.location.pathname.split(
                                    '/dead-chicken',
                                )[1] === ''
                                    ? `${styles.lineHover}`
                                    : `${styles.line}`
                            }`}
                        ></div>
                    </div>
                </div>
                <div
                    className={`flex-column w-100`}
                    onClick={() => history.push('/daily-data')}
                >
                    <div
                        className={`d-flex flex-column h-100 justify-content-center ${
                            history.location.pathname.split(
                                '/daily-data',
                            )[1] === ''
                                ? `${styles.tabActive}`
                                : `${styles.tab}`
                        }`}
                    >
                        <div
                            className={`d-flex flex-column justify-content-center flex-grow-1 p-1`}
                        >
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`align-self-center mx-auto`}
                            >
                                <path d="M6.91553 15.3125C6.31145 15.3125 5.82178 15.8022 5.82178 16.4062C5.82178 17.0103 6.31145 17.5 6.91553 17.5H13.7575C14.3616 17.5 14.8513 17.0103 14.8513 16.4062C14.8513 15.8022 14.3616 15.3125 13.7575 15.3125H6.91553Z" />
                                <path d="M19.2749 12.0312C19.2749 11.4272 18.7852 10.9375 18.1812 10.9375H6.91553C6.31145 10.9375 5.82178 11.4272 5.82178 12.0312C5.82178 12.6353 6.31145 13.125 6.91553 13.125H18.1812C18.7852 13.125 19.2749 12.6353 19.2749 12.0312Z" />
                                <path d="M9.48587 25.8125H5.82788C4.62169 25.8125 3.64038 24.8312 3.64038 23.625V4.375C3.64038 3.16881 4.62169 2.1875 5.82788 2.1875H19.2749C20.4811 2.1875 21.4624 3.16881 21.4624 4.375V11.1016C21.4624 11.7056 21.9521 12.1953 22.5562 12.1953C23.1603 12.1953 23.6499 11.7056 23.6499 11.1016V4.375C23.6499 1.96263 21.6873 0 19.2749 0H5.82788C3.41551 0 1.45288 1.96263 1.45288 4.375V23.625C1.45288 26.0374 3.41551 28 5.82788 28H9.48587C10.09 28 10.5796 27.5103 10.5796 26.9062C10.5796 26.3022 10.09 25.8125 9.48587 25.8125Z" />
                                <path d="M25.5873 15.8359C24.308 14.5565 22.2263 14.5565 20.9478 15.835L14.9429 21.8266C14.8154 21.9538 14.7213 22.1105 14.669 22.2829L13.3612 26.5882C13.2453 26.9699 13.3463 27.3844 13.6249 27.6699C13.8335 27.8838 14.1171 27.9999 14.4078 27.9999C14.5051 27.9999 14.6033 27.9869 14.6997 27.9601L19.1144 26.7373C19.2961 26.687 19.4617 26.5905 19.5951 26.4573L25.5874 20.4763C26.8667 19.197 26.8667 17.1153 25.5873 15.8359ZM18.2533 24.706L16.0323 25.3212L16.6823 23.1813L20.734 19.1386L22.2811 20.6857L18.2533 24.706ZM24.0414 18.9289L23.8294 19.1404L22.2826 17.5935L22.4938 17.3828C22.9203 16.9563 23.6141 16.9563 24.0406 17.3828C24.467 17.8092 24.467 18.5031 24.0414 18.9289Z" />
                                <path d="M18.1812 6.5625H6.91553C6.31145 6.5625 5.82178 7.05217 5.82178 7.65625C5.82178 8.26033 6.31145 8.75 6.91553 8.75H18.1812C18.7852 8.75 19.2749 8.26033 19.2749 7.65625C19.2749 7.05217 18.7852 6.5625 18.1812 6.5625Z" />
                            </svg>
                            <div
                                className={`${
                                    history.location.pathname.split(
                                        '/daily-data',
                                    )[1] === ''
                                        ? `${styles.textTitleHover}`
                                        : `${styles.textTitle}`
                                } mt-1`}
                            >
                                FILL DAILY DATA
                            </div>
                        </div>

                        <div
                            className={`${
                                history.location.pathname.split(
                                    '/daily-data',
                                )[1] === ''
                                    ? `${styles.lineHover}`
                                    : `${styles.line}`
                            }`}
                        ></div>
                    </div>
                </div>
            </div>
            <Switch>
                <Route path="/dead-chicken">
                    <DeadChicken />
                </Route>
                <Route path="/daily-data">
                    <DailyData />
                </Route>
                <Route>
                    <Dashboard />
                </Route>
            </Switch>
        </Container>
    );
};

export default MainTabs;
