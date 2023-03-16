import { FILTER_KEYS, starting_filters } from '../../App.js'
import './pillContainer.css'

function PillContainer( {selected_filters_handlers} ){

    const { setAndRefetch, selected_filters} = selected_filters_handlers
    const { category, stores, brands, } = selected_filters

    const areFiltersSelected = category?.length > 0 || brands?.length > 0 || stores?.length > 0

    function handleRemove(filter_key){ //this closure returns a function with the selected_category key already set by the parent Footer component
        return pill_str =>
        setAndRefetch({ 
          ...selected_filters,
          [filter_key]: selected_filters[filter_key].filter( str => str !== pill_str)})}

    return(<div className="pill_container">
        {areFiltersSelected ?
            <><button onClick={ (e)=>setAndRefetch({...starting_filters}, 0) }>Clear</button>
            <PillList pills={category} handleRemove={handleRemove(FILTER_KEYS.CATEGORIES)} />
            <PillList pills={brands} handleRemove={handleRemove(FILTER_KEYS.BRANDS)}  />
            <PillList pills={stores} handleRemove={handleRemove(FILTER_KEYS.STORES)}/></>
        : <></>}
    </div>)
}

export default PillContainer;

function PillList( {pills, handleRemove} ) {
    return (<>{pills.map( (str, idx)=> <Pill key={idx} str={str} removePill={handleRemove}/>)}</>);
}
  
function Pill( {str, removePill} ) { 
    return (<div className="pill"> <span className="pill_str">{str}</span>&nbsp;
        <span className="pill_close_container" onClick={ e => removePill(str) }>&#x00d7;</span>
</div>); }



  //const insertWhitespace = num => new Array(num).fill('\u00A0', 0, num).join('') div className="pill_list"