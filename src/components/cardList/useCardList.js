
import {useState} from 'react'

function useCardList( products, fetchMore ) {

  const [last_product_id, setLPID] = useState("");

  const PRODUCTS_PER_PAGE = 11

  const hasProducts = p => p?.length > 0
  const isBottom = e => e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
  
  const handleBottom = () =>{
    const lpid = products[products.length-1].id
    console.log("last_product_id calc: ", last_product_id, " lpid: ", lpid)

    if(products.length%PRODUCTS_PER_PAGE === 0 && last_product_id !== lpid){
      setLPID(lpid)
      console.log("fetch Page")
      fetchMore({ variables: { last_product_id: lpid},})
    }
  }

  const handleScroll = (e) => isBottom(e) && hasProducts(products) && handleBottom()
  

  return [{handleScroll}]
}

export default useCardList