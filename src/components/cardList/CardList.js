import './cardlist.css'
import Card from '../card/Card'
import useCardList from './useCardList'
import { SpinnerDotted } from 'spinners-react';

function CardList( { products, loading, fetchMore, selected_filters_handlers } ) {

  console.log("CARDLIST PRODUCTS: ", products)

  const { selected_filters,buildAtlasGQLQuery } = selected_filters_handlers

  const [ { handleScroll } ] = useCardList(products, selected_filters, fetchMore, buildAtlasGQLQuery )

  return (
    <div className="card_container" id="cardContainer" onScroll={handleScroll}>
        {!loading ?       
          <select className='dropdown'>
            <option value="none">None</option>
            <option value="high_to_low">Price: High to Low</option>
            <option value="low_to_high">Price: Low to High</option>
          </select> 
          : <div className={"spinner_middle"}><SpinnerDotted/></div>}
        {products.map( (product, idx)=> 
          <Card key={idx} product={product}/>)}     
    </div>
  );
}

export default CardList