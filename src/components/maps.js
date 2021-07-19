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
        googleMapsApiKey: 'AIzaSyCPWY7uVJEdJ1CyfzrEbDxgEKBOtwi1_V0',
        libraries
    })

    const [markers, setMarkers] = useState([])
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [waypts, setWaypts] = useState([])



    useEffect(() => {
        if (getState === false) {return}
        update(markers)
    }, [getState])

    useEffect(() => {
        if (markersProps.length === 0) {return}
        setMarkers(markersProps)
    }, [markersProps])

    useEffect(() => {
            setOrigin(markers[0])
            if (markers.length === 2) {
                setDestination(markers[markers.length - 1])
                count.current = 0
            } else if (markers.length > 2) {
                markers.map((item, index) => {
                    if (index !== 0 && index !== markers.length - 1) {
                        setWaypts([...waypts, {location: item, stopover: true}])
                    }
                })
                setDestination(markers[markers.length - 1])
                count.current = 0

            }
        count.current = 0
    }, [markers])

    const [response, setResponse] = React.useState(null);
    let count = React.useRef(0);

    const directionsCallback = res => {
        if (res !== null && count.current < 1) {
            if (res.status === 'OK') {
                count.current += 1;
                setResponse(res);
            } else  {
                count.current = 0;
                console.log('res: ', res);
        }
        }

    };

    // useEffect(() => {
    //
    // }, [response])

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
                    //time: new Date()
                }
                ]
            )
        } : null}
        >
            {/*{markers.map((marker, index, markers) => {*/}
            {/*   return <Marker*/}
            {/*    key={marker.time.toISOString()}*/}
            {/*    position={{lat: marker.lat, lng: marker.lng}}*/}
            {/*>*/}
            {/*</Marker>})}*/}
            {response !== null && (
                <DirectionsRenderer
                    // required
                    options={{
                        directions: response
                    }}
                />
            )}
            {/*{console.log(waypts, 'waypts')}*/}
            {/*{console.log(destination, 'destination')}*/}
            {/*{console.log(origin, 'origin')}*/}

            {destination && origin ?
                <DirectionsService
                options={{
                    destination: destination,
                    origin: origin,
                    waypoints: waypts,
                    travelMode: 'WALKING'
                }}
                callback={directionsCallback}
            /> : null}
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

