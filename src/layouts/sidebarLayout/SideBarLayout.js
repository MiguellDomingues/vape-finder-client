import { useFilters } from '../../hooks/useFilters.js'
import  usePillList  from '../../hooks/usePillList'
import { DropDownMenu, SortByDropDown, PillList } from '../../widgets/widgets.js'
import { FILTER_KEYS } from '../../utils.js'

import './sidebarlayout.css'

function SideBarLayout( {selected_filters_handlers, filter_tags_query} ){

    const [ filter_tags,selected_filters,loading,error,{ onFilterTagSelected }] = useFilters(selected_filters_handlers, filter_tags_query)
    const [areFiltersSelected,{handleRemove, handleClear, clearAll}] = usePillList(selected_filters_handlers)

    const { category_tags, brands_tags, stores_tags } = filter_tags
    const { category, stores, brands, } = selected_filters

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (<div className="sidebar_container">
        {areFiltersSelected && <button onClick={ (e)=>clearAll() }>Clear All</button>}

        <DropDownMenu title="Categories" tags={category_tags} selected_tags={category} selectedHandler={onFilterTagSelected(FILTER_KEYS.CATEGORIES)} />
        <PillList pills={category} filter_key={FILTER_KEYS.CATEGORIES} handleRemove={handleRemove} handleClear={handleClear}/>

        <DropDownMenu title="Brands" tags={brands_tags} selected_tags={brands} selectedHandler={onFilterTagSelected(FILTER_KEYS.BRANDS)} />
        <PillList pills={brands} filter_key={FILTER_KEYS.BRANDS} handleRemove={handleRemove} handleClear={handleClear}/>

        <DropDownMenu title="Stores" tags={stores_tags} selected_tags={stores} selectedHandler={onFilterTagSelected(FILTER_KEYS.STORES)} />
        <PillList pills={stores} filter_key={FILTER_KEYS.STORES} handleRemove={handleRemove} handleClear={handleClear}/>

        <SortByDropDown selected_filters_handlers={selected_filters_handlers}/>
    </div>)
}

export default SideBarLayout

