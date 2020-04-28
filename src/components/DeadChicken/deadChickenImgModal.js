import React, { useContext } from 'react';

import Button from 'react-bootstrap/Button';
import { Context } from '../../Store';
import Modal from 'react-bootstrap/Modal';
import styles from './deadChickenImgModal.module.scss';

function ImgModal(props) {
    const { state, dispatch } = useContext(Context);

    return (
        <>
            <Modal show={props.isShow} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {'Zone ' + state.deadChickenLocation.Zone}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center">
                    <img
                        src={
                            state.deadChickenMap[state.deadChickenLocation.cid]
                                .url
                        }
                        alt="DeadChicken"
                        className={`img-fluid ${styles.img}`}
                        // style={{ minWidth: '20rem', height: 'auto' }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={props.handleClose}>
                        Refresh
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ImgModal;
