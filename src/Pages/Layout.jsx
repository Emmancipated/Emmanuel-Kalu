import React from "react";
import { Query } from "urql";
import ProductCard from "../components/Product/ProductCard";
import { connect } from "react-redux";
import { AddProduct, TrackCategory } from "../redux/actions";
import { nanoid } from "@reduxjs/toolkit";
import { getAll, getCategory} from "../graphql/graphqlReq";

class Layout extends React.Component {
    constructor(props){
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
          showWarning: false,
          addedtoCart: false,
        };
        this.selectAttribute = this.selectAttribute.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }

    handleAddToCart(event){   
      this.setState({name: event, id: nanoid()})
      const {products} = this.props;
      let deepCopy = JSON.parse(JSON.stringify(products));//copy the global state 
      let items = deepCopy.filter(product => product.name === event)
      setTimeout(() => {
        if (items.length > 0) {
          this.props.AddProduct(items[0].id);          
        } else {
          this.props.AddProduct(this.state);
        } 
        this.setState({addedtoCart: true}) 
      },0)
      setTimeout(() => {
        this.setState({addedtoCart: false})
      }, 2000);
      
  }

    selectAttribute(e){
    if (e.target.id) {
      this.setState({showWarning: true,}) 
    }   
      setTimeout(() => {
        this.setState({showWarning: false}) ;
    }, 1500)
      return e;
    }

    handleCartoverlay = (e) => {
        this.setState(prevState => ({counter: prevState.counter + 1}));
    }

    render(){
        let {params, currency} = this.props;
        let {categoryName} = params;
        if (categoryName === undefined) {
          this.props.TrackCategory('all');
        }
               
        return <>

            <Query query={categoryName === undefined  ? getAll : getCategory(categoryName)}>
              {({fetching, error, data}) => {

                if (fetching) return <p>Loading...</p>;
                if (error) return <p>Error:{error.message}</p>;

                return <main className="page-wrapper">
                  {this.state.showWarning ? <p className="warning" >can't add to cart, open product to select attributes.</p> : null}
                  {this.state.addedtoCart ? <p className="addedtocart" >successfully added item to cart.</p> : null}
                  <h2 id="page-header" >{data && data.category.name.toUpperCase()}</h2>
                  <div className="main-page">
                  
                  {data.category.products.map((product)=>
                    < ProductCard 
                      url={`/${categoryName}/${product.id}`}
                      photo={product.gallery[0]}
                      name={product.name}
                      brand={product.brand}
                      currencySymbol={currency[0]}
                      amount={product.prices.map((price) => price.currency.symbol === currency[0] ? price.amount : null)}
                      key={product.id}
                      inStock={!product.inStock === true ? "instock-false": ""}
                      identity={product.id}
                      AddItemToCart={product.attributes.length > 0 ? this.selectAttribute: ()=> this.handleAddToCart(product.id)}
                      productId={product.id}
                    />                    
                  )}    
                              
                  </div>      
                </main>
              }}            
            </Query>
        </>
    }
    
}


const mapStateToProps = state => ({
  products: state.products, 
  currency: state.currency,
})

const mapDispatchToProps = (dispatch) => ({
    AddProduct: (product) => dispatch(AddProduct(product)),
    TrackCategory: (value) => dispatch(TrackCategory(value)),
})
  export default connect(mapStateToProps, mapDispatchToProps)(Layout);
