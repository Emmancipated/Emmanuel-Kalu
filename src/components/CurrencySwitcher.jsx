import React from "react";
import { Query } from "urql";
import { connect } from "react-redux";
import { SelectCurrency } from "../redux/actions";
import { getCurrencies } from "../graphql/graphqlReq";

class CurrencySwitcher extends React.Component {

    setCurrency = (e) => {
        this.props.SelectCurrency([e.target.id, e.target.className]);
    }
    render() {
        console.log(this.props);
        return <Query query={getCurrencies}>
            {({loading, error, data})=> {
                if(loading) return <p>loading...</p>
                if(error) return <p>{error.message}</p>
                if(data === undefined) return <p></p>
                const {currencies} = data;
                return <div className="currency-container">
                    {data && currencies.map((currency)=>
                        <h4 id={currency.symbol} className={currency.label} key={currency.label} onClick={this.setCurrency}>{currency.symbol} {currency.label}</h4>   
                    )}
                </div>
            }}
        </Query>                        
    }
}


const mapStateToProps = (state) => ({
    currency: state.currency,
    products: state.products,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    SelectCurrency: (value) => dispatch(SelectCurrency(value)),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
