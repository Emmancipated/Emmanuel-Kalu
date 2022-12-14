import React from "react";
import { NavLink } from "react-router-dom";
import {UpArrowSvg, DownArrowSvg, CartSvg} from "./Svgs";
import CurrencySwitcher from "./CurrencySwitcher";
import CartOverLay from "./CartOverlay";
import { Query } from "urql";
import { connect } from "react-redux";
import { getCategoryName } from "../graphql/graphqlReq";
import {TrackCategory} from "../redux/actions";

class Header extends React.Component {

    constructor(props){
        super(props);
        this.state = {isClicked: false, dropDown: "hidden", counter: 0,};
    }

    handleClick = () => {
        this.setState({isClicked: true, dropDown: "open",})
    };

    handleCartoverlay = () => {
        this.setState(prevState => ({counter: prevState.counter + 1}));
    }

    handleClose = () => {
        this.setState({isClicked: false, dropDown: "hide"})     
    }
    handleClosed = () => {
        this.setState({isClicked: false, dropDown: "hidden"})     
    }

    setCategory = (e) => {
        this.props.TrackCategory(e);
        }

    render() {
        const {isClicked, dropDown, counter} = this.state;
        const {products, currency} = this.props;
        const productValues = products.map(({ value }) => value);


        let totalCount = 0;
        productValues.forEach(count => {
        totalCount += count;
        });
        let currencySelector;
        let selectedCurrency;

      if(this.state.isClicked === false && dropDown === "hidden") {
        currencySelector = <  DownArrowSvg onClick={this.handleClick} />
        selectedCurrency = currency.length < 1 ?<p onClick={this.handleClick}>$</p>:<p onClick={this.handleClick}>{currency[0]}</p>
      } else if (isClicked === true && dropDown === "open") {
        setTimeout(() => {
            window.addEventListener('click', this.handleClose);
        }, 0)
        currencySelector =  <>< UpArrowSvg /> <CurrencySwitcher CloseModal={this.handleClose}/></>
        selectedCurrency = currency.length < 1 ?<><p>$</p><CurrencySwitcher/></>:<><p>{currency[0]}</p><CurrencySwitcher/></>   
      } 
      else {
        currencySelector = <  DownArrowSvg onClick={this.handleClick}/>
        selectedCurrency = currency.length < 1 ?<p onClick={this.handleClick}>$</p>:<p onClick={this.handleClick}>{currency[0]}</p>
        window.removeEventListener('click', this.handleClose);
        
      }

        return <Query query={getCategoryName}>
            {({fetching, error, data})=> {
                if (fetching) return <p>Fetching...</p>
                if (error) return <p>Error: {error.message}</p>
                const {categories} = data;
                return (
                <div className="header-container">
                    <header className="header-wrapper">
                        {/* Navigation links */}
                        <nav>
                            <div className="nav-link">
                            {categories.map((category)=> 
                            this.props.currentCategory === '' ? 
                            <NavLink 
                            className={"other"} 
                            to={`${category.name}`}
                            onClick={()=> this.setCategory(category.name)}
                            key={category.name}
                            >
                            {category.name}
                            </NavLink>
                            :
                            <NavLink 
                            className={category.name === this.props.currentCategory ? "activeNav" : null} 
                            to={`${category.name}`}
                            onClick={()=> this.setCategory(category.name)}
                            key={category.name}
                            >
                            {category.name}
                            </NavLink>
                            )}
                            </div>

                            {/* Center Logo */}
                            <div id="logo">
                            <img src={require("../img/a-logo.png")} alt="logo"/>
                            </div>

                            {/* <!-- Currency symbol--> */}
                            <div className="product-modifier">
                                {/* <p>{currency[0]}</p> */}
                                <div className="selected-currency">{selectedCurrency}</div>                                
                                <div>
                                    {/* Displays the current value of currency list */}
                                    {currencySelector}
                                </div>

                                {/* <!-- Cart Icon and its contents --> */}
                                <div className="cart-icon" onClick={this.handleCartoverlay}>
                                        < CartSvg />
                                        {products.length > 0 ? <div className="cart-content">
                                        <p>{totalCount}</p>
                                    </div> : null}                             
                                </div>
                            </div>
                        </nav>
                    </header>     
                {counter % 2 === 0 ? null : <><CartOverLay /><div className="greyshadow"></div></>}  
            </div>
                )
            }}
        </Query>      
    }
} 
const mapStateToProps = state => ({
    products: state.products, 
    currency: state.currency,
    currentCategory: state.currentCategory,
    })

const mapDispatchToProps = (dispatch) => ({
    TrackCategory: (value) => dispatch(TrackCategory(value)),
      });

export default connect(mapStateToProps, mapDispatchToProps)(Header);