import './cardlist.css'
import Card from '../card/Card'
import useCardList from './useCardList'
import { SpinnerDotted } from 'spinners-react';

function CardList( { products, loading, fetchMore, selected_filters_handlers } ) {

  console.log("CARDLIST PRODUCTS: ", products)

  const { selected_filters,buildAtlasGQLQuery, setAndRefetch } = selected_filters_handlers

  const [sortSelect, { handleScroll, sortSelected } ] = useCardList(products, selected_filters, fetchMore, buildAtlasGQLQuery, setAndRefetch, loading )

  console.log("RENDERING CARDLIST HTML")

  return (
    <div className="card_container" id="cardContainer" onScroll={handleScroll}>
        {!loading ?       
         <select ref={sortSelect} className='dropdown' onChange={sortSelected}>
            <option value="NONE">None</option>
            <option value="DESC">Price: High to Low</option>
            <option value="ASC">Price: Low to High</option>
          </select>
          : <div className={"spinner_middle"}><SpinnerDotted/></div>}
        {products.map( (product, idx)=> 
          <Card key={idx} product={product}/>)}   
    </div>
  );
}

export default CardList