import { useFilters } from '../../hooks/useFilters.js'
import  usePillList  from '../../hooks/usePillList'
import { DropDownMenu, SortByDropDown, PillList, CollapsibleMenu } from '../../widgets/widgets.js'
import { FILTER_KEYS } from '../../utils.js'

import {useRef} from 'react'

import './sidebarlayout.css'

function SideBarLayout( {selected_filters_handlers, filter_tags_query} ){

    const [ filter_tags,selected_filters,loading,error,{ onFilterTagSelected }] = useFilters(selected_filters_handlers, filter_tags_query)
    const [areFiltersSelected,{handleRemove, handleClear, clearAll}] = usePillList(selected_filters_handlers)

    const { category_tags, brands_tags, stores_tags } = filter_tags
    const { category, stores, brands, } = selected_filters

    const open_menus = useRef([])
    const el_handler = useRef(null)
    const is_enter = useRef(null)

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
/////////////////////this code block handles closing CollapsibleMenu menus when outside the container is clicked
    const closeWindows = () =>{
        if(!is_enter.current){
            open_menus.current.forEach(closeMenu)
            open_menus.current = []
            removeEL()   
        }
    }

    function closeMenu(target){
        target.classList.remove("active");
        target.nextElementSibling.style.maxHeight = null
    }

    function removeEL(){
        window.removeEventListener("mousemove", el_handler.current, false)
        el_handler.current = null
    }

    function addEL(){
        window.addEventListener("mousemove", closeWindows, false)
        el_handler.current = closeWindows
    }

    function registerMenu(target){
        if(open_menus.current.includes(target))
            open_menus.current = open_menus.current.filter( t => t !== target)
        else
            open_menus.current.push(target )

        if(open_menus.current.length > 0 && !el_handler.current) addEL()
        if(open_menus.current.length === 0) removeEL()
    }
//////////////////////////////////////////////////////
    return (<div className="sidebar_container" onMouseEnter={e=>is_enter.current=true} onMouseLeave={e=>is_enter.current=false}>
        
        <CollapsibleMenu title="Categories" tags={category_tags} selected_tags={category} selectedHandler={onFilterTagSelected(FILTER_KEYS.CATEGORIES)} registerMenu={registerMenu}/>
        {/*<DropDownMenu title="Categories" tags={category_tags} selected_tags={category} selectedHandler={onFilterTagSelected(FILTER_KEYS.CATEGORIES)} />*/}
        {/*<PillList pills={category} filter_key={FILTER_KEYS.CATEGORIES} handleRemove={handleRemove} handleClear={handleClear}/>*/}
        <div className="outer_line"><hr/></div>
        {/*<DropDownMenu title="Brands" tags={brands_tags} selected_tags={brands} selectedHandler={onFilterTagSelected(FILTER_KEYS.BRANDS)} />*/}
        <CollapsibleMenu title="Brands" tags={brands_tags} selected_tags={brands} selectedHandler={onFilterTagSelected(FILTER_KEYS.BRANDS)} registerMenu={registerMenu}/>
        {/*<PillList pills={brands} filter_key={FILTER_KEYS.BRANDS} handleRemove={handleRemove} handleClear={handleClear}/>*/}
        <div className="outer_line"><hr/></div>
        {/*<DropDownMenu title="Stores" tags={stores_tags} selected_tags={stores} selectedHandler={onFilterTagSelected(FILTER_KEYS.STORES)} />*/}
        <CollapsibleMenu title="Stores" tags={stores_tags} selected_tags={stores} selectedHandler={onFilterTagSelected(FILTER_KEYS.STORES)} registerMenu={registerMenu}/>
        {/*<PillList pills={stores} filter_key={FILTER_KEYS.STORES} handleRemove={handleRemove} handleClear={handleClear}/>*/}
        <div className="outer_line"><hr/></div>
        {areFiltersSelected && <button onClick={ (e)=>clearAll() }>Clear All</button>}

        <SortByDropDown selected_filters_handlers={selected_filters_handlers}/>
    </div>)
}

export default SideBarLayout

