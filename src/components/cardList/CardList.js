import './cardlist.css'
import Card from '../card/Card'
import useCardList from './useCardList'
import { SpinnerDotted } from 'spinners-react';
import { SORT_TYPE } from '../../App.js';

function CardList( { products, loading, fetchMore, selected_filters_handlers } ) {

  console.log("CARDLIST PRODUCTS: ", products)

  const { selected_filters, setAndRefetch } = selected_filters_handlers

  const [sortSelect, { handleScroll, sortSelected } ] = useCardList(products, selected_filters, fetchMore, setAndRefetch, loading )

  return (
    <div className="card_container" id="cardContainer" onScroll={handleScroll}>
        {!loading ?       
         <select ref={sortSelect} className='dropdown' onChange={sortSelected}>
            <option value={SORT_TYPE.NONE}>None</option>
            <option value={SORT_TYPE.DESC}>Price: High to Low</option>
            <option value={SORT_TYPE.ASC}>Price: Low to High</option>
          </select>
          : <div className={"spinner_middle"}><SpinnerDotted/></div>}
        {products.map( (product, idx)=> 
          <Card key={idx} product={product}/>)}   
    </div>
  );
}

export default CardList