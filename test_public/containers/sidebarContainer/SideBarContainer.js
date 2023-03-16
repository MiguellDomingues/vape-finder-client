import { useFilters } from '../../hooks/useSearchBar.js'
import { DropDownMenu, SortByDropDown } from '../../widgets.js'

import { FILTER_KEYS } from '../../utils.js'

function SideBarContainer( {selected_filters_handlers} ){

    const [
       filter_tags,
       selected_filters,
        loading,
        error,
        { onFilterTagSelected }
     ] = useFilters(selected_filters_handlers)

    const { category_tags, brands_tags, stores_tags } = filter_tags
    const { category, stores, brands, } = selected_filters

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (<>
        <DropDownMenu title="Categories" tags={category_tags} selected_tags={category} selectedHandler={onFilterTagSelected(FILTER_KEYS.CATEGORIES)} />
        <DropDownMenu title="Brands" tags={brands_tags} selected_tags={brands} selectedHandler={onFilterTagSelected(FILTER_KEYS.BRANDS)} />
        <DropDownMenu title="Stores" tags={stores_tags} selected_tags={stores} selectedHandler={onFilterTagSelected(FILTER_KEYS.STORES)} />
        <SortByDropDown selected_filters_handlers={selected_filters_handlers}/>       
    </>)
}

export default SideBarContainer