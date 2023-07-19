import { starting_filters } from '../utils'

function usePillList(selected_filters_handlers){

    const { setAndRefetch, selected_filters} = selected_filters_handlers
    const { category, stores, brands, } = selected_filters

    const areFiltersSelected = category?.length > 0 || brands?.length > 0 || stores?.length > 0

    function handleRemove(filter_key){ //this closure returns a function with the selected_category key already set by the parent Footer component
        return pill_str =>
        setAndRefetch({ 
          ...selected_filters,
          [filter_key]: selected_filters[filter_key].filter( str => str !== pill_str)})}

    function handleClear(filter_key){
        return _=>
        setAndRefetch({ 
          ...selected_filters,
          [filter_key]: starting_filters[filter_key]})
    }

    function clearAll(){
        setAndRefetch({...starting_filters})
    }

    return[
        areFiltersSelected,
        {handleRemove, handleClear, clearAll}
    ]
}

export default usePillList