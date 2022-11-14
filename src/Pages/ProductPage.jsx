import React from "react";
import { Query } from "urql";
import { connect } from "react-redux";
import ProductSideImages from "../components/Product/ProductSideImages";
import ProductMainImage from "../components/Product/ProductMainImage";
import { AddProduct } from "../redux/actions";
import { nanoid } from "@reduxjs/toolkit";
import { getProduct } from "../graphql/graphqlReq";
import ProductAttributes from "../components/Product/ProductAttributes";

class ProductPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            id: "",
            value: 1,
            extra: [],
            amount: 0,
            price: 0,
            imageSlide: 0,
            selectedImage: "",
            attributes: [],
            showMore: false
          };

    }
   
    handleShowMore = () => {
        this.setState((prev) => {
            return { ...prev, showMore: !prev.showMore };
          });
    }

    onSubmit = (event) => {   
        const {products} = this.props;
        let copiedLocalState = {...this.state};// copied local state
        let deepStateCopy = JSON.parse(JSON.stringify(products));//copied the state of the app
        let items = deepStateCopy.filter(product => product.name === copiedLocalState.name);//filter copied state where name matches the copied state name
        let compare;
        let result;
        let filteredResult;

        if (items) {
        items.map((item)=> {
            return item.attributes.forEach((element, index) => {//a loop through both copied global state and local state
                 compare = copiedLocalState.attributes[index];
                 result = element[1] === compare[1] ? true : false; //compare the attribute value of both global and local state
                 item.extra.push(result); //push the boolean values results to the global copied state
                return element[1] === compare[1];              
             });
            
         })
        filteredResult = items.filter(product => !product.extra.includes(false))// exclude results that contains false
        }
        if(filteredResult && filteredResult.length < 1) {//when there was no such item, dispatch the local state
        this.props.AddProduct(this.state)
        } else {
        this.props.AddProduct(filteredResult[0].id) //else dispatch the id of the identified item in state, 
        }                                           //where the quantity will be increased by the reducer
        return this.state;   
    }

    selectAttributes = (e) => {
        let {attributes} = this.state; 
        let [copiedAttributes] = [attributes];// create an array of copied atributes of product
        let deepCopiedAttributes = JSON.parse(JSON.stringify(copiedAttributes));//deep copy of the local state attribute
        let selectedAtrribute = deepCopiedAttributes.find((attribute)=> attribute[0] === e.target.name);//find where attribute name equals target name
        if(selectedAtrribute) {
            selectedAtrribute[1] = e.target.value;//if yes, update 2nd index of copied attribute with target value
        } else {
            deepCopiedAttributes.push([e.target.name, e.target.value]); // if not, push both the target name and value to the copied attribute
        }
        deepCopiedAttributes.sort(); //sort the array alphabetically
        return this.setState({attributes: deepCopiedAttributes}) //update the local state with the selected attributes
    }

    imageSelector = (event) => {
        const img = event.target.src
        return this.setState({selectedImage: img})
    } 

    componentDidMount(){
        const {params} = this.props
        this.setState({name: params.productID, id: nanoid(),}) 
    }


    render() {
       const {selectedImage, showMore} = this.state;
       const { params, currency } = this.props;
       const {productID} = params;

        return <>
        <Query query={getProduct(productID)} >
            {({fetching, error, data}) => {
                if (fetching) return <p>Loading..</p>
                if (error) return <p>Error</p>
                const {product} = data;
                return (
                <div className="page-wrapper">
                  <div className="product-items">
                        <ProductSideImages
                            product={product}
                            imageSelector={this.imageSelector}       
                        />

                        <ProductMainImage
                            product={product}
                            selectedImage={selectedImage}
                        />

                        <div className="product-details">
                            <h2 className="product-brand">{data && product.brand}</h2>
                            <h3 className="product-name">{data && product.name}</h3>

                            <ProductAttributes
                            product={product}
                            selectAttributes={this.selectAttributes}
                            />
                        
                            <label className="item-label">PRICE:</label>
                            <h3 className="price-tag">{currency[0]} {data.product.prices.map((price) => price.currency.symbol === currency[0] ? price.amount : null)}</h3>

                            <div>
                            {product.inStock && this.state.attributes.length === product.attributes.length ?
                              
                            <button className="add-to-cart" onClick={this.onSubmit}>ADD TO CART</button>
                            : 
                            product.inStock && this.state.attributes !== product.attributes 
                            ? 
                            <button className="add-to-cart">SELECT ATTRIBUTES</button>
                            : 
                            <button className="add-to-cart">OUT OF STOCK</button>
                                }
                            </div>
                        
                            {!showMore && product.description.length > 350 
                            ? 
                            <div dangerouslySetInnerHTML={{__html: data.product.description.slice(0, 350) + '...'}}/>  
                            : 
                            <div dangerouslySetInnerHTML={{__html: data.product.description }}/>
                            }

                            {product.description.length > 300 && (
                            <button className="showmore" onClick={this.handleShowMore}>
                                {!showMore 
                                ? 
                                "Show more" 
                                : 
                                "Hide"}
                            </button>
                            )}
                        </div>
                  </div>
                </div>
                )
                }}
        </Query>
        </>
    }
}


const mapStateToProps = state => ({products: state.products, 
    currency: state.currency})

const mapDispatchToProps = (dispatch) => ({
    AddProduct: (product) => dispatch(AddProduct(product))
})


export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
    