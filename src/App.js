import './App.css';
import RouteList from "./components/routeList";
import React, {useState} from "react";
import {NewRouteModal} from "./components/modalWindow";
// import    ExampleDirections from './components/maps'


const REACT_API_KEY = 'AIzaSyDohG1kfHLVrzliksUrPh1Q0V7WBJMajT8'


function App() {
    return (
        <div className="container-fluid" style={{height: '1000px'}}>
            <div className="row m-3">
                <h3 className="col">Saunter App</h3>
                <div className="col"/>
                <NewRouteModal/>
            </div>
            <div className="row justify-content-center h-75">
                <RouteList/>
                {/*<ExampleDirections/>*/}
            </div>
        </div>
    );
}

export default App;
