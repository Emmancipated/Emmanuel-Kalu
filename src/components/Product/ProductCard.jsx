import React from "react";
import {AddtoCartSvg} from "../Svgs";
import { NavLink } from "react-router-dom";

class ProductCard extends React.Component {

    render() {
        return <>
        <div className={`product-card ${this.props.inStock}`}>
                 
                <div className={`product-display`}><NavLink to={this.props.url}><img src={this.props.photo} alt="product" /> </NavLink>              
                < AddtoCartSvg AddtoCart={this.props.AddItemToCart} iden={this.props.identity}/>
                </div> 
                <div className="product-card-title">
                <p><NavLink to={this.props.url}>{this.props.brand} {this.props.name}</NavLink></p>
                <h3>{this.props.currencySymbol} {this.props.amount}</h3>
                </div>       
        </div>
    </>
    }
}

export default ProductCard;