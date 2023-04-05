import { useFilters } from '../../hooks/useFilters.js'
import  usePillList  from '../../hooks/usePillList'
import { SortByDropDown, PillList, HorizontalLine, CollapsibleMenu, ClearFiltersButton, ClearAllFiltersButton } from '../../widgets/widgets.js'
import { FILTER_KEYS } from '../../utils.js'
import { RiCloseFill } from 'react-icons/ri';

import './modallayout.css'

function ModalLayout({selected_filters_handlers, filter_tags_query, toggleModal}){

    const [ filter_tags,selected_filters,loading,error,{ onFilterTagSelected }] = useFilters(selected_filters_handlers, filter_tags_query)
    const [areFiltersSelected,{handleRemove, handleClear, clearAll}] = usePillList(selected_filters_handlers)

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

   const { category_tags, brands_tags, stores_tags } = filter_tags
   const { category, stores, brands, } = selected_filters

    return(<>
    <div className="modal modal_no_select" id="modal-wrapper" onClick={e=>e.target?.id === "modal-wrapper" && toggleModal()}>
    <div className="modal-content">
      
      <div className="close" onClick={e=> toggleModal()}><span><RiCloseFill/></span></div>
      <div className="modal_clear_all_filters_section">
        <ClearAllFiltersButton title={"Clear All Filters"} clearAll={clearAll} show={areFiltersSelected}/>
      </div>
      
      <div className="modal_layout_row">
        <CollapsibleMenu 
        title="Categories" 
        tags={category_tags} 
        selected_tags={category} 
        selectedHandler={onFilterTagSelected(FILTER_KEYS.CATEGORIES)} 
        maxHeight="200px"/>  
      </div>

      <div className="modal_pill_list">
        <ClearFiltersButton handleClear={handleClear(FILTER_KEYS.CATEGORIES)} show={category.length > 0}/>  
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
        <ClearFiltersButton handleClear={handleClear(FILTER_KEYS.BRANDS)} show={brands.length > 0}/>
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
        <ClearFiltersButton handleClear={handleClear(FILTER_KEYS.STORES)} show={stores.length > 0}/>
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
