import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import AddRouteForm from "./addRouteForm";


export const NewRouteModal = () => {

    const [show, setShow] = useState(false)


    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    return (
        <>
            {show ?
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    size="lg"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add new path</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                                    <AddRouteForm setShow={setShow}/>
                        <Button onClick={handleClose} variant="primary">Cancel</Button>
                    </Modal.Body>
                </Modal>
                :
                <button className="btn btn-outline-primary" onClick={handleShow}>create new route</button>
            }
        </>
    )
}
