import React, {useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {connect, useDispatch} from 'react-redux'
// import {addNewRoute} from "../redux/actions/routeActions";
import {Maps} from "./maps";
import AddRouteForm from "./addRouteForm";


export const NewRouteModal = () => {

    // const [formData, setFormData] = useState(false)
    // const [mapData, setMapData] = useState(false)
    const [show, setShow] = useState(false)
    // const [getState, setGetState] = useState(false)


    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    // const updateFromForm = (title, shortDescription, description, favorite, id) => {
    //     setFormData({
    //         title: title,
    //         shortDescription: shortDescription,
    //         description: description,
    //         favorite: favorite,
    //         id: id
    //     })
    // }

    // const updateFromMap = (markers) => {
    //     setMapData(markers)
    // }

    // useEffect(() => {
    //     if (!formData || !mapData) {return}
    //     addNewRoute(
    //         {
    //             title: formData.title,
    //             shortDescription: formData.shortDescription,
    //             description: formData.description,
    //             favorite: formData.favorite,
    //             id: formData.id,
    //             markers: mapData,
    //         })
    //     setGetState(false)
    //     handleClose()
    // },[mapData])


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


// const mapDispatchToProps =  {
//     addNewRoute
// }
//
// export default connect(null, mapDispatchToProps)(NewRouteModal)
