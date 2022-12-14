import React from "react";
import {AddtoCartSvg, OpenAttributesSvg} from "../Svgs";
import { NavLink } from "react-router-dom";
import MiniProductAttributes from "../Product/MiniProductAttributes"

class ProductCard extends React.Component {

    render() {
        return <>
        {
            this.props.products.attributes.length > 0 || this.props.inStock ? 
            
            <div className="product-card-container">
            <div className={`product-card ${this.props.inStock}`}>
            <input type="checkbox" className="quickshop-input"/>
            < OpenAttributesSvg />
            <MiniProductAttributes
            product={this.props.products}
            />    
            
                
                <div className={`product-display`}>
                    <NavLink to={this.props.url}><img src={this.props.photo} alt="product" /> </NavLink>          
                </div> 
                <div className="product-card-title">
                <p><NavLink to={this.props.url}>{this.props.brand} {this.props.name}</NavLink></p>
                <h3>{this.props.currencySymbol} {this.props.amount}</h3>
                </div>       
            </div>
        </div>:
        <div className="product-card-container">
        <div className={`product-card ${this.props.inStock}`}>
             
            <div className={`product-display`}><NavLink to={this.props.url}><img src={this.props.photo} alt="product" /> </NavLink>              
            < AddtoCartSvg AddtoCart={this.props.AddItemToCart} iden={this.props.identity}/>
            </div> 
            <div className="product-card-title">
            <p><NavLink to={this.props.url}>{this.props.brand} {this.props.name}</NavLink></p>
            <h3>{this.props.currencySymbol} {this.props.amount}</h3>
            </div>       
        </div>
    </div>
        }

    </>
    }
}

export default ProductCard;