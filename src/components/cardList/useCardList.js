
import {useState} from 'react'

function useCardList(products, selected_filters, fetchMore, buildAtlasGQLQuery ) {

  const [last_product_id, setLPID] = useState("");

  const PRODUCTS_PER_PAGE = 11

  const hasProducts = p => p?.length > 0
  const isBottom = e => e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
  
  const handleBottom = () =>{
    const lpid = products[products.length-1]._id
    console.log("last_product_id calc: ", last_product_id, " lpid: ", lpid)

    if(products.length%PRODUCTS_PER_PAGE === 0 && last_product_id !== lpid){
      setLPID(lpid)     
      const query = buildAtlasGQLQuery(selected_filters,lpid)
      console.log("FETCHMORE QUERY: ", query, " LPID: ", lpid)
      fetchMore({ variables: { ...selected_filters, ...buildAtlasGQLQuery(selected_filters, lpid)},})
    }
  }

  const handleScroll = (e) => isBottom(e) && hasProducts(products) && handleBottom()

  return [{handleScroll}]
}

export default useCardList