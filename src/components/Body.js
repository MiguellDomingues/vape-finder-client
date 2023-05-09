
import  usePillList  from '../hooks/usePillList'
import CardList from './CardList'
import {  PillList, ClearAllFiltersButton, AnimatedTabButton } from './widgets.js'
import { FILTER_KEYS } from '../utils.js'

import { useRef, useEffect } from 'react'

import { MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md';

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

    const pill_list_ref = useRef(null)
    const icon_ref = useRef(null)

    useEffect(() => {
        if (pill_list_ref.current) {
            const resizeObserver = new ResizeObserver(() => { //add a callback that triggers when the pill_list autoresizes          
                icon_ref.current.style.top = `${pill_list_ref.current.clientHeight}px` //offset the back-to-top icon by height of the pill_list
            });  
            resizeObserver.observe(pill_list_ref.current);  
            return ()=>resizeObserver.disconnect();     
        } 
      },[])

    function toggleBackToTop(pixelsFromTop, scrollbarHeight){
        if(pixelsFromTop < scrollbarHeight && icon_ref.current.style.opacity !== 0){
            icon_ref.current.style.opacity = 0
        }else if(pixelsFromTop > scrollbarHeight && icon_ref.current.style.opacity!== 1){
            icon_ref.current.style.opacity = 1
        }
    }

    return (<div className="body_layout_pill_list">

        {!isMobile && <AnimatedTabButton toggleSidebar={toggleSidebar} sidebar_open={sidebar_open}/>}

        <div ref={icon_ref} className="scroll_to_top_icon_container" onClick={e=>{document?.getElementById('cardContainer')?.scroll({top:0, behavior: 'smooth'});}}>
             <MdOutlineKeyboardDoubleArrowUp size={'2.0em'}/>
        </div>
        
        <div ref={pill_list_ref} className="pill_list">        
            <ClearAllFiltersButton title={"Clear All Filters"} clearAll={clearAll} show={!isMobile && areFiltersSelected}/>  
            <PillList pills={category}  handleRemove={!isMobile ? handleRemove(FILTER_KEYS.CATEGORIES) : null} />   
            <PillList pills={brands}  handleRemove={!isMobile ? handleRemove(FILTER_KEYS.BRANDS) : null} />
            <PillList pills={stores}  handleRemove={!isMobile ? handleRemove(FILTER_KEYS.STORES) : null} />
        </div>

        <CardList query={query} selected_filters_handlers={selected_filters_handlers} toggleBackToTop={toggleBackToTop}/>

    </div>)
}

export default Body

/*<Test selected_filters={selected_filters} clearAll={clearAll} isMobile={isMobile} areFiltersSelected={areFiltersSelected}
        handleRemove={handleRemove}
/>*/

/*

const Test =  ({
    selected_filters: { category, stores, brands, },
    clearAll, isMobile, areFiltersSelected, handleRemove
}) =>
{
    const myref = useRef(null)

   

    



    return(
    <div ref={myref} className="pill_list">        
            <ClearAllFiltersButton title={"Clear All Filters"} clearAll={clearAll} show={!isMobile && areFiltersSelected}/>  
            <PillList pills={category}  handleRemove={!isMobile ? handleRemove(FILTER_KEYS.CATEGORIES) : null} />   
            <PillList pills={brands}  handleRemove={!isMobile ? handleRemove(FILTER_KEYS.BRANDS) : null} />
            <PillList pills={stores}  handleRemove={!isMobile ? handleRemove(FILTER_KEYS.STORES) : null} />
        </div>)
}
*/