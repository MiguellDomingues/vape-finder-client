import { PAGE_LIMIT, SORT_TYPE, buildAtlasGQLQuery } from '../utils'

function useCardList(products, selected_filters, fetchMore, debounced_query_counting_down) {

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
    const hasProducts = p => p?.length > 0
    const isBottom = e => e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    !debounced_query_counting_down && // if the user has not selected other filters
      isBottom(e) &&                  // and the user has scrolled to the bottom 
        hasProducts(products) &&      // and there are items from the last query
          handleBottom()              // fetch the next page of items
  }

  return [{handleScroll}]
}

export default useCardList