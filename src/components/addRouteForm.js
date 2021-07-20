import React, {useEffect,  useState} from "react";
import Form from 'react-bootstrap/Form';
import {addNewRoute} from "../redux/actions/routeActions";
import {connect} from "react-redux";
import {Maps} from "./maps";
import Button from "react-bootstrap/Button"

const AddRouteForm = ({addNewRoute, setShow}) => {


    const [mapData, setMapDate] = useState(false)

    const [getState, setGetState] = useState(false)

    const [title, setTitle] = useState('')
    const [shortDescription, setShortDescription] = useState('')
    const [charCount, setCharCount] = useState(0)
    const [description, setDescription] = useState('')


    const handleShortDescription = (e) => {
        setCharCount(e.length)
        setShortDescription(e)
    }

    useEffect(()=> {
        if (mapData === false) { return}
        const favorite = false
        const id = new Date().valueOf()
        addNewRoute(
            {
                title: title,
                shortDescription: shortDescription,
                description: description,
                favorite: favorite,
                id: id,
                markers: mapData
            }
        )
        setShow(false)
    }, [mapData] )

    const handleCreateNewPath = () => {
        setGetState(true)
    }

    const updateFromMap = (data) => {
        setMapDate(data)
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <Form>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Text input"
                                              onChange={e => setTitle(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Short description</Form.Label>
                                <Form.Control as="textarea" rows={3} maxLength={160} placeholder="Text area"
                                              onChange={e => {
                                                  handleShortDescription(e.target.value)
                                              }}/>
                                <p>{`Limit ${charCount} of 160`}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Full description</Form.Label>
                                <Form.Control as="textarea" rows={5} placeholder="Text area"
                                              onChange={e => setDescription(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="col-sm-auto"></div>
                    <div className="col">
                        <Maps
                            update={updateFromMap}
                            getState={getState}
                            markersProps={[]}
                        />
                    </div>
                </div>
            </div>

            <Button variant="secondary"
                    onClick={() => handleCreateNewPath()}
            >
                Add path
            </Button>
        </>
    )
}

const mapDispatchToProps = {
    addNewRoute
}

export default connect(null, mapDispatchToProps)(AddRouteForm)
