import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
      
    return(<div className="sortby_dropdown_container">
        Sort By
        <select className='dropdown' onChange={sortSelected} value={selected_filters.sort_by} >
            <option value={SORT_TYPE.NONE}>None</option>
            <option value={SORT_TYPE.DESC}>Price: High to Low</option>
            <option value={SORT_TYPE.ASC}>Price: Low to High</option>
        </select>
    </div>)
}

//////////////////////////CURRENTLY UNUSED//////////////////////////////////////

export function DropDownMenu( {title, tags, selected_tags, selectedHandler} ){

    const selectedTagsBGC = (str, arr) => arr.includes(str) ? "filter_selected dropdown_item" : "dropdown_item"

    //move the selected tags to the top of the dropdown list
    //const sortedtags = [ ...tags.filter( t=> selected_tags.includes(t.tag_name) )]
                      //  .concat([...tags.filter( t=> !selected_tags.includes(t.tag_name)) ])
     function toggleMenu(e){ 
        //e.stopPropagation()
        //console.log("mouse enter! ", )
       // let content = e.target.nextElementSibling;
       // content.style.maxHeight = content.style.maxHeight ? null : "200px"
    }
    
    return(
    <div className="dropdown_container cursor_hand">
        <div className="dropdown_title" onMouseEnter={e=>toggleMenu(e)} onMouseLeave={e=>toggleMenu(e)}
        > {title}<div className="dropdown-arrow"></div> </div>
            
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
        <TransitionGroup
            //wrapped jsx added to dom without any outer elements; adds outer div by default
            component={null}>
            {pills.map( (str)=> 
            <CSSTransition key={str} timeout={500} classNames="pill-animation">
              <Pill key={str} str={str} removePill={handleRemove && handleRemove(filter_key)}/>
          </CSSTransition>)}
        </TransitionGroup>
    </>);
}
  
function Pill( {str, removePill} ) { 
    return (<div className="pill pill_container_font"> <span className="pill_str">{str}</span>&nbsp;
        {removePill && <span className="pill_close_container" onClick={ e => removePill(str) }><RiCloseFill/></span>}
</div>); }

////////////////////////////////////////////////////////////////////////////////////////////////

export function CollapsibleMenu( {
    title         = "", 
    tags          = [], 
    selected_tags = [], 
    selectedHandler, 
    maxHeight = "100px"
} ){

    const selectedTagsBGC = (str, arr) => arr.includes(str) ? " filter_selected content-row" : "content-row"

    const isTagSelected = (tag, arr) => arr.includes(tag) 

    //move the selected tags to the top of the dropdown list
    //const sortedtags = [ ...tags.filter( t=> selected_tags.includes(t.tag_name) )]
                      //  .concat([...tags.filter( t=> !selected_tags.includes(t.tag_name)) ])

    function toggleMenu(target){
        target.classList.toggle("active");
        let content = target.nextElementSibling;
        content.style.maxHeight = content.style.maxHeight ? null : maxHeight//"100px"
    }

    return(<>
    <button className="collapsible" onClick={e=>toggleMenu(e.target)}>{title}</button>
    <div className="content">
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

/**************button to clear a single filter***************** */

export function ClearFiltersButton({
    title = "",
    handleClear,
    show = false,
}){

    function clearFilters(e){
        e.stopPropagation()
        handleClear()
    }

    return(
    <CSSTransition timeout={500} unmountOnExit classNames="clear-pills-btn-animation" in={show}>
        <div className="pill_clear_tags_btn pill_clear_tags_layout" onClick={clearFilters}>
            <span className="modal_clear_all_filters_txt">Clear {title}</span>
        </div>
    </CSSTransition>)
}
