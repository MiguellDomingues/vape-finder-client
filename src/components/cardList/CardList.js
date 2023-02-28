import './cardlist.css'
import Card from '../card/Card'
import useCardList from './useCardList'
import { SpinnerDotted } from 'spinners-react';

function CardList( { products, fetchMore, loading } ) {

  const [{ handleScroll }] = useCardList(products, fetchMore)

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

/*
function WithCardList(Component,  props){
  //console.log("HARLO FROM WRAPPER")
  //const [{ handleScroll }] = useCardList(props.products, props.fetchMore)
  return <Component products={props.products} loading={props.loading} handleScroll={[useCardList(props.products, props.fetchMore)]}/>
}




const CardList = (props) => WithCardList(

( { products, loading, handleScroll } ) => {

  return (
    <div className="card_container" id="cardContainer" onScroll={handleScroll}>  
        {!loading && 
          <select className='dropdown'>
            <option value="none">None</option>
            <option value="high_to_low">Price: High to Low</option>
            <option value="low_to_high">Price: Low to High</option>
          </select>
        }
        {products.map( (product, idx)=> 
          <Card key={idx} product={product}/>)}     
    </div>
  );
        }, props)
*/