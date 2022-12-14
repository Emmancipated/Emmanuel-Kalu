export const getProduct = (product)=> {
    return  `query {
     product (id: "${product}"){
       id
       name
       inStock
       gallery
       description
       category
       attributes {
         id
         name
         type
         items {
           displayValue
           value
           id
         }
       }
       prices {
         currency {
             label
             symbol
           }
         amount
       }
       brand
     }
   }
 `
  };

  export const getCurrencies = `
  query {
      currencies {
        label
        symbol
      }
    }
  `;

  export const pricesRequest = `
  query {
      category {
        products {
          id
          prices {
            currency {
              label
              symbol
            }
            amount
          }
        }
      }
    }
  `;

  export const getCategory = (category) =>{
    return `
    query {
      category (input: {title: "${category}"}){
        name
        products {
          id
          name
          inStock
          gallery
          category
          attributes {
            id
            name
            type
            items {
              displayValue
              value
              id
            }
          }
          prices {
            currency {
              label
              symbol
            }
            amount
          }
          brand
        }
      }
    }`}
   
  export const getCategoryName = `
  query {
    categories {
        name 
    }
  } 
  `;