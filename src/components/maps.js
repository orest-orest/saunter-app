import React, {useEffect, useState} from "react";
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import {useLoadScript,
    GoogleMap,
    Marker,
    InfoWindow, Polyline, DirectionsRenderer, DirectionsService} from '@react-google-maps/api'
// import { compose, withProps } from "recompose"

const libraries = ["places", "directions"]
const mapContainerStyle={
    width: '100%',
    height: '100%'
}

const center={
    lat: 40.7127281,
    lng: -74.0060152
}

export const Maps = ({update, getState, markersProps}) => {

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyDohG1kfHLVrzliksUrPh1Q0V7WBJMajT8',
        libraries
    })

    const [markers, setMarkers] = useState([])

    useEffect(() => {
        if (getState === false) {return}
        update(markers)
    }, [getState])

    useEffect(() => {
        if (markersProps.length === 0) {return}
        setMarkers(markersProps)
    }, [markersProps])

    // const [response, setResponse] = React.useState(null);

    // const directionsCallback = (response) => {
    //     console.log(response);
    //
    //     if (response !== null) {
    //         if (response.status === "OK") {
    //             setResponse(response);
    //         } else {
    //             console.log("response: ", response);
    //         }
    //     }
    // };

    // const DirectionsServiceOption = {
    //     origin: '190 Main Street, Ottawa, Canada',
    //     destination: '290 First Avenue, Ottawa, Canada',
    //     travelMode: "DRIVING",
    // };

    if(loadError) return 'Error loaded map'
    if(!isLoaded) return 'Loading maps'

    return (
        <>
        <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={ markersProps.length === 0 ? center : {lat: markersProps[0].lat, lng: markersProps[0].lng,}}
        onClick={markersProps.length === 0 ? (event)=> {
            setMarkers(current => [
                ...current,
                {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                    time: new Date()
                }
                ]
            )
        } : null}
        >
            {markers.map((marker, index, markers) => {
               return <Marker
                key={marker.time.toISOString()}
                position={{lat: marker.lat, lng: marker.lng}}
            >
            </Marker>})}
            <Polyline
                path={markers}
                geodesic={true}
                options={{
                    strokeColor: "#ff2527",
                    strokeOpacity: 0.75,
                    strokeWeight: 2,
                    icons: [
                        {
                            offset: "0",
                            repeat: "20px"
                        }
                    ]
                }}
            />
        </GoogleMap>
            </>
    )
}

