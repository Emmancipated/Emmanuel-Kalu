import React from "react";
import { useLocation, useParams } from "react-router-dom";

const Wrapper = (props) => {
    const params = useParams();
    const locations = useLocation();
    const Element = props.routeElement;
    return <Element params={params} locations={locations} {...props} />
}

export default Wrapper;