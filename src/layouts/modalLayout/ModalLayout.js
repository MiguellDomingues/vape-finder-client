import { useFilters } from '../../hooks/useFilters.js'
import  usePillList  from '../../hooks/usePillList'
import { DropDownMenu, SortByDropDown, PillList, HorizontalLine,CollapsibleMenu } from '../../widgets/widgets.js'
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

    return(<div class="modal" id="modal-wrapper" onClick={e=>e.target?.id === "modal-wrapper" && toggleModal()}>
    <div class="modal-content">
      <div className="close" onClick={e=> toggleModal()}><span><RiCloseFill/></span></div>  
      
      <div className="filter_pill">
        <DropDownMenu title="Categories" tags={category_tags} selected_tags={category} selectedHandler={onFilterTagSelected(FILTER_KEYS.CATEGORIES)} />     
      </div>

      <div className="modal_pill_list">
        <PillList pills={category} filter_key={FILTER_KEYS.CATEGORIES} handleRemove={handleRemove} handleClear={handleClear}/>
      </div>

      <HorizontalLine/>

      <div className="filter_pill">
        <DropDownMenu title="Brands" tags={brands_tags} selected_tags={brands} selectedHandler={onFilterTagSelected(FILTER_KEYS.BRANDS)} />
      </div>
      
      <div className="modal_pill_list">
        <PillList pills={brands} filter_key={FILTER_KEYS.BRANDS} handleRemove={handleRemove} handleClear={handleClear}/>
      </div>

      <HorizontalLine/>
      
      <div className="filter_pill">
        <DropDownMenu title="Stores" tags={stores_tags} selected_tags={stores} selectedHandler={onFilterTagSelected(FILTER_KEYS.STORES)} />
      </div>

      <div className="modal_pill_list">
        <PillList pills={stores} filter_key={FILTER_KEYS.STORES} handleRemove={handleRemove} handleClear={handleClear}/>
      </div>

      <HorizontalLine/>

      <SortByDropDown selected_filters_handlers={selected_filters_handlers}/>
      {areFiltersSelected && <button onClick={ (e)=>clearAll() }>Clear All Filters</button>}  
      
    </div>

  </div>)
  }

  export default ModalLayout