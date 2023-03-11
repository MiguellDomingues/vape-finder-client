import './cardlist.css'
import Card from '../card/Card'
import useCardList from './useCardList'
import { SpinnerDotted } from 'spinners-react';

function CardList( { setLPID, lpid, query, selected_filters_handlers } ) {

  const { loading, error, data, fetchMore } = query

  const products = data ? data.getSortedProducts : []

  console.log("CARDLIST PRODUCTS: ", products)

  const { selected_filters, setAndRefetch } = selected_filters_handlers

  const [
    { 
      handleScroll, 
    } ] = useCardList(products, selected_filters, fetchMore, setAndRefetch, loading, lpid, setLPID )

  if(error) return <>Error! {error.message}</>

  return (
    <div className="card_container" id="cardContainer" onScroll={handleScroll}>
        {loading && <div className={"spinner_middle"}><SpinnerDotted/></div>}   
        {products.map( (product, idx)=> 
          <Card key={idx} product={product}/>)}   
    </div>
  );
}

export default CardList