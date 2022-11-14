import React from "react";

class ProductMainImage extends React.Component {

    render() {
        const {product, selectedImage} = this.props;
        return <div className="product-image">
        <img src={!selectedImage ? product.gallery[0] : selectedImage} 
        alt={!selectedImage ? product.gallery[0] : selectedImage} />
        </div>
    }
}


export default ProductMainImage;