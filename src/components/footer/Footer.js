import './footer.css'

import { FILTER_KEYS, starting_filters } from '../../App.js'

function Footer( {refetch} ) {

  const { selected_filters, setAndRefetch } = refetch
  const {category, brands, stores} = selected_filters

  const areFiltersSelected = category?.length > 0 || brands?.length > 0 || stores?.length > 0

  function handleRemove(filter_key){ //this closure returns a function with the selected_category key already set by the parent Footer component
    return pill_str =>
    setAndRefetch({ 
      ...selected_filters,
      [filter_key]: selected_filters[filter_key].filter( str => str !== pill_str)})}
  
    return (<footer className="footer">
      {!areFiltersSelected ?
          <> No Filters Selected !</> 
        :
          <> <button onClick={ (e)=>setAndRefetch({...starting_filters}, 0) }>Clear</button> <br/>
             <PillContainer pills={category} handleRemove={handleRemove(FILTER_KEYS.CATEGORIES)} dec_str={"Categories"} />
             <PillContainer pills={brands} handleRemove={handleRemove(FILTER_KEYS.BRANDS)} dec_str={"Brands"} />
             <PillContainer pills={stores} handleRemove={handleRemove(FILTER_KEYS.STORES)} dec_str={"Stores"} />
          </>}     
    </footer>);
  }

  function PillContainer( {pills, handleRemove, dec_str} ) {
    const insertWhitespace = num => new Array(num).fill('\u00A0', 0, num).join('')
    return (<div> 
      {pills?.length > 0 
        && <>{dec_str}: {insertWhitespace(2)}</>} 
          {pills.map( (str, idx)=> <Pill key={idx} str={str} removePill={handleRemove}/>)}
      </div>);
  }

  function Pill( {str, removePill} ) { 
    return (<div className="pill"> {str}&nbsp;
        <span className="pill_close_container" onClick={ e => removePill(str) }>
          &#x00d7;
        </span>
    </div>); }

  export default Footer;
