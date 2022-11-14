import React from "react";
import { connect } from "react-redux";

class CartOverlayItem extends React.Component {
    render() {
        const {currency} = this.props;
            return  <div className="cartoverlay-items">       
                    <div>
                        <h3>{this.props.data.product.brand}</h3>
                        <h3>{this.props.data.product.name}</h3>
                        <h3 className="price-tag">{currency[0]} {this.props.amount}</h3>

                        {this.props.data.product.attributes.map((attribute, index)=> attribute.type === "text" ? (<section key={attribute.id}>
                        <label className="item-label">{attribute.name.toUpperCase()}:</label>
                        <div className="cartitem-sizes-container">
                        {attribute.items.map((attributeItem)=> 
                        <div className="size-box" key={attributeItem.value}>            
                        <input className="cartoverlay-size-input" name={attribute.id} type="checkbox" value={attributeItem.value} checked={this.props.item.attributes[index][1]===attributeItem.value && true} onChange={()=>null}/>                     
                        <span className="cartoverlay-size-text">{attributeItem.value}</span>
                        </div>
                        
                    )}</div></section>)
                    : 
                   null )}

                    {this.props.data.product.attributes.map((attribute, index)=> attribute.type === "swatch" ? (<section key={attribute.id}>
                        <label className="item-label">COLOR:</label>
                        <div className="cartitem-colors-container">
                        {attribute.items.map((attributeItem)=> 
                        <div className="color-box" key={attributeItem.value}>  
                        <input className="cartoverlay-color-input" name={attribute.id} type="checkbox" value={attributeItem.value} checked={this.props.item.attributes[index][1]===attributeItem.value && true} onChange={()=>null}/>
                        <span className="cartoverlay-color-text" style={{backgroundColor: attributeItem.value}}></span>
                        </div>
                    )}</div></section>)
                    : 
                    null )} 

                    </div>
                    
                    <div className="cartitem-modifier">
                    <div className="quantity-selector">
                        <div onClick={this.props.increase} className="quantity-increase" id={this.props.buttonID}>+</div>
                        <div className="quantity" id={this.props.id2}>{this.props.value}</div>
                        <div onClick={this.props.decrease} className="quantity-decrease" id={this.props.buttonID}>-</div>
                    </div>

                    <div className="thumbnail-area">
                        <img src={this.props.data.product.gallery[0]} alt="product"/>
                    </div>
                    </div>
            </div>
    }
}



const mapStateToProps = state => ({products: state.products, 
    currency: state.currency})


export default connect(mapStateToProps)(CartOverlayItem);