import { useFilters } from '../../hooks/useFilters.js'
import  usePillList  from '../../hooks/usePillList'
import { DropDownMenu, SortByDropDown, PillList, HorizontalLine, CollapsibleMenu } from '../../widgets/widgets.js'
import { FILTER_KEYS } from '../../utils.js'
import { RiCloseFill } from 'react-icons/ri';
import { useRef, useEffect, } from 'react'

import { CSSTransition } from 'react-transition-group';

import './modallayout.css'

function ModalLayout({selected_filters_handlers, filter_tags_query, toggleModal}){

  
    const [ filter_tags,selected_filters,loading,error,{ onFilterTagSelected }] = useFilters(selected_filters_handlers, filter_tags_query)
    const [areFiltersSelected,{handleRemove, handleClear, clearAll}] = usePillList(selected_filters_handlers)

    const modal_overlay = useRef(null)

    useEffect(() => {

      modal_overlay.current.classList.add('fade-in')
    },[] );

  
  console.log("MODAL: ", modal_overlay)

    function animateClose(e){
      e.stopPropagation()
      if(modal_overlay){                                                     
        modal_overlay.current.classList.add('fade-out')                         
        modal_overlay.current.ontransitionend = _ => toggleModal()
      }else{                                                                     
        toggleModal()
      }
    }


    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

   const { category_tags, brands_tags, stores_tags } = filter_tags
   const { category, stores, brands, } = selected_filters

    return(<>
    <div ref={modal_overlay} className="modal modal_no_select" id="modal-wrapper" onClick={e=>e.target?.id === "modal-wrapper" && animateClose(e)}>
    <div className="modal-content">
      
      <div className="close" onClick={e=> animateClose(e)}><span><RiCloseFill/></span></div>

      <CSSTransition
        //the timeout represents the amount of time before the component is removed from the DOM 
        timeout={500} 
        //when in={exp} evals to false, remove wrapped jsx from dom and play exit animation
        unmountOnExit              
        classNames="clear-filter-animation-model"
        //this is the conditional rendering that shows/unshows the wrapped jsx 
        in={areFiltersSelected}>
          <div className="modal_clear_all_filters_section">
            <div className="modal_clear_all_filters_btn" onClick={ (e)=>clearAll() }>
              <span>Clear All</span>
            </div>
          </div>                             
      </CSSTransition>

         
      <div className="modal_layout_row">
        <CollapsibleMenu 
        title="Categories" 
        tags={category_tags} 
        selected_tags={category} 
        selectedHandler={onFilterTagSelected(FILTER_KEYS.CATEGORIES)} 
        maxHeight="200px"/>  
      </div>

      <div className="modal_pill_list">
        <PillList pills={category} filter_key={FILTER_KEYS.CATEGORIES} handleRemove={handleRemove} handleClear={handleClear}/>
      </div>

      <HorizontalLine/>

      <div className="modal_layout_row">
        <CollapsibleMenu 
        title="Brands" 
        tags={brands_tags} 
        selected_tags={brands} 
        selectedHandler={onFilterTagSelected(FILTER_KEYS.BRANDS)} 
        maxHeight="200px" />
      </div>
      
      <div className="modal_pill_list">
        <PillList pills={brands} filter_key={FILTER_KEYS.BRANDS} handleRemove={handleRemove} handleClear={handleClear}/>
      </div>

      <HorizontalLine/>
      
      <div className="modal_layout_row">
        <CollapsibleMenu 
          title="Stores" 
          tags={stores_tags} 
          selected_tags={stores} 
          selectedHandler={onFilterTagSelected(FILTER_KEYS.STORES)} 
          maxHeight="200px"/>
      </div>

      <div className="modal_pill_list">
        <PillList pills={stores} filter_key={FILTER_KEYS.STORES} handleRemove={handleRemove} handleClear={handleClear}/>
      </div>

      <HorizontalLine/>

      <div className="modal_layout_row">
        <SortByDropDown selected_filters_handlers={selected_filters_handlers}/>
      </div>
      
    </div>
</div>
  </>)
  }

export default ModalLayout

/*
{areFiltersSelected && 
      <div className="modal_clear_all_filters_section">
        <div className="modal_clear_all_filters_btn" onClick={ (e)=>clearAll() }>
          <span className="modal_clear_all_filters_txt">Clear All</span>
        </div>
      </div>} 
*/
