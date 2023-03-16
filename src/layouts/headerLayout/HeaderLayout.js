import './header.css'
import { useFilters } from '../../hooks/useFilters.js'
import  usePillList  from '../../hooks/usePillList'
import { DropDownMenu, SortByDropDown, PillList } from '../../widgets/widgets.js'
import { FILTER_KEYS } from '../../utils.js'

import { RxHamburgerMenu } from 'react-icons/rx';
import { RiCloseFill } from 'react-icons/ri';

import {useState} from 'react'

const img_src = '../../../health_warning.webp';

function HeaderLayout( {selected_filters_handlers, isMobile} ) {

    const [is_open, setOpen] = useState(false)

    const toggleModal = () => setOpen(!is_open)

    return ( 
    <>

        {is_open &&  <Modal selected_filters_handlers={selected_filters_handlers} toggleModal={toggleModal}/>}
    
    
    <div className="container_header">

      <div className="top">
        <img className="warning_img"
          src={img_src}
          alt="Health_Warning">
        </img>   
      </div>
   
      <div className="bottom">

       {isMobile && 
       <div className="open_modal_btn">     
        <RxHamburgerMenu size={'2em'} onClick={ e=> toggleModal()}/>
       </div>}

      
        <span className="header_title">BC VAPE FINDER</span>  
       

      </div>

    </div></>);
  }

  export default HeaderLayout

  function Modal({selected_filters_handlers, toggleModal}){

    const [ filter_tags,selected_filters,loading,error,{ onFilterTagSelected }] = useFilters(selected_filters_handlers)
    const [areFiltersSelected,{handleRemove, handleClear, clearAll}] = usePillList(selected_filters_handlers)

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

   const { category_tags, brands_tags, stores_tags } = filter_tags
   const { category, stores, brands, } = selected_filters

   if (loading) return 'Loading...';
   if (error) return `Error! ${error.message}`;

    return(<div class="modal">
    <div class="modal-content">
      <div className="close" onClick={e=> toggleModal()}><span><RiCloseFill/></span></div>  
      {areFiltersSelected && <button onClick={ (e)=>clearAll() }>Clear All Filters</button>}
      
      <div className="filter_pill">
        <DropDownMenu title="Categories" tags={category_tags} selected_tags={category} selectedHandler={onFilterTagSelected(FILTER_KEYS.CATEGORIES)} />
        {category?.length > 0 && <div ><button onClick={e=>handleClear(FILTER_KEYS.CATEGORIES)}>Clear</button></div>}
      </div>

      <PillList pills={category} filter_key={FILTER_KEYS.CATEGORIES} handleRemove={handleRemove}/>

      <div className="filter_pill">
        <DropDownMenu title="Brands" tags={brands_tags} selected_tags={brands} selectedHandler={onFilterTagSelected(FILTER_KEYS.BRANDS)} />
        {brands?.length > 0 && <div ><button onClick={e=>handleClear(FILTER_KEYS.BRANDS)}>Clear</button></div>}
      </div>
      
      <PillList pills={brands} filter_key={FILTER_KEYS.BRANDS} handleRemove={handleRemove}/>
      
      <div className="filter_pill">
      <DropDownMenu title="Stores" tags={stores_tags} selected_tags={stores} selectedHandler={onFilterTagSelected(FILTER_KEYS.STORES)} />
        {stores?.length > 0 && <div ><button onClick={e=>handleClear(FILTER_KEYS.STORES)}>Clear</button></div>}
      </div>

      <PillList pills={stores} filter_key={FILTER_KEYS.STORES} handleRemove={handleRemove} />

      <SortByDropDown selected_filters_handlers={selected_filters_handlers}/>  
      
    </div>

  </div>)
  }