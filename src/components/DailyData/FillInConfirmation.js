import Container from 'react-bootstrap/Container';
import React from 'react';
import congratTxt from '../../static/icon/congratTxt.svg';
import greenTickIcon from '../../static/icon/greentick.svg';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';
import viewHistoryBtnY from '../../static/icon/viewHistoryBtnYellow.svg';

export const FillInConfirmation = () => {
    const history = useHistory();
    const getReport = () => {
        history.push('/get-report');
    };
    return (
        <Container>
            <div className={styles.greenTick}>
                <img src={greenTickIcon} alt="greenTick_Icon" />
            </div>
            <div className={styles.congratTxt}>
                <img src={congratTxt} alt="congrat_Txt" class="center" />
            </div>
            <div class="text-center">
                <img
                    src={viewHistoryBtnY}
                    alt="viewHistory_BtnY"
                    class="center"
                    onClick={() => getReport()}
                />
            </div>
        </Container>
    );
};
