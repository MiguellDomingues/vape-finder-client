import  useFilters  from '../hooks/useFilters.js'
import  usePillList  from '../hooks/usePillList.js'
import useOnClickOutside from '../hooks/useOnClickOutside.js'
import TextSearch from './TextSearch.js'
import { SortByDropDown, PillList, HorizontalLine, CollapsibleMenuGroup, ClearFiltersButton, ClearAllFiltersButton } from './widgets.js'
import { FILTER_KEYS } from '../utils.js'
import { RiCloseFill } from 'react-icons/ri';

import { useRef,} from 'react'

import '../styles/modal.css'

const maxHeight = "220px" //max height of collapsible menu when its opened

function Modal({
  selected_filters_handlers, 
  filter_tags_query, 
  history,
  toggleModal
}){

    const [ filter_tags,selected_filters,loading,error,{ onFilterTagSelected, searchTags }] = useFilters(selected_filters_handlers, filter_tags_query)
    const [ areFiltersSelected,{ handleRemove, handleClear, clearAll }] = usePillList(selected_filters_handlers)

    const overlay_ref = useRef();

    //notice how we declare the ref, pass it to the hook, and then attach it to the div
    //inside useffect, the ref is available because useffect runs after the component is mounted
    useOnClickOutside(overlay_ref, () => toggleModal()); 

    //this crashes app if the user opens the menu while loading results (CSSTransition expects a cmp)
    //user prevented from opening modal in parent cmp when filters are loading, but nicer to replace with modal showing loading spinner
    if (loading) return 'Loading...'; 
    if (error) return `Error! ${error.message}`;

   const { category_tags, brands_tags, stores_tags } = filter_tags
   const { category, stores, brands, } = selected_filters
   //const {current_filter_name, restoreFiltersFromHistory, filterHistoryToCollapsibleMenu } = history

    return(<>
    <div  className="modal modal_no_select">
      <div ref={overlay_ref} className="modal-content">
      
      <div className="modal-top">
        {/*<div className="modal_clear_all_filters_section">
          <ClearAllFiltersButton title={"Clear All Filters"} clearAll={clearAll} show={areFiltersSelected}/>
        </div>*/}

        <div className="close" onClick={e=> toggleModal()}><span><RiCloseFill/></span></div>
      </div>

      <div className="modal_layout_row">
        <TextSearch searchTagsHandler={searchTags} selectedHandler={onFilterTagSelected} selected_tags={selected_filters} pill_view={true}/>
      </div>   

      <div className="modal_layout_row">
        <SortByDropDown selected_filters_handlers={selected_filters_handlers}/>
      </div>

      <div className="modal_layout_row">
        <CollapsibleMenuGroup 
          filter_tags={filter_tags} 
          selected_filters={selected_filters}
          selectedHandler={onFilterTagSelected}
          handleClear={handleClear}
          maxHeight={maxHeight}/>
      </div>

      <div className="modal_pill_list">
        <ClearAllFiltersButton title={"Clear All Filters"} clearAll={clearAll} show={areFiltersSelected}/>
        <PillList pills={category}  handleRemove={handleRemove(FILTER_KEYS.CATEGORIES)} />   
        <PillList pills={brands}  handleRemove={handleRemove(FILTER_KEYS.BRANDS)} />
        <PillList pills={stores}  handleRemove={handleRemove(FILTER_KEYS.STORES)} />
      </div>
      
      </div>
  </div>
  </>)
}

export default Modal

/*
 /*<div className="modal_layout_row">
        <CollapsibleMenu 
          title="History" 
          tags={filterHistoryToCollapsibleMenu()} 
          selected_tags={current_filter_name}
          selectedHandler={restoreFiltersFromHistory}  
          maxHeight={maxHeight}/>
    </div>
    
    
    <div className="modal_layout_row">
        <CollapsibleMenu 
        title="Categories" 
        tags={category_tags} 
        selected_tags={category} 
        selectedHandler={onFilterTagSelected} 
        maxHeight={maxHeight}
        filter_key = {FILTER_KEYS.CATEGORIES}
        pill_view = {true}/>  
      </div>
    
    */

      

      /*<div className="modal_pill_list">
        <ClearFiltersButton handleClear={handleClear(FILTER_KEYS.CATEGORIES)} show={category.length > 0}/>  
        <PillList pills={category} handleRemove={handleRemove(FILTER_KEYS.CATEGORIES)} />
    </div>
    <HorizontalLine/>   

     <div className="modal_layout_row">
        <CollapsibleMenu 
        title="Brands" 
        tags={brands_tags} 
        selected_tags={brands} 
        selectedHandler={onFilterTagSelected} 
        maxHeight={maxHeight}
        filter_key = {FILTER_KEYS.BRANDS}
        pill_view = {true}/>  
      </div>

    */

      

     
      
      /*<div className="modal_pill_list">
        <ClearFiltersButton handleClear={handleClear(FILTER_KEYS.BRANDS)} show={brands.length > 0}/>
        <PillList pills={brands} handleRemove={handleRemove(FILTER_KEYS.BRANDS)} />
  </div>
  <HorizontalLine/>


     <div className="modal_layout_row">
        <CollapsibleMenu 
        title="Stores" 
        tags={stores_tags} 
        selected_tags={stores} 
        selectedHandler={onFilterTagSelected} 
        maxHeight={maxHeight}
        filter_key = {FILTER_KEYS.STORES}
        pill_view = {true}/>  
      </div>



  */

  /*<div className="modal_pill_list">
        <ClearFiltersButton handleClear={handleClear(FILTER_KEYS.STORES)} show={stores.length > 0}/>
        <PillList pills={stores} handleRemove={handleRemove(FILTER_KEYS.STORES)} />
    </div>
    
     <HorizontalLine/>
*/


