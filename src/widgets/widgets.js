
import {SORT_TYPE} from '../utils'
import './widgets.css' 

import { RiCloseFill } from 'react-icons/ri';

/////////////////////////////////////////////////////////////////////////////////

export function SortByDropDown({selected_filters_handlers })  {
  
    const {setAndRefetch, selected_filters} = selected_filters_handlers
      
        const sortSelected = (e) => { 
          console.log(e.target.value)
          selected_filters.sort_by = e.target.value
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

    const selectedTagsBGC = (str, arr) => arr.includes(str) ? "filter_selected dropdown_item" : "dropdown_item"

    //move the selected tags to the top of the dropdown list
    //const sortedtags = [ ...tags.filter( t=> selected_tags.includes(t.tag_name) )]
                      //  .concat([...tags.filter( t=> !selected_tags.includes(t.tag_name)) ])

    return(<div className="dropdown_container cursor_hand">
    <div className="dropdown_title"> {title}<div className="dropdown-arrow"></div> </div>
    
    <div className="dropdown-content">    
        {tags.map( (tag, idx)=>
            <div className={selectedTagsBGC(tag.tag_name, selected_tags)}
                  key={idx} 
                  onClick={ ()=> selectedHandler(tag.tag_name)}>
                 <div>{tag.tag_name}</div> <div>{tag.product_count}</div>         
            </div>)}                  
        </div>
    </div>)
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export function PillList( {pills, filter_key, handleRemove, handleClear} ) {
    return(<>
        {handleClear && pills?.length > 0 && <button onClick={e=>handleClear(filter_key)()}>Clear</button>}
        {pills.map( (str, idx)=> <Pill key={idx} str={str} removePill={handleRemove(filter_key)}/>)}
    </>);
}
  
function Pill( {str, removePill} ) { 
    return (<div className="pill pill_container_font"> <span className="pill_str">{str}</span>&nbsp;
        <span className="pill_close_container" onClick={ e => removePill(str) }><RiCloseFill/></span>
</div>); }

////////////////////////////////////////////////////////////////////////////////////////////////

export function CollapsibleMenu( {title, tags, selected_tags, selectedHandler, registerMenu, handleClear} ){

    const selectedTagsBGC = (str, arr) => arr.includes(str) ? " filter_selected content-row" : "content-row"

    const isTagSelected = (tag, arr) => arr.includes(tag) 
    //!isTagSelected(tag.tag_name,selected_tags) && 

    //move the selected tags to the top of the dropdown list
    //const sortedtags = [ ...tags.filter( t=> selected_tags.includes(t.tag_name) )]
                      //  .concat([...tags.filter( t=> !selected_tags.includes(t.tag_name)) ])

    function clearFilters(e){
        e.stopPropagation()
        handleClear()
    }

    function toggleMenu(e){
        e.target.classList.toggle("active");
        let content = e.target.nextElementSibling;
        content.style.maxHeight = content.style.maxHeight ? null : "20%"
        registerMenu && registerMenu(e.target)
    }

    return(<>
    <button class="collapsible" onClick={toggleMenu}>{title}
        {handleClear && selected_tags.length > 0 && <button onClick={clearFilters}>Clear</button>}
    </button>
    <div class="content">
    {tags.map( (tag, idx)=>
            <div className={selectedTagsBGC(tag.tag_name, selected_tags)}
                  key={idx} 
                  onClick={ ()=> selectedHandler(tag.tag_name)}>
                 <div className="content-row-left">{tag.tag_name}</div> 
                 <div className="content-row-right">{tag.product_count}</div>       
            </div>
        )}                  
    </div></>)

}

/**************wrapper for <hr/> tag that appears inside flex containers***************** */

export function HorizontalLine(){
    return (<div className="outer_line"><hr/></div>)
}
