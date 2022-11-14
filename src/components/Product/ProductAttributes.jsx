import React from "react";

class ProductAttributes extends React.Component {

    render() { return <>
         {this.props.product.attributes.map((attribute, ind)=> attribute.type === "text" ? (<div key={attribute.id}>
            <label className="item-label">{attribute.name.toUpperCase()}:</label>
            <div className="sizes-container">
                {attribute.items.map((attributeItem)=> 
                    <div className="size-box" key={attributeItem.value}>          
                    <input className="size-input" name={attribute.id}  onChange={this.props.selectAttributes} type="radio" value={attributeItem.value} />
                    <span className="size-text" >{attributeItem.value}</span>
                    </div>
                )}
                </div></div>)
                : 
               null )} 
            {this.props.product.attributes.map((attribute)=> attribute.type === "swatch" ? (<div key={attribute.id}>
            <label className="item-label">COLOR:</label>
            <div className="colors-container">
                {attribute.items.map((attributeItem)=> 
                    <div className="color-box" key={attributeItem.value}>            
                    <input className="color-input"  name={attribute.id} onChange={this.props.selectAttributes} type="radio" value={attributeItem.value} />
                    <span className="color-text"  style={{backgroundColor: attributeItem.value}}></span>
                    </div>
                )}
                </div></div>)
                : 
                null )}
                </>
    }
}

export default ProductAttributes;

