import React from "react";
import{LeftArrowSvg, RightArrowSvg} from "../components/Svgs";
import { connect } from "react-redux";

class CartItem extends React.Component {
    render() {
            return  <div className="cart-items">       
                    <div>
                        <h2>{this.props.data.product.brand}</h2>
                        <h3>{this.props.data.product.name}</h3>
                        <h3 className="price-tag">{this.props.currencySymbol} {this.props.amount}</h3>

                        {this.props.data.product.attributes.map((attribute, index)=> attribute.type === "text" ? (<section key={attribute.id}>
                        <label className="item-label">{attribute.name.toUpperCase()}:</label>
                        <div className="cartitem-sizes-container">
                        {
                        attribute.items.map((attributeItem)=> 
                        <div className="size-box" key={attributeItem.value}>
                        <input className="size-input" name={attribute.id} type="checkbox" value={attributeItem.value} checked={this.props.item.attributes[index][1]===attributeItem.value && true} onChange={()=>null}/>             
                        <span className="size-text">{attributeItem.value}</span>
                        </div>
                        
                    )}
                    </div>
                    </section>)
                    : 
                   null )}

                    {this.props.data.product.attributes.map((attribute, index)=> attribute.type === "swatch" ? (<section key={attribute.id}>
                        <label className="item-label">COLOR:</label>
                        <div className="cartitem-colors-container">
                        {attribute.items.map((attributeItem)=> 
                        <div className="color-box" key={attributeItem.value}>
                        <input className="size-input" key={attributeItem.value} name={attribute.id} type="checkbox" value={attributeItem.value} checked={this.props.item.attributes[index][1]===attributeItem.value && true} onChange={()=>null}/> 
                        <span className="color-text" style={{backgroundColor: attributeItem.value, boxShadow: attributeItem.value === '#FFFFFF'? '0 0 20px #ccc': null}}></span>
                        </div>
                    )}
                    </div>
                    </section>)
                    : 
                    null )} 

                    </div>
                    <div className="cartitem-modifier">
                    <div className="quantity-selector">
                        <div onClick={this.props.increase} className="quantity-increase" id={this.props.keystone}>+</div>
                        <div className="quantity" id={this.props.id2}>{this.props.value}</div>
                        <div onClick={this.props.decrease} className="quantity-decrease" id={this.props.keystone}>-</div>
                    </div>

                    <div className="thumbnail-area">
                        <img src={this.props.data.product.gallery[this.props.thumbnail]} alt="product"/>
                        {this.props.data.product.gallery.length > 1 && 
                        <div className="thumbnail-container">
                            <div className="thumbnail-box" >            
                                <input className="thumbnail-input" name="imageCollection" onClick={this.props.checkleft} type="checkbox" />
                                <LeftArrowSvg/>
                            </div>
                        
                            <div className="thumbnail-box" >            
                                <input className="thumbnail-input" name="imageCollection" onClick={this.props.checkright} type="checkbox"/>
                                <RightArrowSvg/>
                            </div>
                        </div>
                          }
                    </div>
                    </div>
            </div>
    }
}



const mapStateToProps = state => ({products: state.products, 
    currency: state.currency})


export default connect(mapStateToProps)(CartItem);