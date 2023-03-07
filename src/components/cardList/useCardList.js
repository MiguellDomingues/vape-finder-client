
import {useState, useEffect, useRef} from 'react'
import { PAGE_LIMIT, SORT_TYPE } from '../../App.js'

function useCardList(products, selected_filters, fetchMore, buildAtlasGQLQuery, setAndRefetch, loading ) {

  console.log("////usecardlist: ", selected_filters)

  const sortSelect = useRef(null);

  const [last_product_id, setLPID] = useState("");

  useEffect(() => { 
    if(!loading) sortSelect.current.value = selected_filters.sort_by 
  }, ); 
  
  const sortSelected = (e) => { 
    //document.getElementById("selectSort").value = "ASC"
    console.log(e.target.value)
    selected_filters.sort_by = e.target.value
    setLPID("")
    setAndRefetch({...selected_filters})
  }
  
  const handleBottom = () =>{
    const lpid = products[products.length-1]._id

    console.log("last_product_id calc: ", last_product_id, " lpid: ", lpid)

    if(products.length%PAGE_LIMIT === 0 && last_product_id !== lpid){
      setLPID(lpid)

      if(selected_filters.sort_by === "NONE"){
        fetchMore({ variables: { ...selected_filters, ...buildAtlasGQLQuery(selected_filters, [lpid])},})
      }else if(selected_filters.sort_by === "ASC" || selected_filters.sort_by === "DESC"){
        const lsp = products[products.length-1].price //get the highest or lowest price in the sorted products

        const ignore_ids = []
        products.forEach( p => p.price === lsp && ignore_ids.push(p._id)) //add the lsp id, including duplicates, to a new list 
        fetchMore({ variables: { ...selected_filters, ...buildAtlasGQLQuery(selected_filters, ignore_ids, lsp)},})
      }    
    }
  }

  const handleScroll = (e) =>{ 
    const hasProducts = p => p?.length > 0
    const isBottom = e => e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    isBottom(e) && hasProducts(products) && handleBottom() 
  }

  return [sortSelect, {sortSelected, handleScroll}]
}

export default useCardList