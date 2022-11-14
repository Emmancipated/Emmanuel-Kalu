import React from "react";
import { Query } from "urql";
import { connect } from "react-redux";
import { pricesRequest } from "../graphql/graphqlReq";

class CartPageTotal extends React.Component {

    totalPrice = (items) => {
      const { products, currency } = this.props;
      let cartProducts = JSON.parse(JSON.stringify(products));

      cartProducts.map((product)=> {
        items && items.map((item)=> {
            let amount = item.prices.filter((price) => price.currency.symbol === currency[0]? price.amount: null) 
            if(product.name === item.id) {
                product.amount = amount[0].amount; //item.prices[0].amount
                let productPrice = product.amount * product.value;
                product.price = Math.round(productPrice * 100) / 100;
            }   
            return amount[0].amount;       
        })  
        return items;
      })
      
      let prices = cartProducts.map(({price})=> price)
      let total = prices.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
      return total;
    };
  
    render() {
      const {products, currency} = this.props;
      return (
        <Query query={pricesRequest}>
          {({ loading, error, data }) => {  
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error : </p>;
            const productName = products.map((product) => {
              return product.name;
            });
            
            let totalCount = 0;
            const productValues = products.map(({ value }) => value);

            productValues.forEach(count => {
                totalCount += count;
              });
           
            const items = data && data.category.products.filter(({ id }) => {
                return productName.includes(id);                  
            });   

            return (
                <div className="checkout-container">
                <p>Tax 21%: <strong>{currency[0]}{Math.round(this.totalPrice(items) * 21) / 100}</strong> </p>
                <p>Quantity: <strong>{totalCount}</strong></p>
                <h3>Total: <span>{currency[0]}{Math.round(this.totalPrice(items) * 100) / 100}</span></h3>
                <div ><button type="submit" className="add-to-cart">ORDER</button></div>
               </div>
            );            
          }}
        </Query>
      );
    }
  }
  
  const mapStateToProps = state => ({products: state.products, 
    currency: state.currency})
  export default connect(mapStateToProps)(CartPageTotal); 