import React from "react";
import { Query } from "urql";
import { connect } from "react-redux";
import { 
  RemoveProduct,
  AddQuantity,
  RemoveQuantity,
  SelectCurrency,
  LeftImage, 
  RightImage,
 } from "../redux/actions";
import CartPageTotal from "../components/CartPageTotal";
import CartItem from "../components/CartItem";
import { getProduct } from "../graphql/graphqlReq";

class CartPage extends React.Component {

increment = (e) => {
    this.props.AddQuantity(e.target.id);
}

decrement = (e) => {
  this.props.RemoveQuantity(e.target.id);
}

imageSlideLeft = (iden, len) => {
  const {products} = this.props;
  let id = iden;
  let length = len;
  const item = products.find((product) => product.id === id)
  let itemImageIndex;
  let localImageSlide =item.imageSlide;
  if (localImageSlide === 0) {
      itemImageIndex = length - 1;
  } else {
      itemImageIndex = localImageSlide - 1;
  }
  this.props.LeftImage([id, itemImageIndex]);
}

imageSlideRight = (iden, len) => {
  const {products} = this.props;
  let id = iden;
  let length = len;
  const item = products.find((product) => product.id === id)
  let itemImageIndex;
  let localImageSlide =item.imageSlide;
  if (localImageSlide === length - 1) {
      itemImageIndex = 0;
  } else {
      itemImageIndex = localImageSlide + 1;
  }
  this.props.LeftImage([id, itemImageIndex]);   
}


    render() {
      const {products, currency} = this.props;      

      return  <div className="page-wrapper"> <h2 id="page-header">CART</h2>
        <div id="maincart">
        {products.map((item) => 
            
          <Query query={getProduct(item.name)} key={item.id}>
            {({fetching, error, data}) => {
              let amount;
              data && data.product.prices.map((price) => {   
                if (price.currency.symbol === '$') {
                  amount = price.amount
                  return price.amount;
                } else if (price.currency.symbol === currency[0]) {
                  amount = price.amount
                return price.amount;
                } 
                return price.amount;
                });

                if (fetching) return <p>Loading...</p>;
                if (error) return <p>Error: {error.message}</p>;

                return (
              <section className="cart-item-wrapper">
              <CartItem
                    name={item.name}
                    stateID={item.id}
                    data={data}
                    currencySymbol={currency.length < 1 ? '$' : currency[0]}
                    amount={(item.value * amount).toFixed(2)}
                    item={item}
                    increase={this.increment}
                    keystone={item.id}
                    value={item.value}
                    decrease={this.decrement}
                    thumbnail={item.imageSlide}
                    id2={item.value}
                    checkleft={()=> this.imageSlideLeft(item.id, data.product.gallery.length)}
                    checkright={()=> this.imageSlideRight(item.id, data.product.gallery.length)}
                      />
                </section>
            )}}     
          </Query>
            
          )}
          <CartPageTotal/>
        </div>
        </div>
    }
}

const mapStateToProps = state => ({products: state.products, 
  currency: state.currency})

const mapDispatchToProps = (dispatch) => ({
  AddQuantity: (product) => dispatch(AddQuantity(product)),
  RemoveQuantity: (product) => dispatch(RemoveQuantity(product)),
  RemoveProduct: (product) => dispatch(RemoveProduct(product)),
  LeftImage: (product) => dispatch(LeftImage(product)),
  RightImage: (product) => dispatch(RightImage(product)),
  SelectCurrency: (value) => dispatch(SelectCurrency(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);