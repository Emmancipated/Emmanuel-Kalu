import React from "react";
import { connect } from "react-redux";
import { AddProduct } from "../../redux/actions";
import { nanoid } from "@reduxjs/toolkit";

class MiniProductAttributes extends React.Component {
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
            showMore: false,
            addedtoCart: false,
          };

    }

    onSubmit = (event) => {   
        const {products} = this.props;
        let deepStateCopy = JSON.parse(JSON.stringify(products));//copied the state of the app
        let copiedLocalState = {...this.state};// copied local state
        let items = deepStateCopy.filter(product => product.name === copiedLocalState.name);//filter copied app state where name matches the copied local state name
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
        this.setState({id: nanoid(),}) 
        this.props.AddProduct(this.state)
        } else {
        this.props.AddProduct(filteredResult[0].id) //else dispatch the id of the identified item in state, 
        }
        setTimeout(() => {
            this.setState({addedtoCart: true}) 
          },0)
          setTimeout(() => {
            this.setState({addedtoCart: false})
          }, 2000);                                           //where the quantity will be increased by the reducer
        return this.state;   
    }

    selectAttributes = (e) => {
        let {attributes} = this.state;//get attributes from the local state
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

    componentDidMount(){
        const {product} = this.props
        this.setState({name: product.id, id: nanoid(),}) 
    }
    
    render() { return <div className={`mini-attributes-container`}>
            {this.state.addedtoCart ? <p className="addedtocart" >successfully added item to cart.</p> : null}
          <p>Please select attributes</p>
          <h3>{this.props.product.name}</h3>
         {this.props.product.attributes.map((attribute, ind)=> attribute.type === "text" ? (<div key={attribute.id}>
            <label className="item-label">{attribute.name.toUpperCase()}:</label>
            <div className="sizes-container">
                {attribute.items.map((attributeItem)=> 
                    <div className="size-box-mini" key={attributeItem.value}>          
                    <input className="size-input" name={attribute.id}  onChange={this.selectAttributes} type="radio" value={attributeItem.value} />
                    <span className="size-text-mini" >{attributeItem.value}</span>
                    </div>
                )}
                </div></div>)
                : 
               null )} 
            {this.props.product.attributes.map((attribute)=> attribute.type === "swatch" ? (<div key={attribute.id}>
            <label className="item-label">COLOR:</label>
            <div className="colors-container">
                {attribute.items.map((attributeItem)=> 
                    <div className="color-box-mini" key={attributeItem.value}>            
                    <input className="color-input"  name={attribute.id} onChange={this.selectAttributes} type="radio" value={attributeItem.value} />
                    <span className="color-text-mini"  style={{backgroundColor: attributeItem.value, boxShadow: attributeItem.value === '#FFFFFF'? '0 0 20px #ccc': null} }></span>
                    </div>
                )}
                </div></div>)
                : 
                null )}
                {
                    this.props.product.inStock && this.state.attributes.length === this.props.product.attributes.length ?
                    <button className="adding" type="submit" onClick={this.onSubmit}>ADD</button>
                    :
                    this.props.product.inStock && this.state.attributes !== this.props.product.attributes
                    ?
                    <button className="adding">SELECT ATTRIBUTES</button>
                    :
                    <button className="adding">OUT OF STOCK</button>

                }
                <button className="closing">CLOSE</button>
                </div>
    }
}

const mapStateToProps = state => ({
    products: state.products, 
    currency: state.currency
})

const mapDispatchToProps = (dispatch) => ({
    AddProduct: (product) => dispatch(AddProduct(product))
})


export default connect(mapStateToProps, mapDispatchToProps)(MiniProductAttributes);

