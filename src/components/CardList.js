import useCardList from '../hooks/useCardList'
import { SpinnerDotted } from 'spinners-react';
import {useState, useRef} from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import VertifyAge from './VertifyAge'
import '../styles/cardlist.css'

import { STORAGE_KEY } from '../utils.js'

const _show_dob_popup = true

function CardList( { query, selected_filters_handlers } ) {

  const { loading, error, data, fetchMore, debounced_query_counting_down } = query

  const products = data ? data.getSortedProducts : []

  console.log("CARDLIST PRODUCTS: ", products)

  const { selected_filters } = selected_filters_handlers

  const [
    { 
      handleScroll, 
    } ] = useCardList(products, selected_filters, fetchMore, debounced_query_counting_down )

    const [show_dob_popup, setShow] = useState( false ) //(!localStorage.getItem(STORAGE_KEY) && _show_dob_popup)
    const product_url = useRef(null)
    const nodeRef = useRef(null)

    const closeDOBPopup = (save_validation, open_link) => {    
      if(open_link){ // if user entered valid dob
        save_validation && localStorage.setItem(STORAGE_KEY, true); // save validation in local storage
      }else{  // if user opted to just close the pop up
        product_url.current = null // unset the ref, preventing the link from opening
      }
      setShow(false) // close the window
    }

  function handleProductLinkClick(info_url){ //when a product link is clicked
    product_url.current = info_url           // save the current product url in a ref
    if(!localStorage.getItem(STORAGE_KEY) && _show_dob_popup){ // if user did not save dob previously
      setShow(true)                                            // open the validate age pop up          
    }else{
      window.open(info_url, "_blank", "noopener,noreferrer")  // otherwise just open the product tab
    }
  }

  if(error) return <>Error! {error.message}</>

  return (<>
    <CSSTransition 
      timeout={1000} 
      unmountOnExit 
      classNames="toggle-vertifyage-popup-animation" 
      //if an animated component appears when app first loads, need the 'appear' prop along with the 'in' prop
      // also need to define *-appear and *-appear-active css classes    
      in={show_dob_popup}   
      //appear={show_dob_popup}
      //because we use the 'in' prop with a custom functional component, also need to define a nodeRef prop
      //which is a useRef instance. the ref gets set by the CSSTransition wrapper
      //the alternative is to lift the wrapping div from the vertify age cmp and put it in here
      // when the exit animation for the popup finishes, the product tab will appear only if the ref has not been unset
      onExited={()=>{product_url.current && window.open(product_url.current , "_blank", "noopener,noreferrer")}}
      nodeRef={nodeRef}>
        <VertifyAge 
          ref={nodeRef} // pass the ref to vertifyage, which is wrapped in forwardRef
          closeDOBPopup={closeDOBPopup}/>
    </CSSTransition>

    <div className="card_container" id="cardContainer" onScroll={handleScroll}>
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
                  <Card key={product._id} product={product} productLinkClick={handleProductLinkClick}/>
              </CSSTransition>
            )}      
        </TransitionGroup>     
    </div>
    </>);
}

export default CardList

//can also link images using import or require() 
//import demoImage from './demo.webp'; 

const img_src = '../../../demo.webp';

function Card({
  product,
  productLinkClick,
}) {
  //const {id, name, brand, category, img, price, last_updated, source} = product

  const {id, last_updated, source_id, source_url, brand, category, name, price, info_url,} = product
  //const{  } = product_info

  const vendor = source_url.split("//")[1].split(".")[0] //remove the domain name from the product source
  const format_price = price.toFixed(2); //limit the cents in the price to 2 decimal places (dollar).(cents)

  let format_name = name.toLowerCase().replace( brand ? brand.toLowerCase() : '', '').trim() //if the brand is in the product name, remove it
  format_name = format_name.replace(/^[^A-Z0-9]+|[^A-Z0-9]+$/ig, '') //remove all start/end nonalphanumeric chars

  //if(format_name.includes(' - ')) format_name = format_name.replace(' - ', ' ').trim()
  
  //rel="noopener noreferrer" is to prevent 'tabnabbing', a kind of phishing attack
  //<a href={info_url} target="_blank" rel="noopener noreferrer">{vendor}<br/></a>
  return (
    <div className="card">

      <span className="product_link" onClick={e=>{productLinkClick(info_url)}}>{vendor}<br/></span>
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