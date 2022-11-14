import React from "react";
import {BrowserRouter as Router, Route, Routes} from  "react-router-dom";
import { createClient, Provider } from "urql";
import { Provider as ReduxProvider } from "react-redux";
import store from "../redux/store";
import CartPage from "../Pages/CartPage";
import Layout from "../Pages/Layout";
import ProductPage from "../Pages/ProductPage";
import '../styles/styles.scss';
import Header from "./Header";
import Wrapper from "./Product/PCat";
import MainPage from "../Pages/MainPage";
import persistStore from "redux-persist/lib/persistStore";
import { PersistGate } from "redux-persist/integration/react";


let persistor = persistStore(store);

const localGraphQl = 'http://localhost:4000';

const client = new createClient({
    url: localGraphQl,
});


class App extends React.Component {

        render() {

        return (          
            <div className="App">
            <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <Provider value={client}>                
                <Router>
                    <Header/>
                    <Routes>
                        <Route exact path="/" element={<MainPage/>}/>
                        <Route exact path="/:categoryName" element={ <Wrapper routeElement={Layout} />}/>
                        <Route exact path="/:productCategory/:productID" element={<Wrapper routeElement={ProductPage} />}/>
                        <Route exact path="/cart" element={<CartPage />}/>  
                        {/* <Route exact path="/:pageCategory/cart" element={<Wrapper routeElement={CartPage}/>}/>   */}
                    </Routes>
                </Router>
            </Provider>
            </PersistGate>
            </ReduxProvider>
            </div>      
        );
    }
}
  
  export default App;