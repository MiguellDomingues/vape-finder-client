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
    title         = "", //the text on the button
    tags          = [], //arr of strings to be displayed when the menu is open
    selected_tags = [], //arr of displayed strings to be highlighted when the menu is open
    selectedHandler,    //event handler to select/deselect tags
    clearBtnCmp = null, //optional event handler which removes 
    maxHeight = "100px",
    filter_key = null,
    pill_view = false,
} ){

    const [toggle, setToggle] = useState(false)

    const content_ref = useRef(null)

    //const selectedTagsBGC = (str, arr) => arr.includes(str) ? " filter_selected content-row" : "content-row"

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

    //create copies of filter tags and transform 
    function transformProps(filter_key, tags, selected_tags, selectedHandler){

        const _tags = tags.map( t => { return { tag_name: t.tag_name, type: filter_key, product_count: t.product_count}})
        const _selected_tags = {}
        _selected_tags[FILTER_KEYS.CATEGORIES] = selected_tags
        _selected_tags[FILTER_KEYS.BRANDS] = selected_tags
        _selected_tags[FILTER_KEYS.STORES] = selected_tags

         return {
            matches:        _tags,
            selected_tags : _selected_tags,
            selectedHandler: selectedHandler
        }
    }

    return(<>
    <button className="collapsible" onClick={e=>toggleMenu()}>
        <div className="collapsible_title">    
            {!!clearBtnCmp &&<div className="collapsible_title_clear_wrapper">{clearBtnCmp}</div>}
            <div className="collapsible_title_left_txt">{title}</div>        
            <div className={`collapsible_title_right ${toggle && `collapsible_title_right_open`}`}>{toggle?"-":"+"}</div>                    
        </div>
    </button>

    { !pill_view ? //the dropdown which toggles when user clicks the button
            <div ref={content_ref} className={"collapsible_open collapsible_open_list"}>
                <ListDropDownView {...transformProps(filter_key, tags, selected_tags, selectedHandler)}/>       
            </div> 
        : 
        <div ref={content_ref} className={"collapsible_open collapsible_open_pills"}>
            <PillDropDownView  {...transformProps(filter_key, tags, selected_tags, selectedHandler)}/>
        </div> }                   
    </>)
}


export function PillDropDownView({
    matches,  
    selected_tags: {category, stores, brands},
    selectedHandler
}){
    const filterMatchesByKey = (key, matches) => matches.filter( tag => tag.type === key).map(tag=>tag.tag_name)

    return(<>
        <PillList pills={filterMatchesByKey(FILTER_KEYS.CATEGORIES, matches)} handleClick={selectedHandler(FILTER_KEYS.CATEGORIES)} selected_pills={category}/>       
        <PillList pills={filterMatchesByKey(FILTER_KEYS.BRANDS, matches)} handleClick={selectedHandler(FILTER_KEYS.BRANDS)} selected_pills={brands}/>
        <PillList pills={filterMatchesByKey( FILTER_KEYS.STORES, matches)} handleClick={selectedHandler(FILTER_KEYS.STORES)} selected_pills={stores}/> 
    </>)
}

export function ListDropDownView({
    matches, 
    selected_tags: {category, stores, brands},
    selectedHandler
}){
    const selected_tags = [...category, ...stores, ...brands] //" filter_selected content-row" : "content-row"
    const selectedTagsBGC = (str, arr) => arr.includes(str) ? " filter_selected content-row" : "content-row"

    return (matches.map(tag=> //if theres at least a single word match, show dropdown
        <div key={tag.tag_name} 
            className={selectedTagsBGC(tag.tag_name, selected_tags)}
            onClick={e=>selectedHandler(tag.type)(tag.tag_name)}>
                <div>{tag.tag_name}</div>
                <div>{tag.product_count}</div>
        </div>))
}

////////////

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
  
export function CollapsibleMenuGroup({
    filter_tags: { category_tags, brands_tags, stores_tags },
    selected_filters,
    selectedHandler,
    handleClear = null, //handler for clearing all selections from one of the menus
    max_height = "200px",
}){

    const ANIMATION_TIME = 150 // the time in ms for the menu to open or close. note that this should equal 'transition:' time in the css

    const content_ref = useRef(null)
    //another issue: make font smaller, center the headings in the row
    const [current_menu, setCurrentMenu]= useState(null) 
    const is_menu_animating = useRef(false) // //prevent clicks on the menu while its animating or things crash and break

    const { category, stores, brands }  = selected_filters
  
    const menus = [
        {
          title: "Categories",
          tags: category_tags,
          selected_tags: category,
          filter_key: FILTER_KEYS.CATEGORIES,
          pill_view: true 
        },
        {
          title: "Brands",
          tags: brands_tags,
          selected_tags: brands,
          filter_key: FILTER_KEYS.BRANDS,
          pill_view: true
        },
        {
          title: "Stores",
          tags: stores_tags,
          selected_tags: stores,
          filter_key: FILTER_KEYS.STORES,
          pill_view: true
        }
    ]

    //initial issue: when one of the selected_filters arrays were updated, the displayed menu (current_menu obj) selected_tags arr was not updating
    //solution: if a menu is open, manually update the selected_tags when selected_filters is changed
    useEffect( () => {
        if(current_menu){
            setCurrentMenu({  
                ...current_menu, 
                selected_tags: selected_filters[current_menu.filter_key]})}              
    },[selected_filters]);


    function transformProps(current_menu, selectedHandler){

       const { filter_key, tags, selected_tags } = current_menu

        const _tags = tags.map( t => { return { tag_name: t.tag_name, type: filter_key, product_count: t.product_count}})
        const _selected_tags = {}
        _selected_tags[FILTER_KEYS.CATEGORIES] = selected_tags
        _selected_tags[FILTER_KEYS.BRANDS] = selected_tags
        _selected_tags[FILTER_KEYS.STORES] = selected_tags

         return {
            matches:        _tags,
            selected_tags : _selected_tags,
            selectedHandler: selectedHandler
        }
    }

    function openMenu(selected_menu,content){
        content.style.maxHeight = max_height
        setCurrentMenu({...selected_menu, tags: [...selected_menu.tags], selected_tags: [...selected_menu.selected_tags] })
    }

    function toggleMenu(menu){

        const content = content_ref.current

        if(!content) return

        if(!isMenuOpen()){ //if all menus are closed
          openMenu(menu, content )
        }else{ //a menu is open...
            content.style.maxHeight = null //close the menu, starting the animation        
            is_menu_animating.current = true //toggle the animation

            setTimeout(() =>{ //set a timer that fires near the same time as the css animation time
                setCurrentMenu(null) //when the animation is complete closing the menu, clear the current_menu 
                if(isSelectedMenu(menu)){ //the closed menu was the current menu? 
                    is_menu_animating.current = false 
                }else{ //otherwise set another timer 
                    setTimeout(() =>{ //.. and that timer will fire another timer that opens the new menu
                        openMenu(menu,content)
                        is_menu_animating.current = false //reenable the buttons when the animation sequence is complete
                    }, ANIMATION_TIME)
                }
            }, ANIMATION_TIME)
        }
  }

  const isSelectedMenu = (menu) => content_ref.current && current_menu && (menu.title === current_menu.title )
  const isMenuOpen = () => !!current_menu 
  const getDropDownViewCSS = () => isMenuOpen() ? (current_menu.pill_view ? "collapsible_open_pills" : "collapsible_open_list")  : ""
  const getButtonBGC = (menu) => isSelectedMenu(menu) ? "collapsible_menu_group_button_selected" : "collapsible_menu_group_button_deselected"

  
    return(<>
        <div className="collapsible_menu_group_container">
            {menus.map( menu => 
                <button 
                    key={menu.title} 
                    className={`collapsible_menu_group_button ${getButtonBGC(menu)}` }
                    onClick={e=>!is_menu_animating.current && toggleMenu(menu)}>
                    <div className="collapsible_title">    
                        <div className="collapsible_title_left_txt">{menu.title}</div>        
                        {/*<div className={`collapsible_title_right ${isSelectedMenu(menu) ? //when the menu is open, add some extra padding for the '-' char
                            `collapsible_title_right_open` : ``}`}>{isSelectedMenu(menu)?"-":"+"}</div>*/ }                   
                    </div>
                </button>)}
        </div>

      <div ref={content_ref} className={`collapsible_menu_group_open_menu ${getDropDownViewCSS()}`}>        
        {isMenuOpen() && (!current_menu.pill_view ? //if a menu is open, check which type to display    
                <ListDropDownView {...transformProps(current_menu, selectedHandler)}/>    
            : 
                <>  
                    {handleClear && <ClearFiltersButton title={current_menu.title} handleClear={handleClear(current_menu.filter_key)} show={current_menu.selected_tags.length > 0}/>}
                    <PillDropDownView  {...transformProps(current_menu, selectedHandler)}/>
                </>)}    
        </div>    
    </>)
}
