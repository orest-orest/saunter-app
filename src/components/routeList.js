import React, {useState} from "react";
import {connect, useDispatch} from "react-redux";
import {Maps} from "./maps";
import {setFavorite, deleteRoute} from "../redux/actions/routeActions";


const RouteList = ({list}) => {

    const [currentPath, setCurrentPath] = useState('')
    const [search, setSearch] = useState('')

    const dispatch = useDispatch()


    const handlePropsToMap = (item) => {
        setCurrentPath(item)
    }

    const handleSetFavorite = (item) => {
        let newObj = item
        newObj.favorite = !item.favorite
        dispatch(setFavorite(newObj))
    }

    const handleDelete = (item) => {
        dispatch(deleteRoute(item.id))
    }

    return (
        <div className="container-fluid h-100">
            <div className="row h-100">
                <div className="col-4">
                    <h1>Route List</h1>
                    <div className="input-group">
                        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                               aria-describedby="search-addon"
                               onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="btn-group-vertical w-100">
                        {list.length !== 0 ?
                            list
                                .sort(item => item.favorite ? -1 : 1)
                                .filter(item => item.title.toLowerCase().includes(search.toLowerCase())
                                    ||
                                    item.shortDescription.toLowerCase().includes(search.toLowerCase()))
                                .map((item, index) =>
                                    <>
                                        <button type="button" className="btn btn-outline-secondary mt-3" key={item.id}
                                                onClick={() => handlePropsToMap(item)}>
                                            <div className="" style={{height: '100%', width: '100%'}}>
                                                <h6>{item.title}</h6>
                                                <span className="text-normal"
                                                      style={{whiteSpace: 'normal'}}> {item.shortDescription}</span>
                                            </div>
                                        </button>
                                        <div className="btn-group w-100">
                                            <button type="button"
                                                    className={`btn btn-outline-secondary ${item.favorite && 'active'} col-2`}
                                                    key={index}
                                                    onClick={() => handleSetFavorite(item)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                                                    <path
                                                        d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                                </svg>
                                            </button>
                                            <button className="btn btn-danger col-2 ml-auto" type="button"
                                                    onClick={() => handleDelete(item)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path
                                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                    <path
                                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </>
                                )
                            :
                            <p>empty</p>
                        }
                    </div>
                </div>
                <div className="col-8">
                    {currentPath && <>
                        <h3>
                            Description
                        </h3>
                        <h3>
                            {currentPath.title}
                        </h3>
                        <p>{currentPath.description}</p>
                        <Maps update={false} getState={false} markersProps={currentPath.markers}/>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (({list}) => ({
    list: list.routeListItems
}))

const mapDispatchToProps = {
    setFavorite, deleteRoute
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteList)
