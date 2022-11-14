import React from "react";

class ProductSideImages extends React.Component {
    render() {
        const {product, imageSelector} = this.props;
        return <div className="side-images" >
        {product.gallery.map((image)=> <img onClick={imageSelector} key={image} src={image} alt="product" />)}
        </div>
       
    }
    
}


  
export default ProductSideImages;