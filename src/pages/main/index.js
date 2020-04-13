import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import DailyData from '../../components/DailyData';
import Dashboard from '../../components/Dashboard';
import DeadChicken from '../../components/DeadChicken';
import Row from 'react-bootstrap/Row';
import styles from './index.module.scss';

const MainTabs = () => {
    const history = useHistory();

    return (
        <Container
            className={`${styles.bgLightBlue}`}
            styles="height: calc(100vh - 56px)"
        >
            <Row>
                <Col
                    xs={4}
                    className={
                        history.location.pathname.split('/')[1] === 'dashboard'
                            ? `${styles.tabActive}`
                            : `${styles.tab}`
                    }
                    onClick={() => history.push('/dashboard')}
                >
                    <svg
                        width="125"
                        height="56"
                        viewBox="0 0 125 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M52.1562 23.125C52.8181 23.125 53.4171 22.8595 53.8597 22.4331L56.2879 23.6471C56.2758 23.746 56.2578 23.8432 56.2578 23.9453C56.2578 25.3022 57.3618 26.4062 58.7188 26.4062C60.0757 26.4062 61.1797 25.3022 61.1797 23.9453C61.1797 23.5666 61.0865 23.2119 60.933 22.8911L64.227 19.597C64.5479 19.7506 64.9025 19.8438 65.2812 19.8438C66.6382 19.8438 67.7422 18.7397 67.7422 17.3828C67.7422 17.1273 67.692 16.8857 67.6194 16.6539L70.4815 14.5079C70.872 14.7687 71.34 14.9219 71.8438 14.9219C73.2007 14.9219 74.3047 13.8179 74.3047 12.4609C74.3047 11.104 73.2007 10 71.8438 10C70.4868 10 69.3828 11.104 69.3828 12.4609C69.3828 12.7164 69.433 12.958 69.5056 13.1898L66.6435 15.3359C66.253 15.075 65.785 14.9219 65.2812 14.9219C63.9243 14.9219 62.8203 16.0259 62.8203 17.3828C62.8203 17.7616 62.9135 18.1162 63.067 18.437L59.773 21.7311C59.4521 21.5775 59.0975 21.4844 58.7188 21.4844C58.0569 21.4844 57.4579 21.7499 57.0153 22.1763L54.5871 20.9623C54.5992 20.8634 54.6172 20.7662 54.6172 20.6641C54.6172 19.3071 53.5132 18.2031 52.1562 18.2031C50.7993 18.2031 49.6953 19.3071 49.6953 20.6641C49.6953 22.021 50.7993 23.125 52.1562 23.125Z" />
                        <path d="M75.1797 36.3594H74.3047V19.0234C74.3047 18.5701 73.9377 18.2031 73.4844 18.2031H70.2031C69.7498 18.2031 69.3828 18.5701 69.3828 19.0234V36.3594H67.7422V23.9453C67.7422 23.492 67.3752 23.125 66.9219 23.125H63.6406C63.1873 23.125 62.8203 23.492 62.8203 23.9453V36.3594H61.1797V30.5078C61.1797 30.0545 60.8127 29.6875 60.3594 29.6875H57.0781C56.6248 29.6875 56.2578 30.0545 56.2578 30.5078V36.3594H54.6172V27.2266C54.6172 26.7733 54.2502 26.4062 53.7969 26.4062H50.5156C50.0623 26.4062 49.6953 26.7733 49.6953 27.2266V36.3594H48.8203C48.367 36.3594 48 36.7264 48 37.1797C48 37.633 48.367 38 48.8203 38H75.1797C75.633 38 76 37.633 76 37.1797C76 36.7264 75.633 36.3594 75.1797 36.3594Z" />
                        <path d="M40.605 47V42.03H42.25C42.6466 42.03 43.006 42.0883 43.328 42.205C43.6546 42.3217 43.9323 42.4897 44.161 42.709C44.3943 42.9237 44.5716 43.1827 44.693 43.486C44.819 43.7893 44.882 44.1277 44.882 44.501C44.882 44.879 44.819 45.222 44.693 45.53C44.5716 45.8333 44.3943 46.0947 44.161 46.314C43.9323 46.5333 43.657 46.7037 43.335 46.825C43.013 46.9417 42.6536 47 42.257 47H40.605ZM41.193 46.461H42.236C42.5486 46.461 42.831 46.4167 43.083 46.328C43.335 46.2347 43.5496 46.104 43.727 45.936C43.9043 45.7633 44.0396 45.558 44.133 45.32C44.231 45.082 44.28 44.8137 44.28 44.515C44.28 44.2163 44.231 43.948 44.133 43.71C44.0396 43.472 43.902 43.269 43.72 43.101C43.5426 42.9283 43.328 42.7977 43.076 42.709C42.8286 42.6157 42.5486 42.569 42.236 42.569H41.193V46.461ZM45.3229 47L47.3249 42.03H47.9479L49.9499 47H49.3199L48.7669 45.586H46.4849L45.9319 47H45.3229ZM46.6949 45.047H48.5499L47.6259 42.681L46.6949 45.047ZM52.0939 47.105C51.8325 47.105 51.5899 47.0607 51.3659 46.972C51.1419 46.8787 50.9482 46.748 50.7849 46.58C50.6215 46.412 50.5025 46.2137 50.4279 45.985L50.9809 45.81C51.0742 46.0527 51.2165 46.2417 51.4079 46.377C51.6039 46.5123 51.8302 46.58 52.0869 46.58C52.2875 46.58 52.4672 46.5403 52.6259 46.461C52.7892 46.377 52.9152 46.265 53.0039 46.125C53.0972 45.9803 53.1439 45.8193 53.1439 45.642C53.1439 45.4133 53.0645 45.2267 52.9059 45.082C52.7519 44.9327 52.5279 44.8253 52.2339 44.76L51.9259 44.69C51.4685 44.5873 51.1255 44.4193 50.8969 44.186C50.6682 43.9527 50.5539 43.6657 50.5539 43.325C50.5539 43.1197 50.5912 42.933 50.6659 42.765C50.7452 42.5923 50.8549 42.443 50.9949 42.317C51.1349 42.191 51.2959 42.0953 51.4779 42.03C51.6645 41.96 51.8652 41.925 52.0799 41.925C52.3319 41.925 52.5629 41.9717 52.7729 42.065C52.9875 42.1537 53.1719 42.282 53.3259 42.45C53.4799 42.618 53.5919 42.814 53.6619 43.038L53.1089 43.213C53.0155 42.9657 52.8802 42.7767 52.7029 42.646C52.5255 42.5153 52.3179 42.45 52.0799 42.45C51.8979 42.45 51.7369 42.4873 51.5969 42.562C51.4569 42.632 51.3472 42.73 51.2679 42.856C51.1885 42.9773 51.1489 43.1197 51.1489 43.283C51.1489 43.4977 51.2259 43.675 51.3799 43.815C51.5339 43.9503 51.7789 44.0577 52.1149 44.137L52.4229 44.207C52.8662 44.3097 53.1952 44.4823 53.4099 44.725C53.6292 44.9677 53.7389 45.2617 53.7389 45.607C53.7389 45.8263 53.6969 46.0293 53.6129 46.216C53.5335 46.398 53.4192 46.5567 53.2699 46.692C53.1252 46.8227 52.9525 46.9253 52.7519 47C52.5512 47.07 52.3319 47.105 52.0939 47.105ZM54.7173 47V42.03H55.3053V44.144H58.0633V42.03H58.6513V47H58.0633V44.683H55.3053V47H54.7173ZM59.8818 47V42.03H61.4708C61.7834 42.03 62.0541 42.0813 62.2828 42.184C62.5114 42.2867 62.6864 42.4337 62.8078 42.625C62.9338 42.8163 62.9968 43.0403 62.9968 43.297C62.9968 43.5397 62.9384 43.752 62.8218 43.934C62.7051 44.116 62.5394 44.2583 62.3248 44.361C62.6048 44.4543 62.8218 44.6107 62.9758 44.83C63.1298 45.0493 63.2068 45.3083 63.2068 45.607C63.2068 45.8917 63.1368 46.139 62.9968 46.349C62.8568 46.5543 62.6584 46.7153 62.4018 46.832C62.1498 46.944 61.8511 47 61.5058 47H59.8818ZM60.4698 42.555V44.144H61.4428C61.7508 44.144 61.9864 44.0763 62.1498 43.941C62.3131 43.8057 62.3948 43.6097 62.3948 43.353C62.3948 43.0963 62.3108 42.9003 62.1428 42.765C61.9748 42.625 61.7414 42.555 61.4428 42.555H60.4698ZM60.4698 46.475H61.4918C61.8418 46.475 62.1148 46.3957 62.3108 46.237C62.5068 46.0783 62.6048 45.8567 62.6048 45.572C62.6048 45.2827 62.5068 45.0587 62.3108 44.9C62.1194 44.7367 61.8464 44.655 61.4918 44.655H60.4698V46.475ZM64.0507 44.522C64.0507 44.2187 64.0904 43.934 64.1697 43.668C64.249 43.402 64.361 43.1593 64.5057 42.94C64.6504 42.7207 64.823 42.534 65.0237 42.38C65.2244 42.2213 65.4484 42.1 65.6957 42.016C65.943 41.932 66.209 41.89 66.4937 41.89C66.8437 41.89 67.1657 41.9553 67.4597 42.086C67.7537 42.212 68.008 42.394 68.2227 42.632C68.442 42.8653 68.61 43.143 68.7267 43.465C68.848 43.7823 68.9087 44.1323 68.9087 44.515C68.9087 44.8183 68.869 45.103 68.7897 45.369C68.7104 45.635 68.5984 45.8777 68.4537 46.097C68.309 46.3163 68.1364 46.5053 67.9357 46.664C67.735 46.818 67.511 46.937 67.2637 47.021C67.0164 47.105 66.7504 47.147 66.4657 47.147C66.1157 47.147 65.7937 47.084 65.4997 46.958C65.2057 46.8273 64.949 46.6453 64.7297 46.412C64.515 46.174 64.347 45.8963 64.2257 45.579C64.109 45.257 64.0507 44.9047 64.0507 44.522ZM64.6527 44.515C64.6527 44.8183 64.697 45.0983 64.7857 45.355C64.879 45.6117 65.0074 45.8333 65.1707 46.02C65.334 46.2067 65.5254 46.3513 65.7447 46.454C65.9687 46.5567 66.2137 46.608 66.4797 46.608C66.7457 46.608 66.9884 46.5567 67.2077 46.454C67.4317 46.3513 67.6254 46.2067 67.7887 46.02C67.952 45.8333 68.078 45.6117 68.1667 45.355C68.26 45.0983 68.3067 44.8183 68.3067 44.515C68.3067 44.2117 68.26 43.934 68.1667 43.682C68.078 43.4253 67.952 43.2037 67.7887 43.017C67.6254 42.8303 67.4317 42.6857 67.2077 42.583C66.9884 42.4803 66.7457 42.429 66.4797 42.429C66.2137 42.429 65.9687 42.4803 65.7447 42.583C65.5254 42.6857 65.334 42.8303 65.1707 43.017C65.0074 43.2037 64.879 43.4253 64.7857 43.682C64.697 43.934 64.6527 44.2117 64.6527 44.515ZM69.3471 47L71.3491 42.03H71.9721L73.9741 47H73.3441L72.7911 45.586H70.5091L69.9561 47H69.3471ZM70.7191 45.047H72.5741L71.6501 42.681L70.7191 45.047ZM74.8213 47V42.03H76.1723C76.5503 42.03 76.877 42.0907 77.1523 42.212C77.4323 42.3333 77.647 42.506 77.7963 42.73C77.9456 42.954 78.0203 43.2177 78.0203 43.521C78.0203 43.8337 77.934 44.109 77.7613 44.347C77.5933 44.585 77.3576 44.7647 77.0543 44.886L78.2583 47H77.5723L76.4943 45.04C76.4336 45.0447 76.366 45.0493 76.2913 45.054C76.2213 45.0587 76.149 45.061 76.0743 45.061C75.981 45.061 75.876 45.0563 75.7593 45.047C75.6473 45.0377 75.5306 45.0237 75.4093 45.005V47H74.8213ZM75.4093 42.555V44.48C75.5166 44.4987 75.631 44.5127 75.7523 44.522C75.8783 44.5313 75.9926 44.536 76.0953 44.536C76.52 44.536 76.8466 44.4497 77.0753 44.277C77.304 44.1043 77.4183 43.8617 77.4183 43.549C77.4183 43.2363 77.3086 42.9937 77.0893 42.821C76.87 42.6437 76.5643 42.555 76.1723 42.555H75.4093ZM79.1586 47V42.03H80.8036C81.2002 42.03 81.5596 42.0883 81.8816 42.205C82.2082 42.3217 82.4859 42.4897 82.7146 42.709C82.9479 42.9237 83.1252 43.1827 83.2466 43.486C83.3726 43.7893 83.4356 44.1277 83.4356 44.501C83.4356 44.879 83.3726 45.222 83.2466 45.53C83.1252 45.8333 82.9479 46.0947 82.7146 46.314C82.4859 46.5333 82.2106 46.7037 81.8886 46.825C81.5666 46.9417 81.2072 47 80.8106 47H79.1586ZM79.7466 46.461H80.7896C81.1022 46.461 81.3846 46.4167 81.6366 46.328C81.8886 46.2347 82.1032 46.104 82.2806 45.936C82.4579 45.7633 82.5932 45.558 82.6866 45.32C82.7846 45.082 82.8336 44.8137 82.8336 44.515C82.8336 44.2163 82.7846 43.948 82.6866 43.71C82.5932 43.472 82.4556 43.269 82.2736 43.101C82.0962 42.9283 81.8816 42.7977 81.6296 42.709C81.3822 42.6157 81.1022 42.569 80.7896 42.569H79.7466V46.461Z" />
                        <line
                            x1="-8.74228e-08"
                            y1="55"
                            x2="125"
                            y2="55"
                            className={
                                history.location.pathname.split('/')[1] ===
                                    'dashboard'
                                    ? `${styles.lineHover}`
                                    : `${styles.line}`
                            }
                        />
                    </svg>
                </Col>
                <Col
                    xs={4}
                    className={
                        history.location.pathname === '/dead-chicken'
                            ? `${styles.tabActive}`
                            : `${styles.tab}`
                    }
                    onClick={() => history.push('/dead-chicken')}
                >
                    <svg
                        width="125"
                        height="56"
                        viewBox="0 0 125 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line
                            x1="-8.74228e-08"
                            y1="55"
                            x2="125"
                            y2="55"
                            className={
                                history.location.pathname === '/dead-chicken'
                                    ? `${styles.lineHover}`
                                    : `${styles.line}`
                            }
                        />
                        <path d="M36.1977 47V42.03H37.8427C38.2394 42.03 38.5987 42.0883 38.9207 42.205C39.2474 42.3217 39.525 42.4897 39.7537 42.709C39.987 42.9237 40.1644 43.1827 40.2857 43.486C40.4117 43.7893 40.4747 44.1277 40.4747 44.501C40.4747 44.879 40.4117 45.222 40.2857 45.53C40.1644 45.8333 39.987 46.0947 39.7537 46.314C39.525 46.5333 39.2497 46.7037 38.9277 46.825C38.6057 46.9417 38.2464 47 37.8497 47H36.1977ZM36.7857 46.461H37.8287C38.1414 46.461 38.4237 46.4167 38.6757 46.328C38.9277 46.2347 39.1424 46.104 39.3197 45.936C39.497 45.7633 39.6324 45.558 39.7257 45.32C39.8237 45.082 39.8727 44.8137 39.8727 44.515C39.8727 44.2163 39.8237 43.948 39.7257 43.71C39.6324 43.472 39.4947 43.269 39.3127 43.101C39.1354 42.9283 38.9207 42.7977 38.6687 42.709C38.4214 42.6157 38.1414 42.569 37.8287 42.569H36.7857V46.461ZM41.5262 47V42.03H44.3892V42.555H42.1142V44.151H44.1932V44.683H42.1142V46.468H44.4592V47H41.5262ZM45.2187 47L47.2207 42.03H47.8437L49.8457 47H49.2157L48.6627 45.586H46.3807L45.8277 47H45.2187ZM46.5907 45.047H48.4457L47.5217 42.681L46.5907 45.047ZM50.6929 47V42.03H52.3379C52.7346 42.03 53.0939 42.0883 53.4159 42.205C53.7426 42.3217 54.0202 42.4897 54.2489 42.709C54.4822 42.9237 54.6596 43.1827 54.7809 43.486C54.9069 43.7893 54.9699 44.1277 54.9699 44.501C54.9699 44.879 54.9069 45.222 54.7809 45.53C54.6596 45.8333 54.4822 46.0947 54.2489 46.314C54.0202 46.5333 53.7449 46.7037 53.4229 46.825C53.1009 46.9417 52.7416 47 52.3449 47H50.6929ZM51.2809 46.461H52.3239C52.6366 46.461 52.9189 46.4167 53.1709 46.328C53.4229 46.2347 53.6376 46.104 53.8149 45.936C53.9922 45.7633 54.1276 45.558 54.2209 45.32C54.3189 45.082 54.3679 44.8137 54.3679 44.515C54.3679 44.2163 54.3189 43.948 54.2209 43.71C54.1276 43.472 53.9899 43.269 53.8079 43.101C53.6306 42.9283 53.4159 42.7977 53.1639 42.709C52.9166 42.6157 52.6366 42.569 52.3239 42.569H51.2809V46.461ZM59.8696 47.14C59.529 47.14 59.214 47.077 58.9246 46.951C58.64 46.8203 58.3903 46.6407 58.1756 46.412C57.9656 46.1787 57.8023 45.9057 57.6856 45.593C57.569 45.2757 57.5106 44.9303 57.5106 44.557C57.5106 44.2537 57.548 43.969 57.6226 43.703C57.702 43.4323 57.8116 43.1873 57.9516 42.968C58.0963 42.744 58.2643 42.5527 58.4556 42.394C58.6516 42.2307 58.8686 42.107 59.1066 42.023C59.3446 41.9343 59.5966 41.89 59.8626 41.89C60.1613 41.89 60.439 41.9413 60.6956 42.044C60.957 42.1467 61.1856 42.2913 61.3816 42.478C61.5823 42.6647 61.7363 42.8887 61.8436 43.15L61.3046 43.353C61.16 43.059 60.9616 42.8327 60.7096 42.674C60.4623 42.5107 60.1823 42.429 59.8696 42.429C59.6176 42.429 59.3843 42.4827 59.1696 42.59C58.9596 42.6973 58.7753 42.8467 58.6166 43.038C58.458 43.2293 58.3343 43.4533 58.2456 43.71C58.157 43.9667 58.1126 44.2467 58.1126 44.55C58.1126 44.8487 58.1546 45.124 58.2386 45.376C58.3273 45.6233 58.451 45.8403 58.6096 46.027C58.7683 46.209 58.955 46.3513 59.1696 46.454C59.389 46.552 59.627 46.601 59.8836 46.601C60.2056 46.601 60.4903 46.5217 60.7376 46.363C60.9896 46.2043 61.195 45.9757 61.3536 45.677L61.8926 45.88C61.7806 46.1413 61.6243 46.3677 61.4236 46.559C61.223 46.7457 60.9896 46.8903 60.7236 46.993C60.4576 47.091 60.173 47.14 59.8696 47.14ZM62.8844 47V42.03H63.4724V44.144H66.2304V42.03H66.8184V47H66.2304V44.683H63.4724V47H62.8844ZM68.0488 47V42.03H68.6368V47H68.0488ZM72.0474 47.14C71.7068 47.14 71.3918 47.077 71.1024 46.951C70.8178 46.8203 70.5681 46.6407 70.3534 46.412C70.1434 46.1787 69.9801 45.9057 69.8634 45.593C69.7468 45.2757 69.6884 44.9303 69.6884 44.557C69.6884 44.2537 69.7258 43.969 69.8004 43.703C69.8798 43.4323 69.9894 43.1873 70.1294 42.968C70.2741 42.744 70.4421 42.5527 70.6334 42.394C70.8294 42.2307 71.0464 42.107 71.2844 42.023C71.5224 41.9343 71.7744 41.89 72.0404 41.89C72.3391 41.89 72.6168 41.9413 72.8734 42.044C73.1348 42.1467 73.3634 42.2913 73.5594 42.478C73.7601 42.6647 73.9141 42.8887 74.0214 43.15L73.4824 43.353C73.3378 43.059 73.1394 42.8327 72.8874 42.674C72.6401 42.5107 72.3601 42.429 72.0474 42.429C71.7954 42.429 71.5621 42.4827 71.3474 42.59C71.1374 42.6973 70.9531 42.8467 70.7944 43.038C70.6358 43.2293 70.5121 43.4533 70.4234 43.71C70.3348 43.9667 70.2904 44.2467 70.2904 44.55C70.2904 44.8487 70.3324 45.124 70.4164 45.376C70.5051 45.6233 70.6288 45.8403 70.7874 46.027C70.9461 46.209 71.1328 46.3513 71.3474 46.454C71.5668 46.552 71.8048 46.601 72.0614 46.601C72.3834 46.601 72.6681 46.5217 72.9154 46.363C73.1674 46.2043 73.3728 45.9757 73.5314 45.677L74.0704 45.88C73.9584 46.1413 73.8021 46.3677 73.6014 46.559C73.4008 46.7457 73.1674 46.8903 72.9014 46.993C72.6354 47.091 72.3508 47.14 72.0474 47.14ZM75.0622 47V42.03H75.6502V44.277L77.9322 42.03H78.7022L76.2942 44.375L78.9542 47H78.1072L75.6502 44.557V47H75.0622ZM79.7344 47V42.03H82.5974V42.555H80.3224V44.151H82.4014V44.683H80.3224V46.468H82.6674V47H79.7344ZM83.7982 47V42.03H84.3162L87.0882 46.013V42.03H87.6622V47H87.1442L84.3722 43.017V47H83.7982Z" />
                        <path d="M74.997 13.0937C74.997 12.0004 73.7258 12.0004 73.7258 12.0004C73.7258 12.0004 74.997 12.0004 74.997 10.6384C74.997 9.27645 73.4681 9.54885 73.4681 9.54885C73.5339 9.08187 73.4415 8.60507 73.2077 8.2047C72.974 7.80433 72.6142 7.50682 72.1934 7.36598C70.682 6.82119 70.682 15.2728 65.0714 16.9109C59.4609 18.549 54.8917 14.1832 55.1459 9.54885C55.1459 9.54885 56.6713 9.27272 56.6713 7.91076C56.6713 7.91076 56.1628 6.5488 54.6374 7.36598C54.6374 7.36598 55.4001 6.00028 54.3797 5.18311C53.3593 4.36593 52.6001 6.5488 52.6001 6.5488C52.6001 6.5488 51.8374 4.62713 50.5627 5.4555C50.5627 5.4555 49.8 6.00028 50.3085 7.09358C50.3085 7.09358 48.5289 6.82119 48.5289 7.91076C48.5289 7.91076 48.0169 9.00033 49.8 9.54885C49.8 9.54885 50.5627 10.366 48.7831 10.6384L47 11.4556L49.7861 13.0937C49.7861 13.0937 48.003 22.6386 52.3319 27.273C52.3319 27.273 55.8947 31.0902 58.4405 30.5454C58.4405 30.5454 58.1862 33.5306 60.4743 33.8179V36.0008C59.5155 35.8722 58.5429 36.0624 57.6882 36.5455C57.6882 36.5455 57.4305 36.8179 57.9425 37.0903C57.9425 37.0903 60.4848 36.8179 60.4848 36.5455H61.5052C61.5052 36.5455 62.7764 37.0903 63.5391 36.8179C63.5391 36.8179 64.051 36.5455 63.0306 36.2732C62.6033 35.8942 62.0593 35.6999 61.5052 35.7284V33.8179C61.5052 33.8179 62.7764 34.0903 63.2848 32.4559C63.4285 31.8297 63.5137 31.1897 63.5391 30.5454C65.1114 30.5313 66.6559 30.0991 68.0339 29.2876C69.4119 28.4762 70.5803 27.3108 71.4342 25.8961C71.4342 25.8961 72.9631 24.5454 73.4681 19.3662C73.4681 19.3662 74.9935 19.3662 74.9935 18.0005C75.0105 17.8465 74.9942 17.6903 74.9458 17.5441C74.8975 17.398 74.8184 17.2656 74.7147 17.1574C74.611 17.0492 74.4855 16.968 74.3478 16.9201C74.2102 16.8722 74.0641 16.8588 73.9208 16.8811C74.2269 16.8488 74.5095 16.691 74.7094 16.4406C74.9093 16.1903 75.0111 15.8667 74.9935 15.5377C74.9935 15.5377 74.9935 14.4482 73.7223 14.4482C73.7258 14.4556 74.997 14.1832 74.997 13.0937Z" />
                        <path
                            d="M51.4329 8.38843L52.9329 9.88845"
                            stroke="white"
                            strokeWidth="0.5"
                            strokeMiterlimit="10"
                        />
                        <path
                            d="M51.4329 9.88845L52.9329 8.38843"
                            stroke="white"
                            strokeWidth="0.5"
                            strokeMiterlimit="10"
                        />
                    </svg>
                </Col>
                <Col
                    xs={4}
                    className={
                        history.location.pathname === '/daily-data'
                            ? `${styles.tabActive}`
                            : `${styles.tab}`
                    }
                    onClick={() => history.push('/daily-data')}
                >
                    <svg
                        width="125"
                        height="56"
                        viewBox="0 0 125 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line
                            x1="-8.74228e-08"
                            y1="55"
                            x2="125"
                            y2="55"
                            className={
                                history.location.pathname === '/daily-data'
                                    ? `${styles.lineHover}`
                                    : `${styles.line}`
                            }
                        />
                        <path d="M67.2749 21.0312C67.2749 20.4272 66.7852 19.9375 66.1812 19.9375H54.9155C54.3114 19.9375 53.8218 20.4272 53.8218 21.0312C53.8218 21.6353 54.3114 22.125 54.9155 22.125H66.1812C66.7852 22.125 67.2749 21.6353 67.2749 21.0312Z" />
                        <path d="M54.9155 24.3125C54.3114 24.3125 53.8218 24.8022 53.8218 25.4062C53.8218 26.0103 54.3114 26.5 54.9155 26.5H61.7575C62.3616 26.5 62.8513 26.0103 62.8513 25.4062C62.8513 24.8022 62.3616 24.3125 61.7575 24.3125H54.9155Z" />
                        <path d="M57.4859 34.8125H53.8279C52.6217 34.8125 51.6404 33.8312 51.6404 32.625V13.375C51.6404 12.1688 52.6217 11.1875 53.8279 11.1875H67.2749C68.4811 11.1875 69.4624 12.1688 69.4624 13.375V20.1016C69.4624 20.7056 69.9521 21.1953 70.5562 21.1953C71.1603 21.1953 71.6499 20.7056 71.6499 20.1016V13.375C71.6499 10.9626 69.6873 9 67.2749 9H53.8279C51.4155 9 49.4529 10.9626 49.4529 13.375V32.625C49.4529 35.0374 51.4155 37 53.8279 37H57.4859C58.09 37 58.5796 36.5103 58.5796 35.9062C58.5796 35.3022 58.09 34.8125 57.4859 34.8125Z" />
                        <path d="M73.5873 24.8359C72.308 23.5565 70.2263 23.5565 68.9478 24.835L62.9429 30.8266C62.8154 30.9538 62.7213 31.1105 62.669 31.2829L61.3612 35.5882C61.2453 35.9699 61.3463 36.3844 61.6249 36.6699C61.8335 36.8838 62.1171 36.9999 62.4078 36.9999C62.5051 36.9999 62.6033 36.9869 62.6997 36.9601L67.1144 35.7373C67.2961 35.687 67.4617 35.5905 67.5951 35.4573L73.5874 29.4763C74.8667 28.197 74.8667 26.1153 73.5873 24.8359ZM66.2533 33.706L64.0323 34.3212L64.6823 32.1813L68.734 28.1386L70.2811 29.6857L66.2533 33.706ZM72.0414 27.9289L71.8294 28.1404L70.2826 26.5935L70.4938 26.3828C70.9203 25.9563 71.6141 25.9563 72.0406 26.3828C72.467 26.8092 72.467 27.5031 72.0414 27.9289Z" />
                        <path d="M66.1812 15.5625H54.9155C54.3114 15.5625 53.8218 16.0522 53.8218 16.6562C53.8218 17.2603 54.3114 17.75 54.9155 17.75H66.1812C66.7852 17.75 67.2749 17.2603 67.2749 16.6562C67.2749 16.0522 66.7852 15.5625 66.1812 15.5625Z" />
                        <path d="M35.2237 47V42.03H38.0237V42.569H35.8117V44.277H37.8207V44.816H35.8117V47H35.2237ZM39.0756 47V42.03H39.6636V47H39.0756ZM40.8973 47V42.03H41.4853V46.461H43.6973V47H40.8973ZM44.715 47V42.03H45.303V46.461H47.515V47H44.715ZM50.204 47V42.03H51.849C52.2457 42.03 52.605 42.0883 52.927 42.205C53.2537 42.3217 53.5313 42.4897 53.76 42.709C53.9933 42.9237 54.1707 43.1827 54.292 43.486C54.418 43.7893 54.481 44.1277 54.481 44.501C54.481 44.879 54.418 45.222 54.292 45.53C54.1707 45.8333 53.9933 46.0947 53.76 46.314C53.5313 46.5333 53.256 46.7037 52.934 46.825C52.612 46.9417 52.2527 47 51.856 47H50.204ZM50.792 46.461H51.835C52.1477 46.461 52.43 46.4167 52.682 46.328C52.934 46.2347 53.1487 46.104 53.326 45.936C53.5033 45.7633 53.6387 45.558 53.732 45.32C53.83 45.082 53.879 44.8137 53.879 44.515C53.879 44.2163 53.83 43.948 53.732 43.71C53.6387 43.472 53.501 43.269 53.319 43.101C53.1417 42.9283 52.927 42.7977 52.675 42.709C52.4277 42.6157 52.1477 42.569 51.835 42.569H50.792V46.461ZM54.9219 47L56.9239 42.03H57.5469L59.5489 47H58.9189L58.3659 45.586H56.0839L55.5309 47H54.9219ZM56.2939 45.047H58.1489L57.2249 42.681L56.2939 45.047ZM60.3961 47V42.03H60.9841V47H60.3961ZM62.2177 47V42.03H62.8057V46.461H65.0177V47H62.2177ZM66.6682 47V44.998L64.9182 42.03H65.5902L66.9692 44.466L68.3482 42.03H69.0062L67.2562 44.998V47H66.6682ZM71.4903 47V42.03H73.1353C73.5319 42.03 73.8913 42.0883 74.2133 42.205C74.5399 42.3217 74.8176 42.4897 75.0463 42.709C75.2796 42.9237 75.4569 43.1827 75.5783 43.486C75.7043 43.7893 75.7673 44.1277 75.7673 44.501C75.7673 44.879 75.7043 45.222 75.5783 45.53C75.4569 45.8333 75.2796 46.0947 75.0463 46.314C74.8176 46.5333 74.5423 46.7037 74.2203 46.825C73.8983 46.9417 73.5389 47 73.1423 47H71.4903ZM72.0783 46.461H73.1213C73.4339 46.461 73.7163 46.4167 73.9683 46.328C74.2203 46.2347 74.4349 46.104 74.6123 45.936C74.7896 45.7633 74.9249 45.558 75.0183 45.32C75.1163 45.082 75.1653 44.8137 75.1653 44.515C75.1653 44.2163 75.1163 43.948 75.0183 43.71C74.9249 43.472 74.7873 43.269 74.6053 43.101C74.4279 42.9283 74.2133 42.7977 73.9613 42.709C73.7139 42.6157 73.4339 42.569 73.1213 42.569H72.0783V46.461ZM76.2082 47L78.2102 42.03H78.8332L80.8352 47H80.2052L79.6522 45.586H77.3702L76.8172 47H76.2082ZM77.5802 45.047H79.4352L78.5112 42.681L77.5802 45.047ZM82.3898 47V42.569H80.8708V42.03H84.4968V42.569H82.9778V47H82.3898ZM84.5341 47L86.5361 42.03H87.1591L89.1611 47H88.5311L87.9781 45.586H85.6961L85.1431 47H84.5341ZM85.9061 45.047H87.7611L86.8371 42.681L85.9061 45.047Z" />
                    </svg>
                </Col>
            </Row>
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
