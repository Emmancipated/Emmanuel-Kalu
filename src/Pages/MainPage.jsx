import React from "react";
import Layout from "./Layout";

class MainPage extends React.Component {
    render() {
        return <Layout
        params={this.props}
        /> 
    }
}


export default MainPage;