import  useFilters  from '../hooks/useFilters.js'
import  usePillList  from '../hooks/usePillList.js'
import TextSearch from './TextSearch.js'
import { SortByDropDown, CollapsibleMenu, HorizontalLine, ClearFiltersButton, } from './widgets.js'
import { FILTER_KEYS, starting_filters } from '../utils.js'
import { CgOptions } from 'react-icons/cg';

import {useState} from 'react'

import '../styles/sidebar.css'

function SideBar({
    selected_filters_handlers, 
    filter_tags_query,
    history
} ){

    const [ filter_tags,selected_filters,loading,error,{ onFilterTagSelected, searchTags }] = useFilters(selected_filters_handlers, filter_tags_query)
    const [,{ handleClear, }] = usePillList(selected_filters_handlers)

   // const [show_options, setShowOptions] = useState(false)

    const { category_tags, brands_tags, stores_tags } = filter_tags
    const { category, stores, brands, } = selected_filters
    const {current_filter_name, restoreFiltersFromHistory, filterHistoryToCollapsibleMenu } = history

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (<div className="sidebar_container">

        {/*
        <div className="options_icon" onClick={e=>setShowOptions(!show_options)}><CgOptions/></div> selectedHandler={onFilterTagSelected}
        */}

        <TextSearch searchTagsHandler={searchTags}  selectedHandler={onFilterTagSelected}  selected_tags={selected_filters} pill_view={true}/>

        <CollapsibleMenu 
            title="History" 
            tags={filterHistoryToCollapsibleMenu()} 
            selected_tags={current_filter_name}
            selectedHandler={restoreFiltersFromHistory}  
            maxHeight="125px"/>
        
        <CollapsibleMenu 
            title="Categories" 
            tags={category_tags} 
            selected_tags={category} 
            selectedHandler={onFilterTagSelected(FILTER_KEYS.CATEGORIES)}  
            maxHeight="125px"/>

        {<div><ClearFiltersButton title="Categories" handleClear={handleClear(FILTER_KEYS.CATEGORIES)} show={category.length > 0}/></div>
        }
      
        <HorizontalLine/>
    
        <CollapsibleMenu 
            title="Brands" 
            tags={brands_tags} 
            selected_tags={brands} 
            selectedHandler={onFilterTagSelected(FILTER_KEYS.BRANDS)}  
            maxHeight="125px"/>  

        {<div><ClearFiltersButton title="Brands" handleClear={handleClear(FILTER_KEYS.BRANDS)} show={brands.length > 0}/></div>
        }

        <HorizontalLine/>
    
        <CollapsibleMenu 
            title="Stores" 
            tags={stores_tags} 
            selected_tags={stores} 
            selectedHandler={onFilterTagSelected(FILTER_KEYS.STORES)}
            maxHeight="125px"/>
        
        {<div><ClearFiltersButton title="Stores" handleClear={handleClear(FILTER_KEYS.STORES)} show={stores.length > 0}/></div>
        }

        <HorizontalLine/>

        <SortByDropDown selected_filters_handlers={selected_filters_handlers}/>

        

        {/*show_options && <>
            <HorizontalLine/>
            <div className="options_txt">Use Dynamic Query <input type="checkbox"/></div>
        </>*/}
    </div>)
}

export default SideBar

