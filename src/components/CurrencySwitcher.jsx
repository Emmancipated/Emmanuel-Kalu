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
        return <Query query={getCurrencies}>
            {({loading, error, data})=> {
                if(loading) return <p>loading...</p>
                if(error) return <p>{error.message}</p>
                if(data === undefined) return <p></p>
                const {currencies} = data;
                const {currency} = this.props;
                return <div className="currency-container" onClick={this.props.CloseModal}>
                    {data && currencies.map((currencyItem)=>
                    currency.length < 1 ?
                        <h4 id={currencyItem.symbol} className={currencyItem.label} key={currencyItem.label} onClick={this.setCurrency} style={{backgroundColor:currencyItem.symbol === '$' ? '#EEEEEE':null}}>{currencyItem.symbol} {currencyItem.label}</h4>
                        :
                        <h4 id={currencyItem.symbol} className={currencyItem.label} key={currencyItem.label} onClick={this.setCurrency} style={{backgroundColor:currencyItem.symbol === currency[0]? '#EEEEEE':null}} >{currencyItem.symbol} {currencyItem.label}</h4>
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
