import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import SuccessIcon from '../../static/icon/success.svg';

function MySuccessCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column justify-content-center">
                    <img
                        src={SuccessIcon}
                        alt="success_icon"
                        className="mb-2"
                    />
                    <p className="text-center mb-0">{props.title}</p>
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex flex-column">
                <Button onClick={props.onHide}>OK</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MySuccessCenteredModal;
