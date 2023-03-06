
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
    setAndRefetch({...selected_filters})
  }
  
  const handleBottom = () =>{
    const lpid = products[products.length-1]._id

    console.log("last_product_id calc: ", last_product_id, " lpid: ", lpid)

    if(products.length%PAGE_LIMIT === 0 && last_product_id !== lpid){
      setLPID(lpid)     
      const query = buildAtlasGQLQuery(selected_filters,lpid)
      console.log("FETCHMORE QUERY: ", query, " LPID: ", lpid)
      fetchMore({ variables: { ...selected_filters, ...buildAtlasGQLQuery(selected_filters, lpid)},})
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