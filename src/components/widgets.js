import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {SORT_TYPE, FILTER_KEYS} from '../utils'
import '../styles/widgets.css' 

import { RiCloseFill } from 'react-icons/ri';
import { FaSearch } from 'react-icons/fa';

import {useState, useRef, useEffect,  useMemo } from 'react'

////////////////////////////SORT BY DROPDOWN///////////////////////////////////

export function SortByDropDown({
    selected_filters_handlers: {setAndRefetch, selected_filters} 
}){
   
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
/*
var props = {
  value: 'foo',
  ...(condition && { disabled: true })
};
*/
export function PillList({
    pills, 
    handleRemove, 
    handleClick,
    selected_pills,
}){

    function getPillCmp(handleRemove, handleSelect, selected_pills){

        if(handleRemove){
            return (str) => <RemoveablePill key={str} str={str} removePill={handleRemove}/>
        }else if(handleSelect && selected_pills){
            return (str) => <SelectablePill key={str} str={str} selectPill={handleSelect} is_selected={selected_pills.includes(str)}/>
        }else{
            return (str) => <Pill key={str} str={str} />
        }
    }

    const DisplayPill = getPillCmp(handleRemove, handleClick, selected_pills)
   
    return(<>
        <TransitionGroup
            //wrapped jsx added to dom without any outer elements; adds outer div by default
            component={null}>
            {pills.map( (str)=> 
            <CSSTransition key={str} timeout={500} classNames="pill-animation">
              {DisplayPill(str)}
          </CSSTransition>)}
        </TransitionGroup>
    </>);
}

function Pill({str}){ 
    return (
        <div className="pill pill_container_font"> 
            <span className="pill_str">{str}</span>&nbsp;
        </div>); 
}
  
function RemoveablePill({
    str, 
    removePill,
}){ 
    return (
        <div className="pill pill_container_font pill_container_selected"> 
            <span className="pill_str pill_str_selected">{str}</span>&nbsp;
            <span className="pill_close_container" onClick={ e => removePill(str) }><RiCloseFill/></span>
        </div>); 
}

function SelectablePill({
    str, 
    selectPill,
    is_selected,
}){ 
    return (
        <div className={`pill pill_container_font selectable_pill ${!is_selected && `pill_container_selected` }`} onClick={ e=>selectPill(str)}> 
            <span className={`pill_str ${!is_selected && `pill_str_selected`}`}>{str}</span>&nbsp;
        </div>); 
}

//////////////////////////////////NEW DROPDOWN MENU//////////////////////////////////////////////

export function CollapsibleMenu( {
    title         = "", 
    tags          = [], 
    selected_tags = [], 
    selectedHandler,
    clearBtnCmp = null,
    maxHeight = "100px"
} ){

    const [toggle, setToggle] = useState(false)

    const content_ref = useRef(null)

    const selectedTagsBGC = (str, arr) => arr.includes(str) ? " filter_selected content-row" : "content-row"

    const isTagSelected = (tag, arr) => arr.includes(tag) 

    //move the selected tags to the top of the dropdown list
    //const sortedtags = [ ...tags.filter( t=> selected_tags.includes(t.tag_name) )]
                      //  .concat([...tags.filter( t=> !selected_tags.includes(t.tag_name)) ])

    function toggleMenu(){
        let content = content_ref.current

        if(!content.style.maxHeight){
            content.style.maxHeight = maxHeight
            setToggle(true)
        }else{
            content.style.maxHeight = null
            setToggle(false)
        }
    }

    return(<>
    <button className="collapsible" onClick={e=>toggleMenu()}>
        <div className="collapsible_title">    
            {!!clearBtnCmp &&<div className="collapsible_title_clear_wrapper">{clearBtnCmp}</div>}
            <div className="collapsible_title_left_txt">{title}</div>        
            <div className={`collapsible_title_right ${toggle && `collapsible_open`}`}>{toggle?"-":"+"}</div>                    
        </div>
    </button>
    <div ref={content_ref} className="content">
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
//BUG: LINES ARE DEEP BLACK ON FIREFOX
export function HorizontalLine(){
    return (<div className="outer_line"></div>)
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
        <div className="clear_filters_btn" onClick={clearFilters}>
            <span className="clear_all_filters_txt">Clear {title}</span>
        </div>
    </CSSTransition>)
}

/**************button to clear a single filter***************** */

export function ClearAllFiltersButton({
    title = "",
    clearAll,
    show = false,
}){

    return(
    <CSSTransition timeout={500} unmountOnExit classNames="clear-pills-btn-animation" in={show}>
        <div>
            <div className="clear_all_filters_btn" onClick={ (e)=>clearAll() }>
                <span>{title}</span>
            </div>
        </div>
    </CSSTransition>)
}

/**************floating tab that toggles filters in/out on desktop***************** */

export function AnimatedTabButton({
    toggleSidebar,
    sidebar_open = false   
}){
    const [animate_close, setAnimateClose] = useState(sidebar_open)

    return(<div className="tab_button_layout">   
        <div className="tab_button_wrapper" onClick={e=>toggleSidebar()}>                 
            <span className="tab_button_content">
                <CSSTransition 
                    timeout={500} 
                    unmountOnExit 
                    classNames="tab-button-animation"
                    in={!sidebar_open && !animate_close}
                    onExited={()=>setAnimateClose(true)}> 
                        <span>
                            <FaSearch size={'1.5em'}/>
                            &gt;&gt;
                        </span>
                </CSSTransition> 

                <CSSTransition 
                    timeout={500} 
                    unmountOnExit 
                    classNames="tab-button-animation"
                    in={sidebar_open && animate_close}
                    onExited={()=>setAnimateClose(false)}> 
                        <span>
                            <RiCloseFill size={'1.5em'}/>
                            &lt;&lt;
                        </span>
                </CSSTransition> 
            </span>                             
        </div>
    </div>)
}

/* *************copy/pasted SVGs************** */

export function CheerioJSIcon(){
    return(
      <svg width="25" height="25" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="30" fill="#E88C1F"/>
      <path d="m 312 122.5 c 0.2 -2.1 -1.4 -3.1 -2.5 -4.5 c -13.1 -15.8 -29.1 -27.9 -47.6 -36.3 c -10.6 
      -4.8 -22 -8 -33.9 -9.4 c -11.4 -1.4 -22.6 -2.1 -34 -0.8 c -14.5 1.6 -28.3 5.8 -41.5 12 c -21.1 9.9 
      -38 24.9 -51.3 43.6 c -8.5 11.8 -14.6 25.1 -18.2 39.4 c -3.7 14.6 -5.8 29.3 -4.2 44.5 c 1.1 10.4 2.6 
      20.5 5.7 30.5 c 4.5 14.6 11.8 27.9 21.1 39.9 c 10.6 13.7 23.4 25.1 38.5 33.5 c 17.5 9.7 36.3 15.5 56.4 16.7 c 
      7.4 0.4 14.8 0.5 22 -0.4 c 8.6 -1 17.2 -2.9 25.6 -5.5 c 10.4 -3.3 20.2 -7.6 29.4 -13.3 c 13.2 -8.2 25.1 
      -18 34.4 -31.1 c -21.9 -16.5 -43.8 -32.8 -65.9 -49.4 c -10.1 11.4 -22.4 17.2 -37.4 17.1 c -13.6 -0.2 -25.1 
      -5.7 -33.9 -15.6 c -17.8 -20 -15.2 -51.1 5.8 -68 c 18.7 -15.1 49.3 -13 65.5 7.2 c 22 -16.5 44 -33 66 -50.1 z"
      fill="#FFF" stroke="#000" strokeWidth="18"/>
      </svg>)
}

export function EmailJSIcon(){
    return(
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 510.88 512" fill="#FCA253" alt="EmailJS">
      <rect x="270.57" width="240.31" height="240.31" rx="24"></rect> 
      <path d="M215.12 254.73V68.5a29.16 29.16 0 0 0-8.55-20.64 29.19 29.19 0 0 0-41.28 0L16.18 197a55.27 55.27 0 0 0 0 
        78.14l220.71 220.68a55.27 55.27 0 0 0 78.14 0l149.11-149.11a29.19 29.19 0 0 0 0-41.28l-1.14-1.12a29.16 29.16 0 0 
        0-20.64-8.55H256.15a41 41 0 0 1-41.03-41.03z">  
      </path>
    </svg>)
}
  

//////////////////////////CURRENTLY UNUSED//////////////////////////////////////
/*

 *************ICON CARD************** 

export function IconCard({
    card_title = "",
    icon_list = [],
    add_links = false
}){
    return(<></>)
}

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
*/

  /*
    const handleContextMenu = (e) => {e.preventDefault(); console.log("sdfdsfd")}

    const ref = useRef(null)

    useEffect(() => {
        console.log("USE EFFECT CM")
        ref.current.addEventListener("contextmenu", handleContextMenu);
        const _ref = ref.current
        return () => {

          _ref.removeEventListener("contextmenu", handleContextMenu);
        };
      });
*/
////////////////////////////////////////////////////////////////////////////////////////////////////
