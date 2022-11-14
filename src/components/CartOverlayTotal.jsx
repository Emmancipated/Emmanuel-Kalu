import React from "react";
import { Query } from "urql";
import { connect } from "react-redux";
import { pricesRequest } from "../graphql/graphqlReq";

class CartOverlayTotal extends React.Component {

    totalPrice = (items) => {
      const { products, currency } = this.props;
      let cartProducts = JSON.parse(JSON.stringify(products));
        // deep-copied the state, loop through state and price request data.
      cartProducts.map((product)=> {
        return items && items.map((item)=> {
            let amount = item.prices.filter((price) => price.currency.symbol === currency[0]? price.amount: null)
            //filtered for prices from fetched data that matches the current selected currency
            if(product.name === item.id) {
                product.amount = amount[0].amount; //append matched amounts to products of the copied state 
                let productPrice = product.amount * product.value //multiply the amount by the selected values to get total price for each product
                product.price = Math.round(productPrice * 100) / 100 //Round each total price
            }   
            return amount[0].amount;       
        })       
      })
      
      let prices = cartProducts.map(({price})=> price) //extract just the  total price for each product
      let total = prices.reduce((previousValue, currentValue) => previousValue + currentValue, 0) //accumulate those values to get the total for all items in cart/state
      return total;
    };
  
    render() {
      const {products, currency} = this.props;

      return (
        <Query query={pricesRequest}>
          {({ loading, error, data }) => {  
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error : </p>;

                //array of products in cart/state
            const productName = products.map((product) => {
              return product.name;
            });
                //array of products that contains the ids of items in cart/state
            const items = data && data.category.products.filter(({ id }) => {
                return productName.includes(id);                  
            });   

            return (<section>
                        <div className="total-box price-tag">
                            <h4>Total</h4>
                            <h4>{currency[0]}{Math.round(this.totalPrice(items) * 100) / 100}</h4>
                        </div>
                        <div className="checkout-box">
                            <div><a href="/cart" className="viewbag" >VIEW BAG</a></div>
                            <div ><a href="/" className="checkout">CHECKOUT</a></div>
                        </div>  
                   </section> 
            );            
          }}
        </Query>
      );
    }
  }
  
  const mapStateToProps = state => ({products: state.products, 
    currency: state.currency})
  export default connect(mapStateToProps)(CartOverlayTotal); 