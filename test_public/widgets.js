
import {SORT_TYPE} from './utils'

/////////////////////////////////////////////////////////////////////////////////

export function SortByDropDown({selected_filters_handlers })  {
  
    const {setAndRefetch, selected_filters} = selected_filters_handlers
      
        const sortSelected = (e) => { 
          console.log(e.target.value)
          selected_filters.sort_by = e.target.value
          //setLPID(null) //BUG. WHENEVER I SWITCH TO ANOTHER SELECTION AND SWITCH BACK (WITH SORT_TO = NONE, THE LAST_PRODUCT_ID IS INCORRECT AND CAUSES DUPES TO BE FETCHED)
          setAndRefetch({...selected_filters})
        }
      
    return(<div>
        Sort By:<br/>
        <select className='dropdown' onChange={sortSelected} value={selected_filters.sort_by} >
            <option value={SORT_TYPE.NONE}>None</option>
            <option value={SORT_TYPE.DESC}>Price: High to Low</option>
            <option value={SORT_TYPE.ASC}>Price: Low to High</option>
        </select>
    </div>)
}

////////////////////////////////////////////////////////////////////////////////////////

export function DropDownMenu( {title, tags, selected_tags, selectedHandler} ){

    const selectedTagsBGC = (str, arr) => arr.includes(str) ? " filter_selected" : ""

    //move the selected tags to the top of the dropdown list
    //const sortedtags = [ ...tags.filter( t=> selected_tags.includes(t.tag_name) )]
                      //  .concat([...tags.filter( t=> !selected_tags.includes(t.tag_name)) ])

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