import './search_bar.css'
import { useSearchBar } from './useSearchBar.js'
import { FILTER_KEYS,starting_filters } from '../../App.js'

function SearchBar( {selected_filters_handlers} ){

    const {setAndRefetch} = selected_filters_handlers

    

    const [
       filter_tags,
       selected_filters,
        loading,
        error,
        { onFilterTagSelected }
     ] = useSearchBar(selected_filters_handlers)

    const { category_tags, brands_tags, stores_tags } = filter_tags
    const { category, stores, brands, } = selected_filters

    const areFiltersSelected = category?.length > 0 || brands?.length > 0 || stores?.length > 0

    function handleRemove(filter_key){ //this closure returns a function with the selected_category key already set by the parent Footer component
        return pill_str =>
        setAndRefetch({ 
          ...selected_filters,
          [filter_key]: selected_filters[filter_key].filter( str => str !== pill_str)})}

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (<>
            <DropDownMenu title="Categories" tags={category_tags} selected_tags={category} selectedHandler={onFilterTagSelected(FILTER_KEYS.CATEGORIES)} />
            <PillContainer pills={category} handleRemove={handleRemove(FILTER_KEYS.CATEGORIES)} dec_str={""} />
            <hr/>
            <DropDownMenu title="Brands" tags={brands_tags} selected_tags={brands} selectedHandler={onFilterTagSelected(FILTER_KEYS.BRANDS)} />
            <PillContainer pills={brands} handleRemove={handleRemove(FILTER_KEYS.BRANDS)} dec_str={""} />
            <hr/>
            <DropDownMenu title="Stores" tags={stores_tags} selected_tags={stores} selectedHandler={onFilterTagSelected(FILTER_KEYS.STORES)} />
            <PillContainer pills={stores} handleRemove={handleRemove(FILTER_KEYS.STORES)} dec_str={""} />
            {areFiltersSelected &&  <button onClick={ (e)=>setAndRefetch({...starting_filters}, 0) }>Clear</button>}  
            <hr/>
    </>)
}

export default SearchBar

function DropDownMenu( {title, tags, selected_tags, selectedHandler} ){

    const selectedTagsBGC = (str, arr) => arr.includes(str) ? " filter_selected" : ""

    return(<div className="dropdown_container cursor_hand">
    {title}
    <div className="dropdown-arrow"></div>
    <div className="dropdown-content">    
        {tags.map( (tag, idx)=>
            <span className={selectedTagsBGC(tag.tag_name, selected_tags)}
                  key={idx} 
                  onClick={ ()=> selectedHandler(tag.tag_name)}>
                 {tag.tag_name} {tag.product_count}          
            </span>)}                  
    </div>
</div>)
}

function PillContainer( {pills, handleRemove, dec_str} ) {
    const insertWhitespace = num => new Array(num).fill('\u00A0', 0, num).join('')
    return (<div> 
      {//pills?.length > 0 && <>{dec_str}: {insertWhitespace(2)}</>
      } 
          {pills.map( (str, idx)=> <Pill key={idx} str={str} removePill={handleRemove}/>)}
      </div>);
  }
  
  function Pill( {str, removePill} ) { 
    return (<div className="pill"> {str}&nbsp;
        <span className="pill_close_container" onClick={ e => removePill(str) }>
          &#x00d7;
        </span>
    </div>); }
  
