import './cardlist.css'
import useCardList from '../../hooks/useCardList'
import { SpinnerDotted } from 'spinners-react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

function CardList( { query, selected_filters_handlers } ) {

  const { loading, error, data, fetchMore } = query

  const products = data ? data.getSortedProducts : []

  console.log("CARDLIST PRODUCTS: ", products)

  const { selected_filters } = selected_filters_handlers

  const [
    { 
      handleScroll, 
    } ] = useCardList(products, selected_filters, fetchMore )

    /*
    {products.length > 0 ? products.map( (product, idx)=> 
          <Card key={idx} product={product}/>) 
          : !loading && <div className="no_products">No products found!</div>}  
    */

  if(error) return <>Error! {error.message}</>
//<div className="card_container" id="cardContainer" onScroll={handleScroll}>
  return (
    <div 
    //style={{ height: "100%"}}
    className="card_container" 
    id="cardContainer" 
    onScroll={handleScroll}
    >
         {loading && <div className={"spinner_middle"}><SpinnerDotted/></div>} 
         {//issue: because of the animations, this message appears weird on the card container
         products.length === 0 && !loading ? <div className="no_products">No products found!</div>: null}
         <TransitionGroup
          //the transition group creates a div; can manually assign css/listeners to that div
          //className="card_container" 
          //id="cardContainer"
          //onScroll={handleScroll}
          component={null} // removes the default div that was messing up the css/scroll handler
          >
              

            {products.map( (product, index)=>  
              <CSSTransition
                //onEnter={() => console.log("enter")}
                //onExited={() => console.log("exit")}
                // the key determines if the item was added/removed to the transitiongroup every render
                // using only _id, sometimes the same product would appear in diff searches, causing the card animation to skip
                key={product._id+index} 
                timeout={500} 
                classNames="item">
                  <Card key={product._id} product={product}/>
              </CSSTransition>
            )}      
        </TransitionGroup>     
    </div>
  );
}

/* ORIGINAL CARDLIST pre-animations

function CardList( { query, selected_filters_handlers } ) {

  const { loading, error, data, fetchMore } = query

  const products = data ? data.getSortedProducts : []

  console.log("CARDLIST PRODUCTS: ", products)

  const { selected_filters } = selected_filters_handlers

  const [
    { 
      handleScroll, 
    } ] = useCardList(products, selected_filters, fetchMore )

  if(error) return <>Error! {error.message}</>
//<div className="card_container" id="cardContainer" onScroll={handleScroll}>
  return (
    <div className="card_container" id="cardContainer" onScroll={handleScroll}>
         {loading && <div className={"spinner_middle"}><SpinnerDotted/></div>}   
        {products.length > 0 ? products.map( (product, idx)=> 
          <Card key={idx} product={product}/>) : !loading && <div className="no_products">No products found!</div>}       
    </div>
  );
}

*/

export default CardList

//can also link images using import or require() 
//import demoImage from './demo.webp'; 

const img_src = '../../../demo.webp';

function Card( {product} ) {
  //const {id, name, brand, category, img, price, last_updated, source} = product

  const {id, last_updated, source_id, source_url, brand, category, name, price, info_url,} = product
  //const{  } = product_info

  const vendor = source_url.split("//")[1].split(".")[0] //remove the domain name from the product source
  const format_price = price.toFixed(2); //limit the cents in the price to 2 decimal places (dollar).(cents)

  let format_name = name.toLowerCase().replace( brand ? brand.toLowerCase() : '', '').trim() //if the brand is in the product name, remove it
  format_name = format_name.replace(/^[^A-Z0-9]+|[^A-Z0-9]+$/ig, '') //remove all start/end nonalphanumeric chars

  //if(format_name.includes(' - ')) format_name = format_name.replace(' - ', ' ').trim()

  //rel="noopener noreferrer" is to prevent 'tabnabbing', a kind of phishing attack
 
  return (
    <div className="card">
      
      <a href={info_url} target="_blank" rel="noopener noreferrer">{vendor}<br/></a>
      {brand && <><span>{brand}<br/></span></> }    
      <span className="title">{format_name}<br/></span>   
      <span>${format_price}<br/></span>

      <img className="product_img"
        src={img_src}
        alt="Product">
      </img>

      <div className="card_footer">
        <span>last updated: {last_updated}</span>
      </div>
      
    </div>
  );
}