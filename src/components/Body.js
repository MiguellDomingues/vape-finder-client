
import  usePillList  from '../hooks/usePillList'
import CardList from './CardList'
import {  PillList, ClearAllFiltersButton, AnimatedTabButton } from './widgets.js'
import { FILTER_KEYS } from '../utils.js'
import '../styles/body.css'

function Body({
    selected_filters_handlers, 
    query, 
    isMobile, 
    toggleSidebar, 
    sidebar_open, 
}){

    const { selected_filters } = selected_filters_handlers

    const [areFiltersSelected,{handleRemove, clearAll}] = usePillList(selected_filters_handlers)

    const { category, stores, brands, } = selected_filters

    // look into ResizeObservers to trigger events whenever a components dimensions are changed
    return (<div className="body_layout_pill_list">

        {!isMobile && <AnimatedTabButton toggleSidebar={toggleSidebar} sidebar_open={sidebar_open}/>}
   
        <div className="pill_list">        
            <ClearAllFiltersButton title={"Clear All Filters"} clearAll={clearAll} show={!isMobile && areFiltersSelected}/>  
            <PillList pills={category}  handleRemove={!isMobile ? handleRemove(FILTER_KEYS.CATEGORIES) : null} />   
            <PillList pills={brands}  handleRemove={!isMobile ? handleRemove(FILTER_KEYS.BRANDS) : null} />
            <PillList pills={stores}  handleRemove={!isMobile ? handleRemove(FILTER_KEYS.STORES) : null} />
        </div>
 
        <CardList query={query} selected_filters_handlers={selected_filters_handlers}/>
        
    </div>)
}

export default Body