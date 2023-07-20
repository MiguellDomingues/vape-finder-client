import { PAGE_LIMIT, SORT_TYPE, STORAGE_KEY, ENABLE_DOB_POPUP, buildAtlasGQLQuery } from '../utils'
import { useState, useRef } from 'react'

function useCardList(products, selected_filters, fetchMore, debounced_query_counting_down, toggleBackToTop, loading) {

  const [show_dob_popup, setShow] = useState( false ) //(!localStorage.getItem(STORAGE_KEY) && _show_dob_popup)
  const product_url = useRef(null)
 
  const closeDOBPopup = (save_validation, open_link) => {    
    if(open_link){ // if user entered valid dob
      save_validation && localStorage.setItem(STORAGE_KEY, true); // save validation in local storage
    }else{  // if user opted to just close the pop up
      product_url.current = null // unset the ref, preventing the link from opening
    }
    setShow(false) // close the window, activating the onExit callback
  }

  function handleProductLinkClick(info_url){ //when a product link is clicked
    product_url.current = info_url           // save the current product url in a ref
    if(!localStorage.getItem(STORAGE_KEY) && ENABLE_DOB_POPUP){ // if user did not save dob previously
      setShow(true)                                            // open the validate age pop up          
    }else{  // otherwise just open the product tab
      openURL(info_url)
    }
  }

  function openURL(url){ //rel="noopener noreferrer" is to prevent 'tabnabbing', a kind of phishing attack
    url && window.open(url, "_blank", "noopener,noreferrer")
  }

  const handleBottom = () =>{
    const lpid = products[products.length-1]._id

    if(products.length%PAGE_LIMIT === 0){

      function getSortParams(products){
        const last_product_price = products[products.length-1].price //the highest(or lowest price) in the sorted products is the tail of the products arr
        const last_product_ids = []
        products.forEach( p => p.price === last_product_price && last_product_ids.push(p._id)) //add all the ids of the products with price === to last product price
        return { last_product_price,last_product_ids }
      }

      if(selected_filters.sort_by === SORT_TYPE.NONE){
        fetchMore({ variables: { ...buildAtlasGQLQuery(selected_filters, {last_product_ids: [lpid]})},})
      }else if(selected_filters.sort_by === SORT_TYPE.ASC || selected_filters.sort_by === SORT_TYPE.DESC){ 
        fetchMore({ variables: {  ...buildAtlasGQLQuery(selected_filters, getSortParams(products))},})
      }    
    }
  }

  const handleScroll = (e) =>{
    toggleBackToTop(e.target.scrollTop , e.target.clientHeight) //invoke the callback which hides/shows back-to-top scroll btn
    const hasProducts = p => p?.length > 0
    //the bottom is considered scrolling past the last ~5% of the product list
    const isBottom = e => (Math.ceil(e.target.scrollTop) + e.target.clientHeight) >= Math.floor(e.target.scrollHeight*.95)

    !loading &&                         // if there isnt a current fetchMore() call
      !debounced_query_counting_down && // ...and the user has not selected other filters (this is to prevent a fetchMore() call at the same time as a getProducts() call)
        isBottom(e) &&                  // ...and the user has scrolled to the bottom 
          hasProducts(products) &&      // ..and there are items from the last query
            handleBottom()              // fetch the next page of items
  }

  return [
    show_dob_popup, 
    {
      handleScroll, 
      handleProductLinkClick, 
      closeDOBPopup,
      openURL: () => openURL(product_url.current) // return a closure which invokes openURL with last open link
    }]
}

export default useCardList